export const state = () => ({
  playlists: []
})

export const mutations = {
  SET_PLAYLISTS(state, payload) {
    state.playlists.push(payload)
    localStorage.setItem('playlists', JSON.stringify(state.playlists))
    console.log(state)
  },
  INIT_DATA(state, payload) {
    state.playlists = payload
  },
  REMOVE_TRACK(state, payload) {
    const _filter = state.playlists.filter(track => track.id !== payload.id)
    console.log('filter', _filter)
    state.playlists = _filter
    localStorage.setItem('playlists', JSON.stringify(state.playlists))
  }
}

export const actions = {
  addToPlaylists({ commit }, payload) {
    commit('SET_PLAYLISTS', payload)
  },
  removeFromPlaylist({ commit }, payload) {
    commit('REMOVE_TRACK', payload)
  }
}
