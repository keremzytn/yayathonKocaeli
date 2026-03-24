/**
 * Başvuru gönderimi — statik fazda sahte yanıt.
 * Backend hazır olduğunda: POST /api/applications (multipart veya JSON + ayrı upload).
 */

export type ApplicationPayload = Record<string, string | string[] | File | null>

export async function submitApplication(payload: ApplicationPayload): Promise<{ ok: true; id: string }> {
  await new Promise((r) => setTimeout(r, 600))
  return { ok: true, id: `mock-${Date.now()}-${Object.keys(payload).length}` }
}
