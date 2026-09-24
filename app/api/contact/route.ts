import { ConnectFeedbackDB } from "@/app/lib/mongo/index";
import { getFeedbackModel } from "@/app/models/Contact";
import { NextRequest, NextResponse } from "next/server";
import { ContactSchema } from "@/app/lib/utils/Validations";

/**
 * Handles POST requests for user feedback, inquiries, and missing vehicle requests.
 * Saves to the dedicated Feedback MongoDB Atlas database (FEEDBACK_DB_URI or TOWING_URI).
 * Falls back to serverless logging if no database connection string is configured.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { Name, Email, FeedbackType, Rating, VehicleContext, Message } = parsed.data;

    let savedToDatabase = false;
    let feedbackId = null;

    try {
      const feedbackConn = await ConnectFeedbackDB();
      if (feedbackConn) {
        const FeedbackModel = getFeedbackModel(feedbackConn);
        const newDoc = new FeedbackModel({
          Name,
          Email,
          FeedbackType: FeedbackType || "general",
          Rating,
          VehicleContext,
          Message,
          Status: "new",
        });
        const saved = await newDoc.save();
        savedToDatabase = true;
        feedbackId = saved._id;
        console.log(`[TowWise Feedback] Saved feedback document #${saved._id} to MongoDB Atlas.`);
      } else {
        console.log("[TowWise Feedback (Serverless Log)]", {
          Name,
          Email,
          FeedbackType,
          Rating,
          VehicleContext,
          Message,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (dbErr: any) {
      console.warn("Could not write to MongoDB Atlas, falling back to serverless log:", dbErr.message);
    }

    return NextResponse.json(
      {
        message: "Your feedback has been received! Thank you for helping improve TowWise.",
        savedToDatabase,
        id: feedbackId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing feedback submission:", error);
    return NextResponse.json(
      { error: "An error occurred while submitting your feedback. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * Handles GET requests to retrieve submitted feedback (recent entries).
 */
export async function GET(req: NextRequest) {
  try {
    const feedbackConn = await ConnectFeedbackDB();
    if (!feedbackConn) {
      return NextResponse.json({
        databaseConnected: false,
        message: "FEEDBACK_DB_URI is not configured in .env. Feedback is currently logged serverless.",
        feedback: [],
      });
    }

    const FeedbackModel = getFeedbackModel(feedbackConn);
    const recentFeedback = await FeedbackModel.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return NextResponse.json({
      databaseConnected: true,
      count: recentFeedback.length,
      feedback: recentFeedback,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to query feedback database", details: error.message },
      { status: 500 }
    );
  }
}
