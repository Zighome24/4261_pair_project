import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { URLSearchParams } from 'url-search-params';

export default class SignUpScreen extends React.Component {
  state = { email: '', password: '', errorMessage: null };

  handleSignUp = () => {
    console.log('trying to sign up');
    const { email, password } = this.state;
    handleLogin = () => {
      const { email, password } = this.state;
      const data = new URLSearchParams();
      data.append('email',email);
      data.append('p_hash', password);
      fetch(`${SERVER_ADDRESS}/signup`, {
        method: 'post',
        body: data.toString(),
        headers: {
          // "Content-Type": "application/json; charset=utf-8",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then(response => {
        if (response.ok) {
          console.log('received response');
          return response.json()
        } else {
          throw new Error('Something ain\'t right');
        }
      }).then(res_data => {
        if (res_data.valid === 'true') {
          CUR_AUTH_USER.email = email;
          CUR_AUTH_USER.uuid = res_data.uuid;
          CUR_AUTH_USER.authenticated = true;
          this.props.navigation.navigate('Main');
        } else {
          throw new Error(res_data.errorMessage);
        }
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
});