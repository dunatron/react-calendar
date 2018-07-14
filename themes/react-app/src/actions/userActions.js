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

// export function setValidateToken(name) {
//   return {
//     type: "SET_VALIDATE_TOKEN_PROPS",
//     payload: name,
//   }
// }
export const setValidateTokenProps = ({ Code, Message, Valid }) => {
  return {
    type: "SET_VALIDATE_TOKEN_PROPS",
    payload: {
      tokenIsValid: Valid,
      code: Code,
      message: Message,
    },
  }
}

export const setLoginProps = ({ ID, FirstName, Token, Valid }) => {
  return {
    type: "SET_LOGIN_PROPS",
    payload: {
      username: FirstName,
      id: ID,
      token: Token,
      valid: Valid,
    },
  }
}
