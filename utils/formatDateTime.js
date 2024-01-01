export default function formatDateTime(dateString) {
    const date = formatDate(dateString)
    const time = formatTime(dateString)
    return `${date} ${time}`
}

export function formatDate(dateString) {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export function formatTime(dateString) {
    const date = new Date(dateString)
    const hour = date.getHours()
    const min = String(date.getMinutes()).padStart(2, '0')
    const sec = String(date.getSeconds()).padStart(2, '0')
    return `${hour}:${min}:${sec}`
}

