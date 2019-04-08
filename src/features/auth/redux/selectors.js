export function isLoggedIn(state) {
  return state.auth.login
}

export function getUsername(state) {
  console.log(state.auth)
  return state.auth.username
}