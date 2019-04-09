export function isLoggedIn(state) {
  return state.auth.login
}

export function getUsername(state) {
  return state.auth.username
}