export default function getToken() {
    const token = localStorage.getItem('token')
    if (!token) {
        alert('請重新登入')
        location.href = '/login'
        return
    }
    return token
}

