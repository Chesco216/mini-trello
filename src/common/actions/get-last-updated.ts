
export const getLastUpdated = (lastWorkspaceUPdate: number) => {
  if (lastWorkspaceUPdate < 60 * 60 * 1000) {
    const mins = lastWorkspaceUPdate / (60 * 1000)
    return Math.round(mins).toString() + ' min'
  } else if (lastWorkspaceUPdate < 24 * 60 * 60 * 1000) {
    const hrs = lastWorkspaceUPdate / (60 * 60 * 1000)
    return Math.round(hrs).toString() + ' hrs'
  } else if (lastWorkspaceUPdate < 7 * 24 * 60 * 60 * 1000) {
    const days = lastWorkspaceUPdate / (24 * 60 * 60 * 1000)
    return Math.round(days).toString() + ' days'
  } else if (lastWorkspaceUPdate < 4 * 7 * 24 * 60 * 60 * 1000) {
    const weeks = lastWorkspaceUPdate / (7 * 24 * 60 * 60 * 1000)
    return Math.round(weeks).toString() + ' weeks'
  } else if (lastWorkspaceUPdate < 12 * 4 * 7 * 24 * 60 * 60 * 1000) {
    const months = lastWorkspaceUPdate / (4 * 7 * 24 * 60 * 60 * 1000)
    return Math.round(months).toString() + ' months'
  }
}
