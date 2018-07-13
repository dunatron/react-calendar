export function fetchUser() {
  return {
    type: "FETCH_USER_FULFILLED",
    payload: {
      name: "Heath",
      age: 26,
    },
  }
}

export function setUserName(name) {
  return {
    type: "SET_USER_NAME",
    payload: name,
  }
}

export function setUserAge(age) {
  return {
    type: "SET_USER_AGE",
    payload: age,
  }
}

export function setToken(token) {
  return {
    type: "SET_USER_TOKEN",
    payload: token,
  }
}
