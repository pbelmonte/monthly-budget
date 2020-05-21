const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const monthNamesSpanish = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]

const today = () => {
  const d = new Date()

  return {
    date: d.getDate(),
    month: monthNames[d.getMonth()],
    monthNumber: d.getMonth() + 1,
    monthSpanish: monthNamesSpanish[d.getMonth()],
    year: d.getFullYear(),
  }
}

const monthToNumber = month => monthNames.findIndex(month) + 1

const numberToMonth = number => monthNames[number - 1]

const daysInMonth = (month, year) => {
  return parseInt(new Date(year, month, 0).getDate())
}

export {
  today,
  monthToNumber,
  numberToMonth,
  daysInMonth,
}