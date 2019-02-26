import React from 'react'
import {  View, Text, TextInput, Button, FlatList, Keyboard, ActivityIndicator, KeyboardAvoidingView } from 'react-native'

import { thinker } from '../thinker-sdk.singleton'
import { LoadingSpinner } from './LoadingSpinner'
import { ThoughtCard } from './ThoughtCard'
import s from './FeedScreen.styles'

export class FeedScreen extends React.Component {

  state = {
    thoughts: null,
    newThoughtText: ''
  }

  thoughtHandler = thoughts => this.setState({ thoughts })

  componentDidMount() {
    thinker.subscribeToThoughts(this.thoughtHandler)
    this.keyboardDidHideListener 
      = Keyboard.addListener('keyboardDidHide', () => this.setState({ keyboardOpen: false }))
    this.keyboardDidShowListener 
      = Keyboard.addListener('keyboardDidShow', () => this.setState({ keyboardOpen: true }))
  }

  componentWillUnmount() {
    thinker.unsubscribeToThoughts(this.thoughtHandler)
    this.keyboardDidHideListener.remove()
    this.keyboardDidShowListener.remove()
  }

  async submit() {
    const { thoughts, newThoughtText } = this.state
    this.setState({ 
      newThoughtText: '',
      submitting: true
    })
    const thought = await thinker.addThought({ content: newThoughtText })
    this.setState({ 
      submitting: false,
      thoughts: [ thought ].concat(thoughts)
    })
  }

  render() {
    const { newThoughtText, submitting, thoughts, keyboardHeight } = this.state

    return (
      <KeyboardAvoidingView style={{ ...s.container, paddingBottom: keyboardHeight }} behavior="padding" enabled>
        <View style={s.feedContainer}>
          {
            thoughts ? (
              <FlatList
                data={thoughts}
                keyExtractor={item => item._id}
                renderItem={({ item }) => <ThoughtCard thought={item}/>}
              />
            ) : (
              <ActivityIndicator/>
            )
          }
        </View>
        <View style={s.newThoughtContainer}>
          <Text style={s.newThoughtTitle}>
            What are you thinking about?
          </Text>
          <TextInput 
            style={s.newThoughtInput}
            multiline={true}
            numberOfLines={2}
            value={newThoughtText}
            onChangeText={newThoughtText => this.setState({ newThoughtText })}
          />
          {
            submitting ? (
              <ActivityIndicator/>
            ) : (
              <Button 
                style={s.newThoughtButton} 
                title='submit'
                onPress={() => this.submit()}
              />
            )
          }
        </View>
      </KeyboardAvoidingView>
    )
  }
}