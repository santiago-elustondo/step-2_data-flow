import React from 'react'
import {  View, Text, TextInput, Button, FlatList, Keyboard } from 'react-native'

import { thinker } from '../thinker-sdk.singleton'
import { LoadingSpinner } from './LoadingSpinner'
import { ThoughtCard } from './ThoughtCard'
import s from './FeedScreen.styles'

export class FeedScreen extends React.Component {

  state = {}

  render() {
    const { newThoughtText, thoughts, loading, submitting, keyboardHeight } = this.state

    return (
      <View style={{ ...s.container, paddingBottom: keyboardHeight }}>
        <View style={s.feedContainer}>
          <Text> feed </Text>
        </View>
        <View style={s.newThoughtContainer}>
          <Text style={s.newThoughtTitle}>
            What are you thinking about?
          </Text>
          <TextInput 
            style={s.newThoughtInput}
            multiline={true}
            numberOfLines={2}
          />
          <Button 
            style={s.newThoughtButton} 
            title='submit'
          />
        </View>
      </View>
    )
  }
}