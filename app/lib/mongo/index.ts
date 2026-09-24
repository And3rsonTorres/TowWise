/**
 * Safe, serverless-friendly MongoDB connection manager.
 * Supports dedicated database connections for User Feedback (FEEDBACK_DB_URI)
 * and Towing Capacities (TOWING_URI).
 * Reuses existing connections across serverless invocations and hot-reloads.
 */
import mongoose, { Connection } from "mongoose";

interface MultiDbCache {
  feedbackConn: Connection | null;
  feedbackPromise: Promise<Connection | null> | null;
  towingConn: typeof mongoose | null;
  towingPromise: Promise<typeof mongoose | null> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoMultiCache: MultiDbCache | undefined;
}

let cached: MultiDbCache = global.mongoMultiCache || {
  feedbackConn: null,
  feedbackPromise: null,
  towingConn: null,
  towingPromise: null,
};

if (!global.mongoMultiCache) {
  global.mongoMultiCache = cached;
}

/**
 * Connect to dedicated Feedback MongoDB Database (FEEDBACK_DB_URI or fallback to TOWING_URI).
 */
export async function ConnectFeedbackDB(): Promise<Connection | null> {
  const URI = process.env.FEEDBACK_DB_URI || process.env.TOWING_URI;

  if (!URI) {
    return null;
  }

  if (cached.feedbackConn && cached.feedbackConn.readyState === 1) {
    return cached.feedbackConn;
  }

  if (!cached.feedbackPromise) {
    cached.feedbackPromise = mongoose
      .createConnection(URI, { bufferCommands: false })
      .asPromise()
      .then((conn) => {
        console.log("Connected to Feedback MongoDB Atlas database");
        return conn;
      })
      .catch((err) => {
        console.warn("Feedback MongoDB connection failed:", err.message);
        cached.feedbackPromise = null;
        return null;
      });
  }

  try {
    cached.feedbackConn = await cached.feedbackPromise;
  } catch {
    cached.feedbackPromise = null;
    return null;
  }

  return cached.feedbackConn;
}

/**
 * Connect to Towing Capacities MongoDB Database (TOWING_URI).
 */
export async function ConnectTowingDB(): Promise<typeof mongoose | null> {
  const URI = process.env.TOWING_URI;

  if (!URI) {
    return null;
  }

  if (cached.towingConn && mongoose.connection.readyState === 1) {
    return cached.towingConn;
  }

  if (!cached.towingPromise) {
    cached.towingPromise = mongoose
      .connect(URI, { bufferCommands: false })
      .then((m) => {
        console.log("Connected to Towing Capacities MongoDB database");
        return m;
      })
      .catch((err) => {
        console.warn("Towing MongoDB connection failed:", err.message);
        cached.towingPromise = null;
        return null;
      });
  }

  try {
    cached.towingConn = await cached.towingPromise;
  } catch {
    cached.towingPromise = null;
    return null;
  }

  return cached.towingConn;
}

const ConnectDB = ConnectTowingDB;
export default ConnectDB;
