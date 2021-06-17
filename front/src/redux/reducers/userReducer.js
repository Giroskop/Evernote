import GET_CURRENT_USER from '../types/user'
import USER_LOGIN from '../types/user'
import USER_LOGOUT from '../types/user'
import USER_CREATE from '../types/user'
import USER_UPDATE from '../types/user'


export default function userReducer(state={}, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return { ...action.payload }
    case USER_LOGOUT:
      return { ...action.payload  }
    case USER_CREATE:
      return { ...action.payload  }
    case USER_UPDATE:
      return { ...action.payload  }
    
    default:
      return state
  }
}

/* name: {
  firstName: String,
  lastName: String,
},
email: String,
password: String,
created: Date
}) */
