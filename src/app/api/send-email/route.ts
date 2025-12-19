import { EmailTemplate } from '../../../components/email/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request:any) {
    const body = await request.json();
    const { name, description } = body;
    
    if (!name || !description) {
        console.log('Missing name or description.');
        return new Response(JSON.stringify({ error: 'Name and description are required.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not set in environment variables!');
        return new Response(JSON.stringify({ error: 'Server configuration error: RESEND_API_KEY is missing.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Customer <feedback@resend.dev>',
            to: ['ntduyen255@gmail.com'],
            subject: `New feedback from ${name}`,
            react: EmailTemplate({ name: name, description: description }),
            text: `Name: ${name}\nMessage: ${description}`,
        });

        if (error) {
            console.error('Resend API error:', error);
            return new Response(JSON.stringify({ error: error.message || 'Failed to send email via Resend.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        console.log('Email sent successfully:', data);
        return new Response(JSON.stringify({ message: 'Email sent successfully!', data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (err) {
        console.error('Unhandled server error:', err);
        return new Response(JSON.stringify({ error: 'Internal Server Error.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}