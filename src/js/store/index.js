import Vuex from 'vuex';

import state from './state.js';
import mutations from './mutations.js';
import CF from '../../CF.js'
CF.Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    mutations,
});

export default store;