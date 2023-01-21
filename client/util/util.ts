const formatDate = (date: Date, separator = '-') => new Intl.DateTimeFormat(
    window.navigator.language,
    {month: '2-digit', day: '2-digit', year: 'numeric'})
    .format(new Date(date))
    .replace(/\./gi, '')
    .replace(/ /gi, separator)

export default {
  formatDate
}