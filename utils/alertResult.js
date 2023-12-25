export default function alertResult(isOk, text) {
    if (isOk) {
        alert(`${text}成功`)
    } else {
        alert(`${text}失敗`)
    }
}