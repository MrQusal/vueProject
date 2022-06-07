export const getToken = () => {
  localStorage.getItem("gmall_token")
}
export const setToken = (token) => {
  localStorage.setItem("gmall_token", token);
}
export const removeToken = () => {
  localStorage.removeItem("gmall_token")
}