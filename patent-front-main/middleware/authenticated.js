export default function ({ store, redirect, app }) {
    const auth = app.$apolloHelpers.getToken()

    if (!auth) {
        store.commit('user/setAuth', null)
        return redirect('/')
    }
}
