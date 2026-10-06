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

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "Flexible / To be confirmed";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      whatsapp,
      date,
      timeSlot,
      guests = 2,
      interests = [],
      message,
    } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required to send safari itinerary" },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL || "sigiriyawhitelodge@gmail.com";
    const senderEmail = process.env.EMAIL_USER || "sigiriyawhitelodge@gmail.com";
    const formattedDate = formatDate(date);

    const timeSlotLabel =
      timeSlot === "morning"
        ? "Morning Safari (6:00 AM) - Birds & Sunrise"
        : timeSlot === "afternoon"
        ? "Afternoon Safari (2:30 PM) - Elephant Gathering"
        : "Flexible / Full Day Safari";

    const experiencesListHtml =
      Array.isArray(interests) && interests.length > 0
        ? interests
            .map(
              (item: string) =>
                `<li style="margin-bottom: 6px; color: #1e293b; font-weight: 600;">✓ ${item}</li>`
            )
            .join("")
        : `<li style="color: #64748b;">Jeep Safari</li>`;

    // 1. Host Notification Email HTML
    const hostMailHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>New Safari Inquiry</title></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #334155;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <div style="background-color: #1e7145; padding: 28px 24px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700;">🐘 New Safari Inquiry</h1>
            <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.9;">Received via Minneriya Safari Website</p>
          </div>
          
          <div style="padding: 28px 24px;">
            <h2 style="font-size: 15px; text-transform: uppercase; letter-spacing: 1px; color: #1e7145; margin-top: 0; margin-bottom: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
              Guest Information
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
              <tr><td style="padding: 8px 0; color: #64748b; width: 140px;"><strong>Guest Name:</strong></td><td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${fullName}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;"><strong>Guest Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1e7145; text-decoration: none; font-weight: 600;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;"><strong>WhatsApp / Phone:</strong></td><td style="padding: 8px 0;">${whatsapp || "Not provided"}</td></tr>
            </table>

            <h2 style="font-size: 15px; text-transform: uppercase; letter-spacing: 1px; color: #1e7145; margin-bottom: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
              Safari Schedule & Details
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
              <tr><td style="padding: 8px 0; color: #64748b; width: 140px;"><strong>Date:</strong></td><td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${formattedDate}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;"><strong>Shift / Timing:</strong></td><td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${timeSlotLabel}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;"><strong>Travelers:</strong></td><td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${guests} Guests</td></tr>
            </table>

            <h2 style="font-size: 15px; text-transform: uppercase; letter-spacing: 1px; color: #1e7145; margin-bottom: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
              Selected Experiences
            </h2>
            <ul style="margin: 0 0 24px 0; padding-left: 20px; font-size: 14px;">
              ${experiencesListHtml}
            </ul>

            ${
              message
                ? `
              <h2 style="font-size: 15px; text-transform: uppercase; letter-spacing: 1px; color: #1e7145; margin-bottom: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">
                Special Requests / Pickup
              </h2>
              <div style="background-color: #f1f5f9; padding: 14px 16px; border-radius: 8px; font-size: 14px; font-style: italic; color: #334155; margin-bottom: 24px;">
                "${message}"
              </div>
              `
                : ""
            }
          </div>
        </div>
      </body>
      </html>
    `;

    // 2. Guest Confirmation & Safari Itinerary Email HTML
    const guestMailHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>Your Minneriya Safari Itinerary</title></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #334155;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <div style="background-color: #1e7145; padding: 36px 24px; text-align: center; color: #ffffff;">
            <span style="display: inline-block; background-color: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
              🐘 Wild Life Eco Jeep Safari
            </span>
            <h1 style="margin: 0; font-size: 26px; font-weight: 800;">Minneriya Safari & Tours</h1>
            <p style="margin: 8px 0 0; font-size: 15px; opacity: 0.95;">Thank you for your inquiry, ${fullName}!</p>
          </div>

          <div style="padding: 28px 24px;">
            <p style="font-size: 15px; line-height: 1.6; margin-top: 0; color: #334155;">
              We have received your safari inquiry. Our safari guide is reviewing availability for your preferred date and will confirm pickup times, rates, and customized details with you shortly.
            </p>

            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; margin: 24px 0;">
              <h3 style="margin: 0 0 14px 0; font-size: 16px; color: #166534; font-weight: 700; border-bottom: 1px solid #dcfce7; padding-bottom: 8px;">
                📋 Your Safari Schedule Summary
              </h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 6px 0; color: #4b5563; width: 140px;"><strong>Preferred Date:</strong></td><td style="padding: 6px 0; color: #111827; font-weight: 600;">${formattedDate}</td></tr>
                <tr><td style="padding: 6px 0; color: #4b5563;"><strong>Safari Shift:</strong></td><td style="padding: 6px 0; color: #111827; font-weight: 600;">${timeSlotLabel}</td></tr>
                <tr><td style="padding: 6px 0; color: #4b5563;"><strong>Travelers:</strong></td><td style="padding: 6px 0; color: #111827; font-weight: 600;">${guests} Guest(s)</td></tr>
              </table>

              <h4 style="margin: 14px 0 8px 0; font-size: 14px; color: #166534; font-weight: 600;">
                Selected Experiences:
              </h4>
              <ul style="margin: 0; padding-left: 18px; font-size: 14px;">
                ${experiencesListHtml}
              </ul>
            </div>

            <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
              <h4 style="margin: 0 0 8px 0; font-size: 15px; color: #92400e; font-weight: 700;">
                🎒 What to Bring
              </h4>
              <p style="margin: 0; font-size: 13px; color: #78350f; line-height: 1.5;">
                • Camera with zoom lens & extra battery/storage<br>
                • Sun protection (sunglasses, sunscreen, hat)<br>
                • Light, comfortable safari clothing<br>
                • Insect repellent & bottled water
              </p>
            </div>

            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 14px; color: #475569;">
              <p style="margin: 0 0 6px 0;"><strong>Need fast confirmation?</strong></p>
              <p style="margin: 0 0 16px 0;">
                Direct WhatsApp / Phone: <a href="tel:+94762838796" style="color: #1e7145; font-weight: 600; text-decoration: none;">+94 76 283 8796</a>
              </p>
              <div style="text-align: center; margin-top: 16px;">
                <a href="https://wa.me/94762838796?text=Hello!%20I%20sent%20a%20safari%20inquiry%20via%20Email%20for%20${encodeURIComponent(formattedDate)}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 14px;">
                  Chat on WhatsApp Now
                </a>
              </div>
            </div>

          </div>

          <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8;">
            <p style="margin: 0;">Wild Life Eco Jeep Safari • Minneriya / Sigiriya, Sri Lanka</p>
            <p style="margin: 4px 0 0;">Email: sigiriyawhitelodge@gmail.com • Phone: +94 76 283 8796</p>
          </div>

        </div>
      </body>
      </html>
    `;

    const transporter = getTransporter();

    if (!transporter) {
      console.log(
        "[Next.js Route Handler] EMAIL_PASS not set in .env.local. Email dispatch simulated successfully for:",
        { guestEmail: email, adminEmail }
      );
      return NextResponse.json({
        success: true,
        message: "Inquiry registered. (Email simulated - add EMAIL_PASS to environment for live dispatch)",
        emailResult: { success: true, simulated: true },
      });
    }

    // Live send
    await transporter.sendMail({
      from: `"Minneriya Safari" <${senderEmail}>`,
      to: adminEmail,
      subject: `🐘 New Safari Inquiry from ${fullName} (${formattedDate})`,
      html: hostMailHtml,
    });

    await transporter.sendMail({
      from: `"Minneriya Safari & Tours" <${senderEmail}>`,
      to: email,
      subject: `🌿 Minneriya Safari - Your Adventure Itinerary & Details`,
      html: guestMailHtml,
    });

    return NextResponse.json({
      success: true,
      message: "Safari inquiry details sent successfully via email",
      emailResult: { success: true, simulated: false },
    });
  } catch (error: any) {
    console.error("[Email Route Handler Error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process inquiry email" },
      { status: 500 }
    );
  }
}
