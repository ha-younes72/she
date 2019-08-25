import React from 'react'
import {
  Alert,
  //View,
  //	Text,
  //	TextInput,
  TouchableOpacity,
  //ScrollView
} from 'react-native'

import {
  Container,
  Content,
  Text,
  View,
  Button,
  Body,
  ListItem,
  CheckBox,
  Icon,
  List,
  Form,
  Item,
  //Input,
  Label
} from 'native-base'

//import Toast from "../_global/Toast";
import { colors } from '../_global/theme'
import ProgressBar from "../_global/ProgressBar";

import {
  Input,
  //	Button,
  //	CheckBox,
  //	Icon,
  //	Text
} from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';
import IconWithBadge from "../_global/Icons";

import styles from './styles/auth.style'
import uuidV4 from 'uuid/v4'
import validate from './validators/validate_wrapper'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from './actions';
//import { NetInfo } from 'react-native'
//import { RadioGroup, CheckBox } from "react-native-btr";

class SignIn extends React.Component {
  state = {
    password: '',
    mobile: '',
    mobileError: '',
    passwordError: '',
    //gpsPermission: false,
    //cameraPermission: false,
    //isRegistering: false,
    isSubmiting: false,
    //showPass: false,
  }


  onChangeText = (key, value) => {
    this.setState(
      {
        [key]: value,
        isSubmiting: false
      }
    )
    //if (this.props.message) this.rmError()
  }

  submit = () => {

    const mobileError = validate('mobile', this.state.mobile)
    const passwordError = validate('password', this.state.password)
    //const fnameError = validate('firstname', this.state.fname)

    this.setState({
      mobileError: mobileError,
      passwordError: passwordError,
      //fnameError: fnameError
    })

    if (!mobileError && !passwordError) {
      var user = {
        password: this.state.password,
        mobile: this.state.mobile,
        //gpsPermission: this.state.gpsPermission,
        //cameraPermission: this.state.cameraPermission
      }

      this.setState({
        passwordError: '',
        mobileError: '',
        isSubmiting: true
      }, () => {
        if (this.props.status) { this.props.actions.signinUser(user, this.props.status) }
        else {
          //this.props.actions.signinUser(user, this.props.status)
          Alert.alert('آفلاین',
            'لطفا ارتباط حود را کنترل کنید و دوباره تلاش کنید')
        }
      })
    }
  }

  render() {
    return (
      <Container>
        <Content
          //padder
          contentContainerStyle={styles.container}
        >
          <Form
            style={{
              width: '90%'
            }}
          >
            <Input
              onChangeText={val => this.onChangeText('mobile', val)}
              placeholder='شماره موبایل'
              value={this.state.mobile}
              onBlur={() => {
                this.setState({
                  mobileError: validate('mobile', this.state.mobile)
                })
              }}

              leftIcon={
                <IconWithBadge
                  style={{ margin: 0 }}
                  name='ios-mail'
                  size={24}
                  color={colors.primary}
                />
              }

              errorStyle={{ color: 'red' }}
              errorMessage={this.state.mobileError ? this.state.mobileError : null}
            ></Input>

            <Input
              onChangeText={val => this.onChangeText('password', val)}
              placeholder='رمز عبور'
              value={this.state.password}
              onBlur={() => {
                this.setState({
                  passwordError: validate('password', this.state.password)
                })
              }}

              leftIcon={
                <IconWithBadge
                  style={{ margin: 0 }}
                  name='ios-key'
                  size={24}
                  color={colors.primary}
                />
              }

              errorStyle={{ color: 'red' }}
              errorMessage={this.state.passwordError ? this.state.passwordError : null}
            ></Input>

          </Form>
          <View style={{
            //flex:1,
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingTop: 35
          }}
          >
            <Button
              //bordered
              full
              //rounded
              //iconLeft
              //large
              style={{ backgroundColor: colors.primary }}
              disabled={this.state.isSubmiting}
            //disabled={true}
            //style={{ marginHorizontal: 20 }}
            >
              <TouchableOpacity
                onPress={() => this.submit()}
                style={{ flexDirection: 'row' }}
              >
                {
                  this.state.isSubmiting
                    ? this.props.submittingFinished ? <Text style={{ color: 'white', fontSize:20 }}>ورود</Text> : <ProgressBar />
                    : <Text style={{ color: 'white', fontSize:20 }}>ورود</Text>

                }
              </TouchableOpacity>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    message: state.authReducer.message,
    status: state.authReducer.status,
    submittingFinished: state.authReducer.submittingFinished
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);