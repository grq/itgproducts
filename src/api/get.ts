import { logError } from "@/lib/logger"

export const get = async <T = unknown>(endpoint: string, token?: string, options?: Partial<RequestInit>) => {
  const url = `${import.meta.env.VITE_API_URL}/${endpoint}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
    ...options,
  })
  if (!response.ok) {
    logError(`Failed to fetch ${url}: ${response.statusText}`)
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
  }
  let json: T
  try {
    json = await response.json()
  } catch (e) {
    logError(`Failed to parse response as JSON: ${e}`)
    throw new Error(`Failed to parse response as JSON: ${e}`)
  }
  return json
}
