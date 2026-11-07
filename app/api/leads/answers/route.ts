import { NextResponse } from 'next/server'
import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/lib/db'
import { leads } from '@/lib/db/schema'
import { LEAD_ID_COOKIE } from '@/lib/funnels'
import { MARF_FORMS, submitToMarf } from '@/lib/marf'

const bodySchema = z.object({
  answers: z.record(z.string().max(100), z.string().max(2000)),
  formStart: z.number().int().positive(),
})

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function POST(request: Request) {
  const cookieHeader = request.headers.get('cookie') ?? ''
  const leadId = cookieHeader
    .split(';')
    .map((part) => part.trim().split('='))
    .find(([key]) => key === LEAD_ID_COOKIE)?.[1]

  if (!leadId || !UUID.test(leadId)) {
    return NextResponse.json({ ok: false, error: 'Lead non trovato' }, { status: 401 })
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Dati non validi' }, { status: 400 })
  }

  const [lead] = await db.select().from(leads).where(eq(leads.id, leadId)).limit(1)
  if (!lead) {
    return NextResponse.json({ ok: false, error: 'Lead non trovato' }, { status: 404 })
  }

  // Stessa email dell'optin: MARF sposta il deal da Lead a Survey invece di duplicarlo.
  const marf = await submitToMarf({
    surveyDefinitionId: MARF_FORMS.survey['funnel-2'],
    fullName: lead.name ?? '',
    email: lead.email,
    phone: lead.phone ?? '',
    answers: parsed.data.answers,
    tracking: lead.tracking,
    formStart: parsed.data.formStart,
  })

  if (!marf.ok && marf.invalid) {
    return NextResponse.json({ ok: false, error: 'Dati non validi' }, { status: 400 })
  }

  await db
    .update(leads)
    .set({ answers: sql`${leads.answers} || ${JSON.stringify(parsed.data.answers)}::jsonb` })
    .where(eq(leads.id, leadId))

  return NextResponse.json({ ok: true })
}
