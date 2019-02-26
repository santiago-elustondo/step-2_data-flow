import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { Root } from './components/Root'
import { createTransitionalReducer, transition } from './transitional-redux'
import { thinker } from './thinker-sdk.singleton'

const initialState = {
  auth: thinker.auth(),
  drawerOpen: false
}

const store = createStore(
  createTransitionalReducer({ initialState })
)

thinker.subscribeToAuth(auth => 
  // this.setState for whole app
  store.dispatch(transition(
    state => ({ auth }) // transition state to new state (merge job)
  ))
)

export default () => 
  <Provider store={store}>
    <Root/>
  </Provider>