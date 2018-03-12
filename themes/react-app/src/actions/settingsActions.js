export function updateLogo(type, url) {
  return {
    type: "UPDATE_LOGO",
    payload: {
      type: type,
      url: url
    }
  }
}