

export function nextMonth() {
  return {
    type: "INC_CURRENT_DATE_MONTH",
    payload: {},
  }
}

export function prevMonth() {
  return {
    type: "DEC_CURRENT_DATE_MONTH",
    payload: {},
  }
}

