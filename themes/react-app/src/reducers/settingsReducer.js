const initialState = {
  clientLogo: '',
  happLogo: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_LOGO": {
      return {...state, [action.payload.type]: action.payload.url}
    }
  }
  return state;
}