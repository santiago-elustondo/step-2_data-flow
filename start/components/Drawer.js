import React from 'react'
import { connect } from 'react-redux'
import { TouchableHighlight, Animated, View, Text, Button, Easing } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { t } from '../transitional-redux'
import { thinker } from '../thinker-sdk.singleton'
import s from './Drawer.styles'

export const Drawer = connect(
  state => ({
    open: state.drawerOpen
  })
)(
class extends React.Component {

  state = {
    shouldStartOpacityAnimation: false,
    lastProps: {}
  }

  overlayOpacity = new Animated.Value(0)

  constructor() {
    super()
    console.log('fffff')
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.lastProps.open && props.open) {
      return {
        shouldStartOpacityAnimation: true,
        lastProps: props
      }
    }

    return {
      lastProps: props
    }
  }

  componentDidUpdate() {
    const { shouldStartOpacityAnimation } = this.state
    if (shouldStartOpacityAnimation) {
      console.log('if tre134324' )
      Animated.timing(                  
        this.overlayOpacity, {
          toValue: 1,                  
          duration: 1000,              
          easing: Easing.ease
        }
      ).start()
      this.setState({ shouldStartOpacityAnimation: false })
    }
  }

  render () {
    const { open } = this.props
    return open ? (
      <>
        <TouchableHighlight style={s.overlayTouchable} onPress={() => null}>
          <Animated.View style={{ ...s.overlayColor, opacity: this.overlayOpacity }}></Animated.View>
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
    ) : null
  }
})