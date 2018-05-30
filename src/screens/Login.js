import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

const SERVER_IP = '192.168.1.109'
const SERVER_PORT = 3000

export default class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  SERVER_IP

  componentDidMount() {
    this
      ._loadInitialState()
      .done()
  }

  _loadInitialState = async() => {

    var value = await AsyncStorage.getItem('user')
    if (value !== null) {
      this
        .props
        .navigation
        .navigate('Profile')
    }

  }

  login = () => {
    alert(this.state.username+ '/'+ this.state.password)
    fetch(`http://${SERVER_IP}:${SERVER_PORT}/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: this.state.username, password: this.state.password})
    }).then((response) => response.json()).then((res) => {
      if (res.success === true) {
        AsyncStorage.setItem('user', res.user);
        this
          .props
          .navigation
          .navigate('Profile')
      }else{
        alert(res.message)
      }
    }).done();
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.header}>- LOG IN -</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            onChangeText=
            {(username) => this.setState({username})}
            underlineColorAndroid='transparent'/>

          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText=
            {(password) => this.setState({password})}
            underlineColorAndroid='transparent'/>

          <TouchableOpacity style={styles.btn} onPress={this.login}>
            <Text style={styles.textBtn}>LOG IN</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#2896d3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold'
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: '#01c853',
    padding: 20,
    alignItems: 'center'
  },
  textBtn: {
    color: '#fff'
  }
});