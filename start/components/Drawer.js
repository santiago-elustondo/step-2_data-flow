import React from 'react'
import { connect } from 'react-redux'
import { TouchableHighlight, Animated, View, Text, Button, Easing } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { t } from '../transitional-redux'
import { thinker } from '../thinker-sdk.singleton'
import s from './Drawer.styles'

export const Drawer = class extends React.Component {

  render () {

    return (
      <>
        <TouchableHighlight style={s.overlayTouchable} onPress={() => null}>
          <Animated.View style={{ ...s.overlayColor }}></Animated.View>
        </TouchableHighlight>
        <Animated.View style={{ ...s.drawerOuter }}>
          <View style={s.drawerInner}>
            <View style={s.usernameRowOuter}>
              <View style={s.usernameRowInner}>
                <Text style={s.usernameIcon}>
                  <Ionicons name="md-person" size={32} />
                </Text>
                <View style={s.space}></View>
                <Text style={s.usernameText}>
                  {'auth.user.username'}
                </Text>
              </View>
            </View>
            <View style={s.space}></View>
            <View>
              <Button
                title='logout'
                onPress={() => thinker.logout()}
              />
            </View> 
          </View>
        </Animated.View>
      </>
    )
  }
}