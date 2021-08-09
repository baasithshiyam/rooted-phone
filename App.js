/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import JailMonkey from 'jail-monkey';
import AwesomeAlert from 'react-native-awesome-alerts';



class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isRestrictUser: false,
      showAlert: false
    };
    this.appRestriction();
  }

  appRestriction = async () => {
    try {

      // is this device JailBroken on iOS/Android?
      let isJailBroken = await JailMonkey.isJailBroken();
      this.rejectRoot(isJailBroken);

      // Can this device mock location - no need to root!
      // uses vpn
      let canMockLocation = await JailMonkey.canMockLocation();
      this.rejectRoot(canMockLocation);

      // Check if device violates any of the above
      let trustFall = await JailMonkey.trustFall();
      this.rejectRoot(trustFall);

    } catch (error) {

      console.log('error occurs: ', error);
    }
  };

  rejectRoot(founded) {
    if (founded) {
      this.setState({ isRestrictUser: true });
    }
  }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Basith!</Text>
        <Text style={styles.instructions}>Now Lets see weather the phone is rooted </Text>
        <Text style={styles.instructions}>Demo for Rooted Phones </Text>
        {this.state.isRestrictUser === true ? <TouchableOpacity onPress={() => {
          this.showAlert();
        }}>
          <View style={styles.button}>
            <Text style={styles.text}>Warning!!!</Text>
          </View>
        </TouchableOpacity>: null }


        <AwesomeAlert
            show={this.state.showAlert}
            showProgress={false}
            title="Warning"
            message="We have identified your phone is rooted !!!!"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Yes, move forward"
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
              this.hideAlert();
            }}
            onConfirmPressed={() => {
              this.hideAlert();
            }}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bfeecc',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#ff0000",
  },
  text: {
    color: '#fff',
    fontSize: 15
  }
});
export default App;