export function getFormattedDate(monthOffset = 0) {
  const now = new Date()
  const targetDate = new Date(now)
  targetDate.setMonth(now.getMonth() + monthOffset)

  return targetDate.toLocaleDateString('en-GB')
}