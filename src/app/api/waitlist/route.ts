import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, role, organization, source } = data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'syntix.bio@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD, // Must be set in .env.local
      },
    });

    const mailOptions = {
      from: '"SYNTIX Waitlist" <syntix.bio@gmail.com>',
      to: 'syntix.bio@gmail.com', // Sending to yourself
      replyTo: email,
      subject: `New Waitlist Signup: ${name} (${role})`,
      html: `
        <h2>New SYNTIX Waitlist Application</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr><th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Field</th><th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Value</th></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Role/Intent</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${role}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Organization</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${organization || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Source</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${source}</td></tr>
        </table>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
