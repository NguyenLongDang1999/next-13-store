/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */

// ** Checks if the passed date is today
const isToday = (date: Date | string) => {
    const today = new Date()

    return (
        new Date(date).getDate() === today.getDate() &&
        new Date(date).getMonth() === today.getMonth() &&
        new Date(date).getFullYear() === today.getFullYear()
    )
}

export const formatDate = (
    value: Date | string,
    formatting: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: '2-digit' }
) => {
    if (!value) return value

    return new Intl.DateTimeFormat('vi-VN', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value: Date | string, toTimeForCurrentDay = true) => {
    const date = new Date(value)
    let formatting: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }

    if (toTimeForCurrentDay && isToday(date)) {
        formatting = { hour: 'numeric', minute: 'numeric' }
    }

    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// Format expiration date in any credit card
export const formatExpirationDate = (value: string) => {
    const finalValue = value
        .replace(/^([1-9]\/|[2-9])$/g, '0$1/') // 3 > 03/
        .replace(/^(0[1-9]|1[0-2])$/g, '$1/') // 11 > 11/
        .replace(/^([0-1])([3-9])$/g, '0$1/$2') // 13 > 01/3
        .replace(/^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2') // 141 > 01/41
        .replace(/^([0]+)\/|[0]+$/g, '0') // 0/ > 0 and 00 > 0
        // To allow only digits and `/`
        .replace(/[^\d\/]|^[\/]*$/g, '')
        .replace(/\/\//g, '/') // Prevent entering more than 1 `/`

    return finalValue
}
