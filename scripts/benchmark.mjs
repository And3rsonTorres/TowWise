import http from "http";
import { spawn } from "child_process";

const BASE_URL = "http://localhost:3005";
let spawnedServer = null;

async function ensureServerRunning() {
  try {
    const res = await fetch(`${BASE_URL}/`);
    if (res.status) return;
  } catch {
    // Server not running, let's start it
  }

  console.log("Starting Next.js production server on port 3005...");
  spawnedServer = spawn("npx", ["next", "start", "-p", "3005"], {
    shell: true,
    stdio: "ignore",
  });

  const startTime = Date.now();
  while (Date.now() - startTime < 15000) {
    try {
      const res = await fetch(`${BASE_URL}/`);
      if (res.status) {
        console.log("  ✓ Next.js server ready on " + BASE_URL + "\n");
        return;
      }
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error("Failed to start Next.js server within 15 seconds.");
}

async function measureRequest(path, options = {}) {
  const start = performance.now();
  const res = await fetch(`${BASE_URL}${path}`, options);
  const duration = performance.now() - start;
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {}
  return {
    status: res.status,
    duration,
    sizeBytes: Buffer.byteLength(text, "utf8"),
    data: json,
  };
}

async function runBenchmarkSeries(name, path, iterations = 20) {
  const durations = [];
  let totalBytes = 0;
  let status = 200;

  for (let i = 0; i < iterations; i++) {
    const res = await measureRequest(path);
    durations.push(res.duration);
    totalBytes = res.sizeBytes;
    status = res.status;
  }

  durations.sort((a, b) => a - b);
  const min = durations[0];
  const max = durations[durations.length - 1];
  const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
  const p95 = durations[Math.floor(durations.length * 0.95)];

  return {
    name,
    status,
    iterations,
    min: min.toFixed(2),
    avg: avg.toFixed(2),
    p95: p95.toFixed(2),
    max: max.toFixed(2),
    sizeKb: (totalBytes / 1024).toFixed(2),
  };
}

async function runConcurrentTest(path, concurrency = 25) {
  const start = performance.now();
  const promises = Array.from({ length: concurrency }, () => measureRequest(path));
  const results = await Promise.all(promises);
  const totalDuration = performance.now() - start;

  const durations = results.map((r) => r.duration).sort((a, b) => a - b);
  const allSuccessful = results.every((r) => r.status === 200);
  const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
  const p95 = durations[Math.floor(durations.length * 0.95)];
  const reqPerSec = ((concurrency / totalDuration) * 1000).toFixed(1);

  return {
    concurrency,
    totalDuration: totalDuration.toFixed(2),
    allSuccessful,
    avg: avg.toFixed(2),
    p95: p95.toFixed(2),
    reqPerSec,
  };
}

async function main() {
  await ensureServerRunning();

  console.log("================================================================================");
  console.log(" TowWise Full Application Performance Benchmark");
  console.log(" Target: " + BASE_URL);
  console.log("================================================================================\n");

  // 1. Warm-up
  console.log("[1/5] Warming up routes...");
  await measureRequest("/");
  await measureRequest("/api/vin?vin=1FTFW1ED4MFB12345");
  await measureRequest("/api/towing?year=2024&make=Ford&model=F-150");
  console.log("  ✓ Warmup complete.\n");

  // 2. Page & API Latency Series
  console.log("[2/5] Running single-endpoint latency benchmarks (20 iterations each)...");
  const benchmarks = [
    await runBenchmarkSeries("Homepage (SSR / UI Shell)", "/", 15),
    await runBenchmarkSeries("Offline VIN Decoder (Ford F-150)", "/api/vin?vin=1FTFW1ED4MFB12345", 25),
    await runBenchmarkSeries("Offline VIN Decoder (Toyota Corolla)", "/api/vin?vin=4T1B11HK5PU123456", 25),
    await runBenchmarkSeries("Filtered Towing Spec (Ford F-150)", "/api/towing?year=2024&make=Ford&model=F-150", 25),
    await runBenchmarkSeries("Historical 2000 Spec (Corolla)", "/api/towing?year=2000&make=Toyota&model=Corolla", 25),
    await runBenchmarkSeries("MongoDB Capacities Query (Volvo XC90)", "/api/towing?year=2020&make=Volvo&model=XC90", 25),
    await runBenchmarkSeries("Full Catalog Overview (2,013 vehicles)", "/api/towing", 15),
  ];

  console.table(
    benchmarks.map((b) => ({
      Endpoint: b.name,
      Status: b.status,
      "Min (ms)": b.min,
      "Avg (ms)": b.avg,
      "P95 (ms)": b.p95,
      "Max (ms)": b.max,
      "Payload Size": `${b.sizeKb} KB`,
    }))
  );

  // 3. Feedback API Test (Write + Read)
  console.log("\n[3/5] Benchmarking Feedback API (MongoDB Atlas 'contacts')...");
  const postStart = performance.now();
  const postRes = await measureRequest("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Name: "Perf Benchmark",
      Email: "perf@towwise.local",
      FeedbackType: "general",
      Rating: 5,
      VehicleContext: { Year: 2024, Make: "Ford", Model: "F-150" },
      Message: "Automated latency check.",
    }),
  });
  const postDuration = (performance.now() - postStart).toFixed(2);

  const getStart = performance.now();
  const getRes = await measureRequest("/api/contact");
  const getDuration = (performance.now() - getStart).toFixed(2);

  console.log(`  ✓ POST /api/contact (Write to Atlas): ${postDuration} ms [Status: ${postRes.status}]`);
  console.log(`  ✓ GET  /api/contact (Read from Atlas):  ${getDuration} ms [Status: ${getRes.status}, Payload: ${(getRes.sizeBytes / 1024).toFixed(2)} KB]`);

  // 4. Concurrency & High Load Test
  console.log("\n[4/5] Running High-Concurrency Load Tests (30 concurrent requests each)...");
  const vinLoad = await runConcurrentTest("/api/vin?vin=1FTFW1ED4MFB12345", 30);
  const towingLoad = await runConcurrentTest("/api/towing?year=2024&make=Ford&model=F-150", 30);
  const catalogLoad = await runConcurrentTest("/api/towing", 20);

  console.table([
    {
      Test: "Offline VIN Decoder",
      Concurrency: vinLoad.concurrency,
      "Total Time (ms)": vinLoad.totalDuration,
      "Avg Latency (ms)": vinLoad.avg,
      "P95 Latency (ms)": vinLoad.p95,
      "Throughput (req/s)": vinLoad.reqPerSec,
      Success: vinLoad.allSuccessful ? "100%" : "Failures",
    },
    {
      Test: "Filtered Towing Spec",
      Concurrency: towingLoad.concurrency,
      "Total Time (ms)": towingLoad.totalDuration,
      "Avg Latency (ms)": towingLoad.avg,
      "P95 Latency (ms)": towingLoad.p95,
      "Throughput (req/s)": towingLoad.reqPerSec,
      Success: towingLoad.allSuccessful ? "100%" : "Failures",
    },
    {
      Test: "Full Catalog Fetch",
      Concurrency: catalogLoad.concurrency,
      "Total Time (ms)": catalogLoad.totalDuration,
      "Avg Latency (ms)": catalogLoad.avg,
      "P95 Latency (ms)": catalogLoad.p95,
      "Throughput (req/s)": catalogLoad.reqPerSec,
      Success: catalogLoad.allSuccessful ? "100%" : "Failures",
    },
  ]);

  // 5. Summary Evaluation
  console.log("\n[5/5] Performance Summary Evaluation:");
  const avgVinTime = parseFloat(benchmarks[1].avg);
  const avgSpecTime = parseFloat(benchmarks[3].avg);
  const avgHomeTime = parseFloat(benchmarks[0].avg);

  if (avgVinTime < 50) {
    console.log("  ★ 100% Offline VIN Engine: EXCELLENT (< 50ms average latency)");
  } else {
    console.log(`  ★ 100% Offline VIN Engine: GOOD (${avgVinTime}ms average latency)`);
  }

  if (avgSpecTime < 50) {
    console.log("  ★ Towing Spec Resolver: EXCELLENT (< 50ms average latency)");
  } else {
    console.log(`  ★ Towing Spec Resolver: GOOD (${avgSpecTime}ms average latency)`);
  }

  if (avgHomeTime < 100) {
    console.log("  ★ Homepage UI Render: EXCELLENT (< 100ms average response)");
  } else {
    console.log(`  ★ Homepage UI Render: ACCEPTABLE (${avgHomeTime}ms average response)`);
  }

  console.log("\n================================================================================");
}

main()
  .catch((err) => {
    console.error("Benchmark failed:", err);
    process.exitCode = 1;
  })
  .finally(() => {
    if (spawnedServer) {
      console.log("Shutting down benchmark server process...");
      try {
        spawnedServer.kill();
      } catch {}
    }
  });
