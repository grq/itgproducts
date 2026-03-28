import { logError } from "@/lib/logger"

export const post = async <T = unknown, D = unknown>(endpoint: string, data: D, options?: Partial<RequestInit>): Promise<T> => {
  const url = `${import.meta.env.VITE_API_URL}/${endpoint}`
  let body: string | undefined
  if (data) {
    try {
      body = JSON.stringify(data)
    } catch (e) {
      logError(`Failed to stringify data: ${e}`)
      throw new Error(`Failed to stringify data: ${e}`)
    }
  }
  const response = await fetch(url, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
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