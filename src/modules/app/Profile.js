//import _ from 'lodash';
import React, { Component } from 'react';

import {
  View,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native'

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Right,
  Body,
  StyleProvider,
  getTheme,
  Segment,
} from "native-base";
import customVariables from '../_global/variables';

import styles from './styles/Profile.style'
import TopNav from './components/TopNav';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      saveChanges: true
      //isLoading: true,
      //isRefreshing: false
    };
  }
  componentDidAppear() {
  }

  componentDidDisappear() {
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }



  render() {
    const userInfo = { fname: 'یونس', lname: 'حسنی عبداللهی', email: 'ha.younes72@gmail.com' };
    const name = userInfo.fname.toUpperCase() + ' ' + userInfo.lname.toUpperCase()
    return (
      <View style={{ flex: 1 }}>
        <StyleProvider style={getTheme(customVariables)}>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="more" />
              </Button>
            </Left>
            <Body>
              <Title>پروفایل</Title>
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

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
                    /*refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            colors={[colors.primary]}
                            tintColor="white"
                            title="loading..."
                            titleColor="white"
                            progressBackgroundColor="white"
                        />
                    }*/>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image style={{ width: '100%', height: '100%' }} source={require("../../../images/index.jpeg")}></Image>
            </View>
            <Image
              style={styles.avatar}
              source={require("../../../images/profile.jpeg")/*{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }*/}
            />
            <View style={styles.body}>
              <View style={styles.infoContent}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.job}>برنامه‌نویس اندروید</Text>
                <Text style={styles.description}>
                  {name} خوش آمدید
                </Text>
                <Text style={styles.description}>
                  میل: {userInfo.email}
                </Text>

                <TouchableOpacity style={styles.buttonContainer}>
                  <Text style={styles.buttontext}>ویرایش اطلاعات</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

    );
  }
}



export default Profile;
