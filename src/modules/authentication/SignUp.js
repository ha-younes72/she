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

class SignUp extends React.Component {
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
    const nameError = validate('name', this.state.name)
    const emailError = validate('email', this.state.email)

    this.setState({
      mobileError: mobileError,
      passwordError: passwordError,
      nameError: nameError,
      emailError: emailError
    })

    if (!mobileError && !passwordError && !emailError && !nameError) {
      var user = {
        password: this.state.password,
        mobile: this.state.mobile,
        name : this.state.name,
        email : this.state.email
      }

      this.setState({
        passwordError: '',
        mobileError: '',
        nameError: '',
        emailError: '',
        isSubmiting: true
      }, () => {
        if (this.props.status) { this.props.actions.signupUser(user) }
        else {
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
              onChangeText={val => this.onChangeText('name', val)}
              placeholder='نام و نام خانوادگی'
              value={this.state.name}
              onBlur={() => {
                this.setState({
                  nameError: validate('name', this.state.name)
                })
              }}

              leftIcon={
                <IconWithBadge
                  style={{ margin: 0 }}
                  name='ios-person'
                  size={24}
                  color={colors.primary}
                />
              }

              errorStyle={{ color: 'red' }}
              errorMessage={this.state.nameError ? this.state.nameError : null}
            ></Input>
            <Input
              onChangeText={val => this.onChangeText('email', val)}
              placeholder='پست الکترونیکی'
              value={this.state.email}
              onBlur={() => {
                this.setState({
                  emailError: validate('email', this.state.email)
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
              errorMessage={this.state.emailError ? this.state.emailError : null}
            ></Input>
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
              style={{ backgroundColor: colors.primary, width: '100%' }}
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
                    ? this.props.submittingFinished
                      ? <Text style={{ color: 'white', fontSize: 20 }}>ثبت‌نام</Text>
                      : <ProgressBar />
                    : <Text style={{ color: 'white', fontSize: 20 }}>ثبت‌نام</Text>

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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);