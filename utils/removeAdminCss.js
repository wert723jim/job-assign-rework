export default function removeAdminCss() {
    const allAdminCss = document.getElementsByClassName('admin-css')
    for (const adminCss of allAdminCss) {
    console.log('remove css', adminCss)
    adminCss.remove()
}
}