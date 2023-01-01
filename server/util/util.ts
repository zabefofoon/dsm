const strToArr = (str: string): string[] => str
    .replace(/\[|]/gi, '')
    .split(',')
    .map((str) => str.replace(/ /g, ''))

export {
  strToArr
}