import React from 'react'
import { Text, View, Button } from 'react-native'

import { thinker } from '../thinker-sdk.singleton'
import s from './Navbar_old.styles'

export const Navbar = ({ onLogout }) => 
  <View style={s.container}>
    <View style={s.leftSide}>
      <Text style={s.greeting}>
        Hello, {thinker.user().username}!
      </Text>
    </View>
    <View style={s.rightSide}>
      <Button 
        onPress={() => thinker.logout()}
        title='Log out'
      />
    </View>
  </View>
