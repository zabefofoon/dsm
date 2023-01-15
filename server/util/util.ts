const strToArr = (str: string): string[] => str
    .replace(/\[|]/gi, '')
    .split(',')
    .map((str) => str.replace(/ /g, ''))

const getDateAfterMinute = (afterMinute: number) => {
  const date = new Date()
  date.setMinutes(date.getMinutes() + afterMinute)
  return date
}

export {
  strToArr,
  getDateAfterMinute
}