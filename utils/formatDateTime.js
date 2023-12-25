export default function formatDateTime(dateString) {
    const date = formatDate(dateString)
    const time = formatTime(dateString)
    return `${date} ${time}`
}

export function formatDate(dateString) {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${month}-${day}`
}

export function formatTime(dateString) {
    const date = new Date(dateString)
    const hour = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    return `${hour}:${min}:${sec}`
}

