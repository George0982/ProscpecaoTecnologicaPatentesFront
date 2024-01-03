export default function ({ store, redirect, app }) {
    // If the user is authenticated redirect to home page
    const auth = app.$apolloHelpers.getToken()

    if (auth) {
        return redirect('/lista')
    }
}
