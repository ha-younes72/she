import React from 'react'
import { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import { goToAuth } from '../utils/navigation'

import AsyncStorage from '@react-native-community/async-storage'
import ProgressBar from './_global/ProgressBar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from './authentication/actions';
import NetInfo from "@react-native-community/netinfo";

class Initialising extends Component {
  state = {
    isConnected: true
  }

  async componentDidMount() {
    //NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      this.setState({ isConnected: state.isConnected }, () => {
        this.props.actions.setStatus(this.state.isConnected)
      })
    });
    
    try {
      //await AsyncStorage.clear()
      const userToken = await AsyncStorage.getItem('userToken');

      console.log("UserToken From Async", userToken)
      /*Icon.getImageSource('ios-cart', 24, 'red').then(res => {
        console.log("Source: ", res.uri)
      })*/
      let user = null;
      if (userToken === null) {
        goToAuth();
      } else {
        user = JSON.parse(userToken);
        console.log("User From Async", user)
        this.props.actions.signinUser(user);
      }
    } catch (err) {
      console.log('error: ', err)
      goToAuth()
    }
  }

  componentWillUnmount() {
    //NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  render() {
    return (
      <View style={styles.container}>
        <ProgressBar />
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    error: state.authReducer.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Initialising);

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
