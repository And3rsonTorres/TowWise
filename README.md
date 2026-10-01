# TowWise

<p align="center">
  <img src="public/assets/TowWise.png" alt="TowWise Logo" width="220" />
</p>

<p align="center">
  <strong>High-Performance Vehicle Towing Capacity, Trailer Category Compatibility & 80% Safety Advisor</strong>
</p>

<p align="center">
  <!-- Tech Stack Badges with Official Brand Colors -->
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 15" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 18" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS_3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://heroui.com/"><img src="https://img.shields.io/badge/HeroUI_2.6-000000?style=for-the-badge&logo=nextui&logoColor=white" alt="HeroUI" /></a>
  <a href="https://www.mongodb.com/atlas"><img src="https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Atlas" /></a>
  <a href="https://vpic.nhtsa.dot.gov/"><img src="https://img.shields.io/badge/NHTSA_vPIC-0284C7?style=for-the-badge&logo=speedtest&logoColor=white" alt="NHTSA vPIC" /></a>
</p>

<p align="center">
  <!-- Verified Performance & Stats Badges with Official Colors -->
  <img src="https://img.shields.io/badge/Verified_Vehicles-2%2C510%2B-00ED64?style=flat-square&logo=mongodb&logoColor=white" alt="2510+ Verified Vehicles" />
  <img src="https://img.shields.io/badge/Model_Years-2000--2026-F59E0B?style=flat-square&logo=databricks&logoColor=white" alt="Model Years 2000-2026" />
  <img src="https://img.shields.io/badge/Automakers-30_Brands-0055FF?style=flat-square&logo=subaru&logoColor=white" alt="30 Automakers" />
  <img src="https://img.shields.io/badge/Offline_Engine-100%25_Local-0284C7?style=flat-square&logo=cloudflarepages&logoColor=white" alt="100% Offline Engine" />
  <img src="https://img.shields.io/badge/SSR_Shell_Latency-%3C_2.5ms-8B5CF6?style=flat-square&logo=fastapi&logoColor=white" alt="Sub-2.5ms Latency" />
  <img src="https://img.shields.io/badge/Trim_Integrity-0_Anachronisms-10B981?style=flat-square&logo=shieldcheck&logoColor=white" alt="Trim Integrity Audited" />
  <img src="https://img.shields.io/badge/Next.js_Build-Passing-brightgreen?style=flat-square&logo=vercel&logoColor=white" alt="Build Passing" />
</p>

---

## Key Stats & Technical Metrics

```text
========================================================================================
   TOWWISE AUDITED METRICS DASHBOARD (2000–2026)
========================================================================================
  • Verified MongoDB Records:     2,510 documents (Towing/capacities)
  • Major Automaker Coverage:     30 Brands (100% full span 2000–2026)
  • Model Year Gating Span:       27 Years (Strict generational launch accuracy)
  • Anachronistic Trim Count:     0 Mismatched Trims (Audited via audit-trims)
  • Runtime Network Calls:        0 Calls (100% Offline self-hosted NHTSA vPIC)
  • Homepage SSR Latency:         1.89 ms
  • 100% Offline VIN Latency:     20.43 ms
  • High-Concurrency Throughput:  160 req/sec (30 parallel load workers)
========================================================================================
```

---

## Table of Contents
* [Background](#background)
* [Features](#features)
* [Brand Coverage Matrix (30 Automakers)](#brand-coverage-matrix-30-automakers)
* [Architecture & 100% Offline Engine](#architecture--100-offline-engine)
* [Tech Stack & Official Brand Palettes](#tech-stack--official-brand-palettes)
* [Getting Started](#getting-started)
* [Database Configuration](#database-configuration)
* [Performance Benchmarks](#performance-benchmarks)
* [Annual NHTSA vPIC Maintenance](#annual-nhtsa-vpic-maintenance)
* [Trim Accuracy & Generation Integrity](#trim-accuracy--generation-integrity)
* [Authors](#authors)

---

## Background

In vehicle and trailer rentals, customers frequently overestimate their vehicle's towing ability without considering transmission fluid heating, braking distances, or dangerous trailer sway. TowWise bridges this gap by offering:
- Instant specification lookups across trucks, SUVs, crossovers, EVs, and compact sedans.
- 100% offline US & Canadian VIN decoding with zero government server dependencies.
- Clear Class I hitch guidance for compact cars (Corolla, Civic, Mazda3, Jetta, Impreza).
- An interactive safety advisor applying the industry-standard 80% continuous towing rule.

---

## Features

* **3 Ways to Look Up Towing Limits**:
  * 🚗 **Vehicle Selector**: Step-by-step selector from Model Year **2000 through 2026**, Make, Model, and Trim package with generational accuracy, reset controls, and visual breadcrumbs.
  * ⚡ **Instant Autocomplete Search**: Start typing any vehicle name or filter by category pills (🛻 Trucks, 🚙 SUVs, 🚘 Compacts, ⚡ EVs & Hybrids) for instant results.
  * 📋 **100% Offline US & Canadian VIN Decoder**: Enter any 17-character VIN with clipboard paste support, real-time character counter, country flags, and interactive WMI/VDS structural breakdown diagram.
* **Full 2000–2026 Model Year Coverage & Complete Brand Integrity**:
  * Over **2,510 verified vehicle documents** in MongoDB Atlas (`Towing/capacities`).
  * 100% full-span coverage across all 30 major manufacturers.
  * Generational trim sanitization ensures trims reflect actual launch dates (e.g. Subaru Wilderness trims strictly 2022+, Ford PowerBoost 2021+, Ram Hurricane 2025+, MDX Gen 4 2022+).
* **Small Car & Compact Vehicle Towing Support**:
  * Dedicated Class I hitch specifications (1,000–1,500 lbs max gross trailer weight, 100–150 lbs tongue weight).
  * Guidance on unbraked vs. braked trailer limits and transmission cooling for compact cars (Corolla, Civic, Impreza, Mazda3, Jetta, Elantra, etc.).
* **Towing Specifications Card**:
  * Detailed breakdown of Engine, Transmission, Drivetrain, Max Towing Capacity, and manufacturer notes.
  * Instant unit toggle between **Pounds (lbs)** and **Kilograms (kg)**.
* **Trailer Category Compatibility**:
  * Real-time matching against standard trailer classes (Class I Light Utility up to Class V 5th Wheels).
* **The 80% Safety Rule Advisor**:
  * Calculates recommended continuous towing limits (80% margin) and safe tongue weight estimates (10–15%).
  * Interactive trailer + cargo weight calculator with color-coded safety gauge.
* **Feedback & Vehicle Inquiries System**:
  * In-app feedback form with category selection, 5-star ratings, and auto-attached vehicle context.
  * Persists directly to MongoDB Atlas (`Towing/contacts`) with graceful serverless logging fallback.

---

## Brand Coverage Matrix (30 Automakers)

All 30 major automotive brands have complete, generation-accurate coverage in MongoDB Atlas (`Towing/capacities`):

| Brand Badge | Automaker | Verified Docs | Production Years | Key Models Included |
| :---: | :--- | :---: | :---: | :--- |
| <img src="https://img.shields.io/badge/Acura-E82127?style=flat-square&logo=honda&logoColor=white" alt="Acura" /> | **Acura** | **50** | 2000–2026 | MDX (Gen 1–4), RDX (Gen 1–3), Integra, 3.5RL |
| <img src="https://img.shields.io/badge/Audi-BB0A30?style=flat-square&logo=audi&logoColor=white" alt="Audi" /> | **Audi** | **72** | 2000–2026 | Q7, Q5, allroad quattro, A6, A4 |
| <img src="https://img.shields.io/badge/BMW-0066B1?style=flat-square&logo=bmw&logoColor=white" alt="BMW" /> | **BMW** | **111** | 2000–2026 | X5, X3, X7, 3-Series, 5-Series |
| <img src="https://img.shields.io/badge/Buick-C8102E?style=flat-square&logo=generalmotors&logoColor=white" alt="Buick" /> | **Buick** | **35** | 2000–2026 | Enclave, Rainier, Rendezvous, LeSabre |
| <img src="https://img.shields.io/badge/Cadillac-1B365D?style=flat-square&logo=generalmotors&logoColor=white" alt="Cadillac" /> | **Cadillac** | **47** | 2000–2026 | Escalade, SRX, XT5, XT6 |
| <img src="https://img.shields.io/badge/Chevrolet-CD9834?style=flat-square&logo=chevrolet&logoColor=white" alt="Chevrolet" /> | **Chevrolet** | **171** | 2000–2026 | Silverado 1500/2500, Tahoe, Suburban, Colorado, Traverse |
| <img src="https://img.shields.io/badge/Chrysler-002C6C?style=flat-square&logo=stellantis&logoColor=white" alt="Chrysler" /> | **Chrysler** | **28** | 2000–2026 | Pacifica, Town & Country, 300, Aspen |
| <img src="https://img.shields.io/badge/Dodge-BA0C2F?style=flat-square&logo=dodge&logoColor=white" alt="Dodge" /> | **Dodge** | **41** | 2000–2026 | Durango, Ram 1500 (pre-2011), Grand Caravan |
| <img src="https://img.shields.io/badge/Ford-003478?style=flat-square&logo=ford&logoColor=white" alt="Ford" /> | **Ford** | **301** | 2000–2026 | F-150, F-250/350, Expedition, Explorer, Ranger, Bronco |
| <img src="https://img.shields.io/badge/GMC-C41230?style=flat-square&logo=generalmotors&logoColor=white" alt="GMC" /> | **GMC** | **134** | 2000–2026 | Sierra 1500/2500, Yukon, Yukon XL, Canyon, Acadia |
| <img src="https://img.shields.io/badge/Honda-CC0000?style=flat-square&logo=honda&logoColor=white" alt="Honda" /> | **Honda** | **155** | 2000–2026 | Pilot, Ridgeline, Odyssey, Passport, CR-V, Accord, Civic |
| <img src="https://img.shields.io/badge/Hyundai-002C6C?style=flat-square&logo=hyundai&logoColor=white" alt="Hyundai" /> | **Hyundai** | **42** | 2000–2026 | Palisade, Santa Fe, Tucson, Elantra |
| <img src="https://img.shields.io/badge/Infiniti-505050?style=flat-square&logo=nissan&logoColor=white" alt="Infiniti" /> | **Infiniti** | **46** | 2000–2026 | QX60, QX80, QX4, FX35/45 |
| <img src="https://img.shields.io/badge/Jeep-FFD100?style=flat-square&logo=jeep&logoColor=black" alt="Jeep" /> | **Jeep** | **90** | 2000–2026 | Grand Cherokee, Wrangler, Gladiator, Cherokee |
| <img src="https://img.shields.io/badge/Kia-05141F?style=flat-square&logo=kia&logoColor=white" alt="Kia" /> | **Kia** | **64** | 2000–2026 | Telluride, Sorento, Sportage, Sedona, Carnival, Forte |
| <img src="https://img.shields.io/badge/Land_Rover-005A2B?style=flat-square&logo=landrover&logoColor=white" alt="Land Rover" /> | **Land Rover** | **59** | 2000–2026 | Range Rover, Range Rover Sport, Defender, Discovery |
| <img src="https://img.shields.io/badge/Lexus-000000?style=flat-square&logo=lexus&logoColor=white" alt="Lexus" /> | **Lexus** | **107** | 2000–2026 | RX 350/450h, GX 460/550, LX 470/570/600 |
| <img src="https://img.shields.io/badge/Lincoln-20232A?style=flat-square&logo=ford&logoColor=white" alt="Lincoln" /> | **Lincoln** | **48** | 2000–2026 | Navigator, Aviator, MKX, Nautilus |
| <img src="https://img.shields.io/badge/Mazda-101010?style=flat-square&logo=mazda&logoColor=white" alt="Mazda" /> | **Mazda** | **74** | 2000–2026 | CX-9, CX-90, CX-5, Tribute, B-Series, Mazda3 |
| <img src="https://img.shields.io/badge/Mercedes-000000?style=flat-square&logo=mercedes&logoColor=white" alt="Mercedes-Benz" /> | **Mercedes-Benz** | **103** | 2000–2026 | GLE, GLS, ML-Class, GL-Class, Sprinter, E-Class |
| <img src="https://img.shields.io/badge/Mitsubishi-E60012?style=flat-square&logo=mitsubishi&logoColor=white" alt="Mitsubishi" /> | **Mitsubishi** | **39** | 2000–2026 | Outlander, Montero Sport, Eclipse Cross |
| <img src="https://img.shields.io/badge/Nissan-C3002F?style=flat-square&logo=nissan&logoColor=white" alt="Nissan" /> | **Nissan** | **107** | 2000–2026 | Titan, Armada, Pathfinder, Frontier, Murano, Rogue |
| <img src="https://img.shields.io/badge/Porsche-D5001C?style=flat-square&logo=porsche&logoColor=white" alt="Porsche" /> | **Porsche** | **34** | 2003–2026 | Cayenne (2003+), Macan (2015+) |
| <img src="https://img.shields.io/badge/RAM-000000?style=flat-square&logo=ram&logoColor=white" alt="RAM" /> | **RAM** | **52** | 2011–2026 | RAM 1500, 2500, 3500 (post-2010 spin-off) |
| <img src="https://img.shields.io/badge/Rivian-F47521?style=flat-square&logo=rivian&logoColor=white" alt="Rivian" /> | **Rivian** | **10** | 2022–2026 | R1T, R1S |
| <img src="https://img.shields.io/badge/Subaru-013C74?style=flat-square&logo=subaru&logoColor=white" alt="Subaru" /> | **Subaru** | **107** | 2000–2026 | Outback, Forester, Crosstrek, Ascent, Impreza |
| <img src="https://img.shields.io/badge/Tesla-E82127?style=flat-square&logo=tesla&logoColor=white" alt="Tesla" /> | **Tesla** | **27** | 2016–2026 | Model X (2016+), Model Y (2020+), Cybertruck (2024+) |
| <img src="https://img.shields.io/badge/Toyota-EB0A1E?style=flat-square&logo=toyota&logoColor=white" alt="Toyota" /> | **Toyota** | **270** | 2000–2026 | Tundra, Tacoma, Sequoia, 4Runner, Highlander, RAV4 |
| <img src="https://img.shields.io/badge/Volkswagen-001E50?style=flat-square&logo=volkswagen&logoColor=white" alt="Volkswagen" /> | **Volkswagen** | **33** | 2000–2026 | Atlas, Touareg, Tiguan, Jetta, Golf |
| <img src="https://img.shields.io/badge/Volvo-003057?style=flat-square&logo=volvo&logoColor=white" alt="Volvo" /> | **Volvo** | **71** | 2000–2026 | XC90, XC60, XC70, V90 Cross Country |
| **Total Verified** | **All 30 Brands** | **2,510** | **2000–2026** | **0 Trim Mismatches / 100% Coverage** |

---

## Architecture & 100% Offline Engine

TowWise operates **100% offline** at runtime without relying on live government servers:
- **Self-Hosted NHTSA vPIC Engine** (`app/lib/nhtsa/localVpicDatabase.ts`):
  - Embedded World Manufacturer Identifier (WMI) registry covering 26+ makes and 70+ country codes.
  - 10th-character VIN model year map covering 1980 through 2039.
  - Vehicle Descriptor Section (VDS) pattern matcher for instant local identification.
  - Direct integration with MongoDB `Towing/capacities` (2,510+ vehicles) and embedded fallback catalogs.
  - **Zero runtime network calls** — eliminates API rate limits, latency, and government downtime.

---

## Tech Stack & Official Brand Palettes

### Frontend
- **Framework**: [Next.js 15 App Router](https://nextjs.org/) (`next@15.5.27` — `#000000`)
- **UI Library**: [HeroUI](https://heroui.com/) (`@heroui/react@^2.6.14` — `#000000`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (`tailwindcss@3.4.19` — `#06B6D4`)
- **Animations**: [Motion](https://motion.dev/) (`motion@12.0.6` — `#0055FF`)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) (Light / Dark mode)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) (`#3E67B1`)

### Backend & Data
- **API Routes**: Next.js App Router (`/api/towing`, `/api/vin`, `/api/contact`)
- **VIN Engine**: 100% Offline Local US DOT NHTSA vPIC Engine (`#0284C7`)
- **Database**: MongoDB Atlas (`Towing/capacities` and `Towing/contacts` — `#47A248`) via Mongoose
- **Maintenance**: Annual NHTSA vPIC Dataset Updater CLI (`npm run update-vpic`)

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
TowWise works out-of-the-box with zero configuration using its embedded catalog. To connect to MongoDB Atlas, create `.env.local`:

```bash
# Vehicle Towing Capacities (Database: Towing, Collection: capacities)
TOWING_URI="mongodb+srv://<username>:<password>@towinfo.3an5qxb.mongodb.net/Towing?retryWrites=true&w=majority&appName=TowInfo"

# Feedback & Inquiries (Database: Towing, Collection: contacts)
FEEDBACK_DB_URI="mongodb+srv://<username>:<password>@towinfo.3an5qxb.mongodb.net/Towing?retryWrites=true&w=majority&appName=TowInfo"
```

### 3. Verify Database Connection
Run the diagnostic test script:
```bash
node scripts/test-mongo.mjs
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Configuration

### Collections
- **`Towing/capacities`**: Stores verified vehicle towing specifications, engine options, drivetrains, and manufacturer notes.
- **`Towing/contacts`**: Captures user reviews, bug reports, and missing vehicle requests submitted via the contact form.

### Seeding Vehicles (Optional)
To populate or restore the `capacities` collection with the comprehensive vehicle catalog:
```bash
npm run seed
```

---

## Performance Benchmarks

TowWise includes an automated high-concurrency performance benchmark suite verifying sub-25ms response times across all endpoints:

```bash
npm run benchmark
```

### Benchmark Results (Next.js 15 Production Engine)
| Endpoint / Operation | Average Latency | P95 Latency | Concurrency / Load | Throughput | Status |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Homepage UI Shell** | **1.89 ms** | 2.63 ms | Single / SSR | ~520 req/s | `200 OK` |
| **Offline VIN Decoder** | **20.43 ms** | 25.30 ms | 30 concurrent reqs | ~98 req/s | `100% Success` |
| **Filtered Towing Specs** | **23.03 ms** | 28.53 ms | 30 concurrent reqs | ~160 req/s | `100% Success` |
| **MongoDB Atlas Capacities** | **20.40 ms** | 27.75 ms | Single / Live Atlas | ~49 req/s | `200 OK` |
| **Full 2,510+ Catalog** | **175.42 ms** | 284.56 ms | 20 concurrent reqs | ~14 req/s | `100% Success` |

---

## Annual NHTSA vPIC Maintenance

The application runtime is 100% offline. To update the local NHTSA dataset with newly registered manufacturer WMIs and model releases **once a year**:

```bash
npm run update-vpic
```

This CLI tool queries the US DOT NHTSA vPIC catalog, precompiles verified models, and updates `app/lib/nhtsa/vpicCache.json`, keeping the web app 100% offline for the remaining 364 days.

---

## Trim Accuracy & Generation Integrity

TowWise includes auditing and sanitization tools to guarantee trims accurately reflect vehicle release dates and generations across 2000–2026:

```bash
# Audit MongoDB for anachronistic trims or unreleased models
npm run audit-trims

# Sanitize database records to generation-accurate regular versions
npm run sanitize-trims
```

---

## Authors

- [Anderson Torres](https://www.github.com/and3rsontorres)
