/**
 * Başvuru gönderimi — statik fazda sahte yanıt.
 * Backend hazır olduğunda: POST /api/applications (multipart veya JSON + ayrı upload).
 */

export type ApplicationPayload = Record<string, string | string[] | File | null>

export async function submitApplication(payload: ApplicationPayload): Promise<{ ok: true; id: string }> {
  await new Promise((r) => setTimeout(r, 600))
  return { ok: true, id: `mock-${Date.now()}-${Object.keys(payload).length}` }
}

export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
}

/** İletişim formu — gerçeğe bağlıyoruz */
export async function submitContact(payload: ContactPayload): Promise<{ ok: true; id: string }> {
  try {
    const res = await fetch('http://localhost:5144/api/contactmessages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) throw new Error("API hatası");
    
    return { ok: true, id: `contact-${Date.now()}` }
  } catch (error) {
    throw error;
  }
}
