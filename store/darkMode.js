export const state = () => ({
  darkMode: '',
})

export const mutations = {
  setItems(state, items) {
    state.darkMode = items
  },
}

export const actions = {
  setDarkMode(
    { state, commit },
    options = process.browser && localStorage.getItem('nightMode')
  ) {
    commit('setItems', options)
  },
}
