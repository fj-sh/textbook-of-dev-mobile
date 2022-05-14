const DEV_URL = 'http://localhost:3000'
const PROD_URL = 'http://textbook-of-enterprise-mobile'

export function yyyyMmDd(): string {
  const date = new Date()
  const y = date.getFullYear()
  const m = ('00' + (date.getMonth() + 1)).slice(-2)
  const d = ('00' + date.getDate()).slice(-2)
  return y + '-' + m + '-' + d
}
