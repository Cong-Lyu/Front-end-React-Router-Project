export function getFormattedDate(monthOffset = 0) {
  const now = new Date()
  const targetDate = new Date(now)
  targetDate.setMonth(now.getMonth() + monthOffset)

  const day = String(targetDate.getDate()).padStart(2, '0')
  const month = String(targetDate.getMonth() + 1).padStart(2, '0')
  const year = targetDate.getFullYear()

  return `${year}-${month}-${day}`
}