import React, { Component } from "react";
import { StyleSheet, Image, Dimensions, TouchableOpacity, Alert } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Left,
  Right,
  Body,
  StyleProvider,
  getTheme
} from "native-base";
import customVariables from '../_global/variables';
const deviceWidth = Dimensions.get("window").width;
const logo = require("../../../images/profile.jpeg");
const cardImage = require("../../../images/index.jpeg");
import { colors } from "../_global/theme";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from './actions';
import { IMG_URL } from "../../constants/api";
import ProgressBar from '../_global/ProgressBar';
import IconWithBadge from "../_global/Icons";
import { Navigation } from 'react-native-navigation';


class School extends Component {

  state = {
    cards: [1, 2],
    isLoading: true
  }
  componentDidMount() {
    //this.props.actions.retrieveMyCourses(this.props.token, this.props.userId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.myCourses) {
      this.setState({
        isLoading: false
      })
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <StyleProvider style={getTheme(customVariables)}>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="more" />
              </Button>
            </Left>
            <Body>
              <Title>{this.props.myCourses[this.props.index].title}</Title>
            </Body>
          </Header>
        </StyleProvider>

        <Content padder>
          {
            this.props.myCourses[this.props.index].episodes.data.map((item, index) => (
              < Card key={index} style={styles.mb}>
                <CardItem bordered>
                  <Left>
                    <Body style={{ flexDirection: 'row' }}>
                      <Text>{item.title}</Text>
                    </Body>
                  </Left>
                  <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text note>{item.time}</Text>
                  </Body>

                  <TouchableOpacity
                    style={{
                      borderRadius: 50,
                      borderColor: colors.primary,
                      borderWidth: 1,
                      aspectRatio: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      //padding: 2
                    }}
                    onPress={() => {
                      Navigation.push(this.props.componentId, {
                        component: {
                          name: 'app.VideoPlayer',
                          passProps: {
                            text: 'Pushed screen'
                          },
                          options: {
                            /*topBar: {
                              title: {
                                text: 'Pushed screen title'
                              }
                            }*/
                          }
                        }
                      });
                      /*
                      Navigation.showOverlay({
                        component: {
                          name: 'app.VideoPlayer',
                          options: {
                            overlay: {
                              interceptTouchOutside: true
                            }
                          }
                        }
                      });*/
                    }}
                  >
                    <IconWithBadge name={'ios-play'} color={colors.primary} size={22} />
                  </TouchableOpacity>

                </CardItem>

              </Card>
            ))
          }
        </Content>
      </Container >
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  mb: {
    marginBottom: 15
  }
});

//export default School;
function mapStateToProps(state, ownProps) {
  return {
    //allCourses: state.appReducer.allCourses,
    //allCoursesMeta: state.appReducer.allCoursesMeta,
    token: state.authReducer.token,
    userId: state.authReducer.user.user_id,
    myCourses: state.appReducer.myCourses,
    myCoursesMeta: state.appReducer.myCoursesMeta
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(School);