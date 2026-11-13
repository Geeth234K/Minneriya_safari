import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const getTransporter = () => {
  const user = process.env.EMAIL_USER || "sigiriyawhitelodge@gmail.com";
  const pass = process.env.EMAIL_PASS;

  if (!pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user,
      pass,
    },
  });
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, country, rating, text, trip } = body;

    if (!name || !text || !rating) {
      return NextResponse.json(
        { error: "Name, review text, and rating are required." },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5." },
        { status: 400 }
      );
    }

    const adminEmail =
      process.env.ADMIN_EMAIL || "sigiriyawhitelodge@gmail.com";
    const senderEmail =
      process.env.EMAIL_USER || "sigiriyawhitelodge@gmail.com";

    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>New Guest Review</title></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #334155;">
        <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <div style="background-color: #d97706; padding: 24px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 700;">New Guest Review Received</h1>
            <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.9;">Submitted via Minneriya Safari Website</p>
          </div>
          
          <div style="padding: 24px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <span style="font-size: 28px; letter-spacing: 4px; color: #f59e0b;">${stars}</span>
              <p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">${rating} out of 5 stars</p>
            </div>

            <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 15px; color: #1e293b; line-height: 1.6; font-style: italic;">
                "${text}"
              </p>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 110px;"><strong>Guest Name:</strong></td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Country:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${country || "Not specified"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Experience:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${trip || "Not specified"}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8; text-align: center;">
                To display this review on the website, add it to<br>
                <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 11px;">src/data/testimonials.ts</code>
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const transporter = getTransporter();

    if (!transporter) {
      console.log(
        "[Review Route] EMAIL_PASS not set. Review email simulated for:",
        { name, country, rating }
      );
      return NextResponse.json({
        success: true,
        message:
          "Review submitted successfully! (Email simulated - add EMAIL_PASS for live dispatch)",
      });
    }

    await transporter.sendMail({
      from: `"Minneriya Safari Reviews" <${senderEmail}>`,
      to: adminEmail,
      subject: `⭐ New ${rating}-Star Review from ${name} (${country || "Guest"})`,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for your review! We appreciate your feedback.",
    });
  } catch (error: unknown) {
    console.error("[Review Route Error]:", error);
    const message =
      error instanceof Error ? error.message : "Failed to submit review";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

