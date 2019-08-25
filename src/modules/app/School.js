import React, { Component } from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
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
import { Navigation } from 'react-native-navigation';
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

class School extends Component {

  state = {
    cards: [1, 2],
    isLoading: true
  }
  componentDidMount() {
    this.props.actions.retrieveMyCourses(this.props.token, this.props.userId)
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
              <Title>مدرسه</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name="search" />
              </Button>
            </Right>
          </Header>
        </StyleProvider>

        <Content padder>
          {
            this.state.isLoading
              ?
              <ProgressBar color={'#D6B569'} />
              :
              this.props.myCourses.map((item, index) => (
                < Card key={index} style={styles.mb}>
                  <CardItem bordered>
                    <Left>
                      <Thumbnail source={logo} />
                      <Body>
                        <Text>{item.title}</Text>
                        <Text note>{item.time.split()[0]}</Text>
                      </Body>
                    </Left>
                    <Right>
                      <Button
                        onPress={() => {
                          Navigation.push('AppStack', {
                            component: {
                              name:'app.VideosList',
                              passProps:{
                                index: index
                              }
                            }
                          })
                        }}
                        iconLeft
                        style={{
                          backgroundColor: colors.primary
                        }}
                      >
                        <Icon name="play-circle" />
                        <Text style={{ fontSize: 14 }}>تماشا</Text>
                      </Button>
                    </Right>
                  </CardItem>

                  <CardItem>
                    <Body>
                      <Image
                        style={{
                          alignSelf: "center",
                          height: 150,
                          resizeMode: "cover",
                          width: deviceWidth / 1.18,
                          marginVertical: 5
                        }}
                        source={{ uri: IMG_URL + item.thumb }}
                      />
                      <Text style={{ textAlign: 'justify' }}>
                        {item.title}
                        {item.topics.data.map((topic, index) => (
                          topic.title
                        ))}
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem bordered style={{ paddingVertical: 0 }}>
                    {/*
                    <Left>
                      <Button transparent>
                        <Icon name="thumbs-up" />
                        <Text>4,923 views</Text>
                      </Button>
                    </Left>
                  */}
                    <Left>
                      <Button iconLeft transparent>
                        <Icon name="heart-empty" style={{ color: colors.iconGray, fontSize: 20 }} />
                        <Text style={{ color: colors.iconGray, fontSize: 16 }}>پسندیدم</Text>
                      </Button>
                    </Left>
                    <Body>
                      <Button iconLeft transparent>
                        <Icon name="text" style={{ color: colors.iconGray, fontSize: 20 }} />
                        <Text style={{ color: colors.iconGray, fontSize: 16 }}>نظر</Text>
                      </Button>
                    </Body>
                    <Right>
                      <Button iconLeft transparent>
                        <Icon name="share-alt" style={{ color: colors.iconGray, fontSize: 20 }} />
                        <Text style={{ color: colors.iconGray, fontSize: 16 }}>بازنشر</Text>
                      </Button>
                    </Right>
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