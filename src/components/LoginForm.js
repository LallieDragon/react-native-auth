import React, { Component } from "react";
import { Text } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardItem, InputField, Spinner } from "./common";

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({
      error: '',
      loading: true
    })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(this.onLoginFailure.bind(this));
      });
  }

  onLoginFailure() {
    this.setState({
      error: 'Authentication Failed.',
      loading: false
    })
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    })
  }

  render() {
    let buttonOrSpinner;

    if (this.state.loading) {
      buttonOrSpinner = ( <Spinner size="small" /> )
    }
    else {
      buttonOrSpinner = ( <Button onPress={this.onButtonPress.bind(this)} buttonText='Login' /> )
    }

    return (
      <Card>
        <CardItem>
          <InputField
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardItem>

        <CardItem>
          <InputField
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardItem>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardItem>
          {buttonOrSpinner}
        </CardItem>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default LoginForm;
