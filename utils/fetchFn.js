import getToken from '@utils/getToken.js'

export default async function fetchWithToken(url, method = 'GET', body = undefined) {
    const baseUrl = import.meta.env.VITE_BACKEND_HOST
    const token = getToken()

    try {
        const res = await fetch(baseUrl + url, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method,
            body: JSON.stringify(body)
        })
        return await res.json()
    } catch (err) {
        console.log('fetch error', url)
        console.log(err)
    }
}

export async function fetchWithoutToken(url, method = 'GET', body = undefined) {
    const baseUrl = import.meta.env.VITE_BACKEND_HOST
    try {
        const res = await fetch(baseUrl + url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method,
            body: JSON.stringify(body)
        })
        return await res.json()
    } catch (err) {
        console.log('fetch error', url)
        console.log(err)
    }
}



