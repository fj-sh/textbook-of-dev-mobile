export function getSlashSeparatedDate(dateString: string) {
  const { year, month, day } = getDateParts(dateString)
  return `${year.toString()}/${month}/${day}`
}

export function convertIso8601(year: string, month: string, day: string) {
  return `${year}-${month}-${day}T01:11:11+09:00`
}
export function getDateParts(dateString: string) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  return {
    year,
    month,
    day,
  }
}
export function getYYYYMMDD(dateString: string) {
  const { year, month, day } = getDateParts(dateString)
  return `${year.toString()}-${month}-${day}`
}
export function getIso8601(dateString: string) {
  const { year, month, day } = getDateParts(dateString)
  return convertIso8601(year.toString(), month, day)
}
