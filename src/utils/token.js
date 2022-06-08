export const getToken = () => {
  return localStorage.getItem("gmall_token")
}
export const setToken = (token) => {
  return localStorage.setItem("gmall_token", token);
}
export const removeToken = () => {
  return localStorage.removeItem("gmall_token")
}