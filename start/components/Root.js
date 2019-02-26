import React from 'react'
import { View, Platform, ProgressBarAndroid, ProgressViewIOS, ActivityIndicator } from 'react-native'

import { thinker } from '../thinker-sdk.singleton'
import { AuthScreen } from './AuthScreen'
import { Navbar } from './Navbar'
import { FeedScreen } from './FeedScreen'
import { LoadingSpinner } from './LoadingSpinner'
import s from './Root.styles'

export class Root extends React.PureComponent {

  state = {
    auth: thinker.auth()
  }

  componentDidMount() {
    thinker.subscribeToAuth(auth => this.setState({ auth }))
  }

  render() {
    const { auth } = this.state
    return (
      <View style={s.appContainer}>
        <View style={s.topPadding}></View>
        {
          auth.state === 'LOADING' ? (
            <ActivityIndicator/>
          ) : auth.state === 'LOGGED-IN' ? (
            <Navbar 
              loggedInUser={auth.user}
              onLogout={() => this.setState({ user: null })}
            />
          ) : (
            <AuthScreen 
              onLoggedIn={user => this.setState({ user })}
            />  
          )
        }
      </View>
    )
  }
}