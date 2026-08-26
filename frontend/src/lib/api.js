const BACKEND = import.meta.env.REACT_APP_BACKEND_URL || ''
export const API = `${BACKEND}/api`

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function postJSON(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  let data = null
  try {
    data = await res.json()
  } catch (e) {
    data = null
  }
  if (!res.ok) {
    const err = new Error((data && data.detail) || 'Request failed')
    err.status = res.status
    throw err
  }
  return data
}
