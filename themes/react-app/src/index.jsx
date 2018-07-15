import "./index.css"

import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"
import store from "./state/store"
import { Provider as Redux } from "react-redux"
import ApolloApp from "./ApolloApp"
import { saveState } from "./state/localStorage"
import throttle from "lodash/throttle"

// Redux function which will help us subscribe our store state, using our saveState function
store.subscribe(
  throttle(() => {
    // saveState(store.getState()) // This would save our entire store state
    saveState({
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
  <Redux store={store}>
    <ApolloApp />
  </Redux>,
  document.getElementById("react-root")
)
registerServiceWorker()
