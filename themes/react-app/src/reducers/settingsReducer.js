const initialState = {
  clientLogo: '',
  happLogo: '',
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  isMobileDevice: true
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_LOGO": {
      return {...state, [action.payload.type]: action.payload.url}
    }
    case "UPDATE_DIMENSIONS": {
      const { width, height } = action.payload
      let isMobile = true
      if (width >= 960) {
        isMobile = false
      }
      return {
        ...state,
        windowWidth: width,
        windowHeight: height,
        isMobileDevice: isMobile
      }
    }
  }
  return state;
}