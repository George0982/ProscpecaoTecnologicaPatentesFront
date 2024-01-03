export default {
    nuxtServerInit ({ commit }, { req }) {
        const cookieparser = process.server ? require('cookieparser') : undefined
        let auth = null
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                auth = JSON.parse(parsed.auth)
            } catch (err) {
                // No valid cookie found
            }
        }
        commit('setAuth', auth)
    }
}
