export function convertNumberToStringWithRoundedComma(baseNum: number) {
  return (Math.round(baseNum / 100) * 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
