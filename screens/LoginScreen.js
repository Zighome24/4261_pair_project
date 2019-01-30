import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { SERVER_ADDRESS, SERVER_PORT, CUR_AUTH_USER } from '../utils/Const'

export default class LoginScreen extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleLogin = () => {
    const { email, password } = this.state;
    const body = {email: email, p_hash: password};
    fetch(`${SERVER_ADDRESS}:${SERVER_PORT}/login`, {
      method: 'post',
      body: JSON.stringify(body)
    }).then(response => {
      if (response.ok) {
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
        throw new Error(res_data.error_message);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
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