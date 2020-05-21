export default (amount, thousands = ".") => {
  const negativeSign = amount < 0 ? "-" : ""

  let i = parseInt(amount = Math.abs(Number(amount) || 0)).toString()
  let j = (i.length > 3) ? i.length % 3 : 0

  return negativeSign + '$' + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands)
}