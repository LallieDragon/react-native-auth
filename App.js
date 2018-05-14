import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

import { Button, Header, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

class App extends Component {
  state = {
    loggedIn: false
  };

  componentWillMount() {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyBAuIP7rbLH9hRb-bI_9KtWf0QRi4g1_uc',
      authDomain: 'auth-react-native-d4fc6.firebaseapp.com',
      databaseURL: 'https://auth-react-native-d4fc6.firebaseio.com',
      projectId: 'auth-react-native-d4fc6',
      storageBucket: 'auth-react-native-d4fc6.appspot.com',
      messagingSenderId: '1031276424552'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true})
      } else {
        this.setState({ loggedIn: false})
      }
    });
  }

  render() {
    let content;

    switch (this.state.loggedIn) {
      case true:
        content = (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        content = <LoginForm />
      default:
        content = <Spinner size='large'/>
    }


    return (
      <View>
        <Header headerText='Authentication' />
        {content}
      </View>
    );
  }
}

export default App
