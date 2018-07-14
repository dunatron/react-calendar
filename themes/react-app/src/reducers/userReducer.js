const initialState = {
  username: "",
  age: 27,
  tokenProps: {
    token: "",
    valid: false,
    message: "",
    code: 401,
  },
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER_NAME": {
      return {
        ...state,
        username: action.payload,
      }
    }
    case "SET_USER_TOKEN":
      return {
        ...state,
        tokenProps: {
          ...state.tokenProps,
          token: action.payload,
          valid: true,
        },
      }
    case "SET_LOGIN_PROPS":
      return {
        ...state,
        username: action.payload.username,
        id: action.payload.id,
        tokenProps: {
          ...state.tokenProps,
          token: action.payload.token,
          valid: action.payload.valid,
        },
      }
    case "SET_VALIDATE_TOKEN_PROPS":
      return {
        ...state,
        tokenProps: {
          ...state.tokenProps,
          code: action.payload.code,
          message: action.payload.message,
          valid: action.payload.tokenIsValid,
        },
      }
    default:
      return { ...state }
  }
}
