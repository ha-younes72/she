import React, { Component } from "react";
import { StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
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
  getTheme,
  View,
} from "native-base";
import customVariables from '../_global/variables';
import ProgressBar from '../_global/ProgressBar';
import { colors } from "../_global/theme";
const deviceWidth = Dimensions.get("window").width;
const logo = require("../../../images/profile.jpeg");
const cardImage = require("../../../images/index.jpeg");
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from './actions';
import { IMG_URL } from "../../constants/api";

//const IMG_URL = 'http://mastershe.ir'

class Home extends Component {

  state = {
    cards: [1, 2, 3, 4],
    isLoading: true
  }

  componentDidMount() {
    this.props.actions.retrieveAllCourses()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.allCourses) {
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
              <Title>خانه</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name="heart" />
              </Button>
              <Button transparent>
                <Icon name="search" />
              </Button>
            </Right>
          </Header>
        </StyleProvider>
        <Content padder style={{ backgroundColor: colors.primaryBG }}>
          <View
            style={{
              width: '100%',
              backgroundColor: colors.secondaryBG,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingVertical: 7,
              position: 'relative'
            }}>
            <TouchableOpacity
              //active={this.state.seg === 1 ? true : false}
              onPress={() => this.setState({ seg: 1 })}
            >
              <Icon name='bookmarks' style={{ color: colors.primary }}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              //active={this.state.seg === 2 ? true : false}
              onPress={() => this.setState({ seg: 2 })}
            >
              <Icon name='archive' style={{ color: colors.primary }}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              //active={this.state.seg === 3 ? true : false}
              onPress={() => this.setState({ seg: 3 })}
            >
              <Icon name='heart' style={{ color: colors.primary }}></Icon>
            </TouchableOpacity>
            <TouchableOpacity
              //active={this.state.seg === 4 ? true : false}
              onPress={() => this.setState({ seg: 4 })}
            >
              <Icon name='flask' style={{ color: colors.primary }}></Icon>
            </TouchableOpacity>
          </View>

          {
            this.state.isLoading
              ?
              <ProgressBar color={'#D6B569'}/>
              :
              this.props.allCourses.map((item, index) => (
                < Card key={index} style={styles.mb}>
                  <CardItem bordered>
                    <Left>
                      <Thumbnail source={{ uri: IMG_URL + item.thumb }} />
                      <Body>
                        <Text>{item.title}</Text>
                        <Text note>{item.time}</Text>
                      </Body>
                    </Left>
                    <Right>
                      <Button iconLeft style={{ backgroundColor: colors.primary }}>
                        <Icon name="pricetags" />
                        <Text style={{ fontSize: 14 }}>خرید</Text>
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
                        <Icon name="heart-empty" style={{ color: colors.iconGray }} />
                        <Text style={{ color: colors.iconGray, fontSize: 16 }}>پسندیدم</Text>
                      </Button>
                    </Left>
                    <Body>
                      <Button iconLeft transparent>
                        <Icon name="text" style={{ color: colors.iconGray }} />
                        <Text style={{ color: colors.iconGray, fontSize: 16 }}>نظر</Text>
                      </Button>
                    </Body>
                    <Right>
                      <Button iconLeft transparent>
                        <Icon name="share-alt" style={{ color: colors.iconGray }} />
                        <Text style={{ color: colors.iconGray, fontSize: 16 }}>بازنشر</Text>
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
              ))
          }

          {
            /*
            this.state.cards.map((val, index) => (
              < Card key={index} style={styles.mb}>
                <CardItem bordered>
                  <Left>
                    <Thumbnail source={logo} />
                    <Body>
                      <Text>نام دوره</Text>
                      <Text note>۹ خرداد ۱۳۹۷</Text>
                    </Body>
                  </Left>
                  <Right>
                    <Button iconLeft style={{ backgroundColor: colors.primary }}>
                      <Icon name="pricetags" />
                      <Text style={{ fontSize: 14 }}>خرید</Text>
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
                      source={cardImage}
                    />
                    <Text style={{ textAlign: 'justify' }}>
                      در این دوره می توانید موارد زیادی را بیاموزید. از جمله یادگیری نحوه خرید دوره و همچنین نحوه کار با دوره ها
                    </Text>
                  </Body>
                </CardItem>
                <CardItem bordered style={{ paddingVertical: 0 }}>
                  
                  <Left>
                    <Button iconLeft transparent>
                      <Icon name="heart-empty" style={{ color: colors.iconGray }} />
                      <Text style={{ color: colors.iconGray, fontSize: 16 }}>پسندیدم</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button iconLeft transparent>
                      <Icon name="text" style={{ color: colors.iconGray }} />
                      <Text style={{ color: colors.iconGray, fontSize: 16 }}>نظر</Text>
                    </Button>
                  </Body>
                  <Right>
                    <Button iconLeft transparent>
                      <Icon name="share-alt" style={{ color: colors.iconGray }} />
                      <Text style={{ color: colors.iconGray, fontSize: 16 }}>بازنشر</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            ))
            */
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

//export default Home;

function mapStateToProps(state, ownProps) {
  return {
    allCourses: state.appReducer.allCourses,
    allCoursesMeta: state.appReducer.allCoursesMeta
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);