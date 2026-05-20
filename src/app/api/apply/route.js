import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// ── Rate limiter (in-memory, per serverless instance) ────────────────────────
// Protects against burst spam; not a substitute for edge-level DDoS protection.
const WINDOW_MS  = 15 * 60 * 1000; // 15 minutes
const MAX_REQ    = 5;
const rlMap      = new Map();       // ip → { count, resetAt }

function checkRateLimit(ip) {
  const now   = Date.now();
  const entry = rlMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rlMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQ - 1 };
  }
  if (entry.count >= MAX_REQ) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count++;
  return { allowed: true, remaining: MAX_REQ - entry.count };
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BODY_LIMIT = 20 * 1024; // 20 KB

function getIP(req) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

// Escape HTML to prevent injection in email body
function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}

// ── Field rules ──────────────────────────────────────────────────────────────
const FIELDS = {
  name:      { required: true,  max: 100 },
  email:     { required: true,  max: 254, pattern: EMAIL_RE },
  country:   { required: true,  max: 100 },
  instagram: { required: true,  max: 200 },
  about:     { required: true,  max: 2000 },
  role:      { required: false, max: 80  },
  project:   { required: false, max: 200 },
};

function validate(body) {
  const errors = [];
  for (const [field, rules] of Object.entries(FIELDS)) {
    const val = String(body[field] ?? '').trim();
    if (rules.required && val.length === 0) { errors.push(`${field}: required`); continue; }
    if (val.length > rules.max)              { errors.push(`${field}: too long`); continue; }
    if (rules.pattern && val && !rules.pattern.test(val)) { errors.push(`${field}: invalid format`); }
  }
  return errors;
}

// ── Route handler ────────────────────────────────────────────────────────────
export async function POST(req) {

  // 1. Body size — fast path via Content-Length header
  const cl = Number(req.headers.get('content-length') ?? 0);
  if (cl > BODY_LIMIT) {
    return NextResponse.json({ success: false, error: 'Payload too large' }, { status: 413 });
  }

  // 2. Rate limit by IP
  const ip = getIP(req);
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please wait before trying again.' },
      {
        status: 429,
        headers: {
          'Retry-After':          String(rl.retryAfter),
          'X-RateLimit-Limit':    String(MAX_REQ),
          'X-RateLimit-Remaining':'0',
        },
      }
    );
  }

  // 3. Parse body — secondary size check on actual bytes
  let body;
  try {
    const text = await req.text();
    if (text.length > BODY_LIMIT) {
      return NextResponse.json({ success: false, error: 'Payload too large' }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }

  // 4. Server-side validation
  const errors = validate(body);
  if (errors.length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 422 });
  }

  // 5. Send email
  try {
    const { role, name, email, country, instagram, about, project } = body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'GFC Applications <onboarding@resend.dev>',
      to:   process.env.APPLY_EMAIL || 'alina.lodina.design@gmail.com',
      subject: `New Application — ${escapeHtml(role)} — ${escapeHtml(name)}${project ? ` — ${escapeHtml(project)}` : ''}`,
      html: `
        <h2>New GFC Application</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:600;width:160px">Source</td><td style="padding:8px;border:1px solid #eee">${escapeHtml(project) || 'Quick Apply (Homepage)'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:600">Role</td><td style="padding:8px;border:1px solid #eee">${escapeHtml(role) || '—'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:600">Name</td><td style="padding:8px;border:1px solid #eee">${escapeHtml(name) || '—'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:600">Email</td><td style="padding:8px;border:1px solid #eee">${escapeHtml(email) || '—'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:600">Country</td><td style="padding:8px;border:1px solid #eee">${escapeHtml(country) || '—'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:600">Instagram / Portfolio</td><td style="padding:8px;border:1px solid #eee">${escapeHtml(instagram) || '—'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:600">About</td><td style="padding:8px;border:1px solid #eee;white-space:pre-wrap">${escapeHtml(about) || '—'}</td></tr>
        </table>
        <p style="color:#888;font-size:12px;margin-top:24px">GFC / 026 · Submitted via globalfashioncode.com</p>
      `,
    });

    return NextResponse.json(
      { success: true },
      { headers: { 'X-RateLimit-Remaining': String(rl.remaining) } }
    );

  } catch (err) {
    // Log error type only — message may contain API key fragments or PII
    console.error('Apply API error:', err?.name ?? 'UnknownError');
    return NextResponse.json(
      { success: false, error: 'Failed to send. Please try again later.' },
      { status: 500 }
    );
  }
}
