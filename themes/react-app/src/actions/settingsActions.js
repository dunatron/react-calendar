export function updateLogo(type, url) {
  return {
    type: "UPDATE_LOGO",
    payload: {
      type: type,
      url: url
    }
  }
}

export function updateDimensions(width, height){
  return {
    type: "UPDATE_DIMENSIONS",
    payload: {
      width: width,
      height: height
    }
  }
}