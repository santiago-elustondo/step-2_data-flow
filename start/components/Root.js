import React from 'react'
import { connect } from 'react-redux'
import { View, Platform, ProgressBarAndroid, ProgressViewIOS, ActivityIndicator } from 'react-native'

import { thinker } from '../thinker-sdk.singleton'
import { AuthScreen } from './AuthScreen'
import { Navbar } from './Navbar'
import { FeedScreen } from './FeedScreen'
import { LoadingSpinner } from './LoadingSpinner'
import s from './Root.styles'


export const Root = connect(
  state => ({
    auth: state.auth
  })
)(({ auth }) => 
  <View style={s.appContainer}>
    <View style={s.topPadding}></View>
    {
      auth.state === 'LOADING' ? (
        <ActivityIndicator/>
      ) : auth.state === 'LOGGED-IN' ? (
        <>
          <Navbar/>
          <FeedScreen/>
        </>
      ) : (
        <AuthScreen/>  
      )
    }
  </View>
)