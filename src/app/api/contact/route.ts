import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email, question } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'syntix.bio@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: '"SYNTIX Questions" <syntix.bio@gmail.com>',
      to: 'syntix.bio@gmail.com',
      replyTo: email,
      subject: `New Question from ${email}`,
      html: `
        <h2>New Question Received</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Question:</strong></p>
        <blockquote style="border-left: 4px solid #00E5FF; padding-left: 16px; margin-left: 0; color: #333;">
          ${question.replace(/\n/g, '<br/>')}
        </blockquote>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
