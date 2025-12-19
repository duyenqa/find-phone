import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, description } = await req.json();

    if (!name || !description) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Customer <feedback@resend.dev>',
      to: 'ntduyen255@gmail.com',
      subject: `New feedback from ${name}`,
      text: `Name: ${name}\nMessage: ${description}`
    });

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
