const initialState = {
  language: "en",
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_LANGUAGE": {
      return { ...state, language: action.payload }
    }
    default:
      return { ...state }
  }
}
