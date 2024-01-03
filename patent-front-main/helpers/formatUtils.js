export function formataAnoMes (item) {
    const monthYear = {
        '01': 'JAN',
        '02': 'FEV',
        '03': 'MAR',
        '04': 'ABR',
        '05': 'MAI',
        '06': 'JUN',
        '07': 'JUL',
        '08': 'AGO',
        '09': 'SET',
        10: 'OUT',
        11: 'NOV',
        12: 'DEZ'
    }

    const year = item.toString().substring(0, 4)
    const month = item.toString().substring(6, 4)

    return `${monthYear[month]}/${year}`
}
