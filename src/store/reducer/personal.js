import * as types from './../ActionTypes/ActionTypes'


const personal = (state = {}, action) => {
  switch (action.type) {
    case 'VALIDATE_PASSWORD':
      return { ...state, validate_password: action.validate_password }
      break;
    default:
      return state
  }
}
export default personal