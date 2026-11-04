import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { leads } from '@/lib/db/schema'
import { FUNNEL_IDS, GATE_COOKIE, LEAD_ID_COOKIE, LEAD_NAME_COOKIE } from '@/lib/funnels'

const stringRecord = z.record(z.string().max(100), z.string().max(2000))

const bodySchema = z.object({
  funnel: z.enum(FUNNEL_IDS),
  step: z.string().min(1).max(50),
  name: z.string().trim().max(120).optional(),
  email: z.string().trim().toLowerCase().email().max(200),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine((value) => value.replace(/\D/g, '').length >= 6, 'Telefono non valido'),
  answers: stringRecord.default({}),
  tracking: stringRecord.default({}),
  consent: z.literal(true),
  website: z.string().max(0).optional(), // honeypot: i bot lo compilano
})

export async function POST(request: Request) {
  const json = await request.json().catch(() => null)
  const parsed = bodySchema.safeParse(json)

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Dati non validi' }, { status: 400 })
  }

  const { funnel, step, name, email, phone, answers, tracking } = parsed.data

  const [lead] = await db
    .insert(leads)
    .values({
    funnel,
    step,
    name: name || null,
    email,
    phone,
    answers,
    tracking,
    userAgent: request.headers.get('user-agent')?.slice(0, 300) ?? null,
    })
    .returning({ id: leads.id })

  const response = NextResponse.json({ ok: true })

  if (funnel === 'funnel-2' && step === 'squeeze') {
    response.cookies.set(GATE_COOKIE, '1', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })
    response.cookies.set(LEAD_ID_COOKIE, lead.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })
    if (name) {
      response.cookies.set(LEAD_NAME_COOKIE, encodeURIComponent(name.slice(0, 60)), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      })
    }
  }

  return response
}
