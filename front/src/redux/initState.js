
const initState = {
  error: {
    status: null,
    message: null,
    id: null
  },
  auth: {
    token: localStorage.getItem('token'),
    isAuth: false,
    isLoading: false,
    user: null
  },
  user: {},
  notepads: [],
  placemarks: [],
  path: ''
}
export default initState
