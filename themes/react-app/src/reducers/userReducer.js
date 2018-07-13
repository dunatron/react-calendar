const initialState = {
  name: "Dunatron",
  token: "",
  tokenIsValid: false,
  age: 27,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER_NAME": {
      return {
        ...state,
        name: action.payload,
      }
    }
    case "SET_USER_TOKEN":
      return {
        ...state,
        token: action.payload,
        tokenIsValid: true,
      }
    default:
      return { ...state }
  }
}
