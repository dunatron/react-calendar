import "./index.css"

import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"
import { Provider as ReduxProvider } from "react-redux"
import store from "./state/store"

import ApolloApp from "./ApolloApp"
import { saveState } from "./state/localStorage"
import throttle from "lodash/throttle"
import { PERSISTENT_STORE_KEYS_ARR } from "./constants"

// try {
//   const jwtToken = localStorage.getItem("jwt")
//   console.log("ENTER THE JWT ", jwtToken)
//   if (jwtToken === null || jwtToken === undefined) {
//     localStorage.setItem("jwt", "")
//   }
// } catch (err) {}

// Redux function which will help us subscribe our store state, using our saveState function
store.subscribe(
  throttle(() => {
    // saveState(store.getState()) // This would save our entire store state
    // The below is probably fairly taxing? record the time with console logs it takes to save.
    // use a filter to filter out shit
    const storeState = store.getState()
    const persistentState = Object.keys(storeState)
      .filter(key => PERSISTENT_STORE_KEYS_ARR.includes(key))
      .reduce((obj, key) => {
        obj[key] = storeState[key]
        return obj
      }, {})
    console.log("storeState ->", storeState)
    console.log("filteredState ->", persistentState)
    saveState({
      locale: store.getState().locale,
      createEvent: store.getState().createEvent,
      currentEvent: store.getState().currentEvent,
      event: store.getState().event,
      // header: store.getState().header,
      search: store.getState().search,
      // settings: store.getState().settings,
      // tags: store.getState().tags,
      user: store.getState().user,
    })
  }, 1500)
)

ReactDOM.render(
  <ReduxProvider store={store}>
    <ApolloApp />
  </ReduxProvider>,
  document.getElementById("react-root")
)
registerServiceWorker()
