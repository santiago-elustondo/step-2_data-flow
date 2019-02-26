import React from 'react'
import { View } from 'react-native'

import { thinker } from '../thinker-sdk.singleton'
import { AuthScreen } from './AuthScreen'
import { Navbar } from './Navbar'
import { FeedScreen } from './FeedScreen'
import { LoadingSpinner } from './LoadingSpinner'
import s from './Root.styles'

export class Root extends React.PureComponent {

  render() {


    return (
      <View style={s.appContainer}>
        <View style={s.topPadding}></View>
        <AuthScreen/>
      </View>
    )
  }
}