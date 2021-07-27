
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
  modals: {
    backLayoutActive: false,
    placemarkFormActive: false,
    placemarkEditActive: false,
  },
}
export default initState
