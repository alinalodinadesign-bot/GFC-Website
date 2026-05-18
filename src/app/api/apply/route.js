import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req) {
  try {
    const body = await req.json();
    const { role, name, email, country, instagram, about, project } = body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'GFC Applications <onboarding@resend.dev>',
      to: process.env.APPLY_EMAIL || 'alina.lodina.design@gmail.com',
      subject: `New Application — ${role} — ${name}${project ? ` — ${project}` : ''}`,
      html: `
        <h2>New GFC Application</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:600;width:160px">Source</td><td style="padding:8px;border:1px solid #eee">${project || 'Quick Apply (Homepage)'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:600">Role</td><td style="padding:8px;border:1px solid #eee">${role || '—'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:600">Name</td><td style="padding:8px;border:1px solid #eee">${name || '—'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:600">Email</td><td style="padding:8px;border:1px solid #eee">${email || '—'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:600">Country</td><td style="padding:8px;border:1px solid #eee">${country || '—'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:600">Instagram / Portfolio</td><td style="padding:8px;border:1px solid #eee">${instagram || '—'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:600">About</td><td style="padding:8px;border:1px solid #eee;white-space:pre-wrap">${about || '—'}</td></tr>
        </table>
        <p style="color:#888;font-size:12px;margin-top:24px">GFC / 026 · Submitted via globalfashioncode.com</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Apply API error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
