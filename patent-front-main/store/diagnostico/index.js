// Vee Validate
import actions from './actions'
import getters from './getters'
import initialState from './state'
import mutations from './mutations'

export default {
    actions,
    getters,
    mutations,
    namespaced: true,
    state: initialState
}
