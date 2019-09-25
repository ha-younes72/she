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
  TextInput,
  ImageBackground,
  Animated
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

import styles from './styles/About.style'
import TopNav from './components/TopNav';
import { colors } from '../_global/theme';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from './actions';
import { IMG_URL } from "../../constants/api";
import IconWithBadge from "../_global/Icons";
import { Navigation } from "react-native-navigation";

class AboutUs extends Component {

  static options(passProps) {
    return {
      layout: {
        //direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
        backgroundColor: 'white',
        orientation: ['portrait'] // An array of supported orientations
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      saveChanges: true,
      showMenu: false,
      //isLoading: true,
      //isRefreshing: false
      maxHeight: 237,
      scrollViewMarginTop: 55,
      headerThreshold: 100,
      minHieght: 50,
      scrollY: new Animated.Value(0),
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
    //allCoursesTest = [...this.props.allCourses, ...this.props.allCourses]
    const headerDistance = this.state.maxHeight - this.state.minHieght
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [this.state.maxHeight, this.state.minHieght],
      extrapolate: 'clamp',
    });
    const imageHeight = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [200, 0],
      extrapolate: 'clamp',
    });
    const avatarOpacity = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [1, 0.9],
      extrapolate: 'clamp',
    });
    const avatarMargin = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [50, 0],
      extrapolate: 'clamp',
    });
    const avatarHeight = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [140, 120],
      extrapolate: 'clamp',
    });
    const avatarTop = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: [0, -70],
      extrapolate: 'clamp',
    });
    const headerColor = this.state.scrollY.interpolate({
      inputRange: [0, headerDistance],
      outputRange: ['rgba(1, 1, 1, 0.05)', 'rgba(1, 1, 1, 1)'],
      extrapolate: 'clamp',
    });
    return (
      <Container style={styles.container}>
        <Content
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
            )
          }
          //scrollsToTop={headerHeight.__getValue() < 200 ? true : false}
          //scrollTo({x: 0, y: 0, animated: true})
          //enableAutomaticScroll
          //scrollEnabled={true}
          //padder
          style={{ backgroundColor: 'white' }}
        >
          <ScrollView
            //style={[styles.container, { backgroundColor: null }]}
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
            }*/
            scrollEventThrottle={16}
            onScroll={
              Animated.event(
                [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
              )
            }
            //scrollsToTop={headerHeight.__getValue() < 200 ? true : false}
            contentContainerStyle={{ marginTop: this.state.scrollViewMarginTop }}
          >
            <View style={[styles.container, { backgroundColor: 'white' }]}>
              <View style={[styles.header, { backgroundColor: null }]}>
                <Image
                  style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                  source={require("../../../images/logomastershe.png")}>
                </Image>
              </View>
              <View style={{
                flex: 1,
                padding: 15,
                paddingTop: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <View style={[styles.seperator, { width: 1000, marginTop: 20 }]}></View>
                <Text style={{ fontSize: 16, textAlign: 'justify', paddingTop: 20, color: 'black',fontFamily:'IRANSansMobile' }}>
                  شرکت مسترشی فعالیت خود را در زمینه آموزش آرایشگری حرفه ای از سال 1388 آغاز نموده و به طور مستمر تمام تلاش خود را برای ارتقای سطح کیفی آموزش آرایشگری به کار گرفته است.
              </Text >
              <Text style={{ fontSize: 16, textAlign: 'justify', color: 'black',fontFamily:'IRANSansMobile' }}>
              امروزه بهای اوقات فراغت ما با وجود مشغله‏‌های روزانه بسیار با ارزش تر شده است. همه ما برای این اوقات برنامه ریزی فشرده‏‌تری داریم.
                  دیگر صرف زمان‌هایی نسبتا طولانی در کلاس و آموزشگاه های مختلف با وجود مشغله فعلی غیر ممکن شده و در نتیجه زندگی امروزی بی‏‌گمان آموزش به رو‏‌ش‌های نو‏تر، هوشمندانه‏‌تر و البته لذت‏‏ بخش‏‌تری را می‏‌طلبد.
                  
              </Text>
              <Text style={{ fontSize: 16, textAlign: 'justify',  color: 'black',fontFamily:'IRANSansMobile' }}>
              از همین رو است که هر روز به تعداد استفاده‏ کنندگان آموزش های اینترنتی افزوده می‌‏‏شود به همین جهت مستر شی تصمیم گرفته تا  خود را با جدیدترین متدهای روز هماهنگ نماید و آرایشگر هایی که نه تنها در سطح کشوری بلکه به صورت بین الملی موفق بوده اند، آموزش دهد. مستر شی بعنوان یک پلتفرم هوشمند آماده شده که تمام نیاز های شما را برطرف کند و به صورت حرفه ایی با دوره های مختلف به شکل مرحله ایی شما را به آرایشگر حرفه ای تبدیل کند.

              </Text>
              <Text style={{ fontSize: 16, textAlign: 'justify', color: 'black',fontFamily:'IRANSansMobile' }}>
                  جهت کسب اطلاعات بیشتر و مشاهده دوره ها می توانید به آدرس وب سایت که در زیر آمده است مراجعه فرمایید:
    
              </Text>
              <Text style={{ fontSize: 16, textAlign: 'justify', color: 'black',fontFamily:'IRANSansMobile' }}>
              https://mastershe.ir/
              </Text>
              </View>
            </View>
          </ScrollView>


        </Content>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }}>
          <View style={[{
            backgroundColor: 'rgba(1, 1, 1, 1)',
            //headerHeight._value<this.state.headerThreshold ? `rgba(1, 1, 1, 1)` : `rgba(55, 88, 1, 0.6)`,
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
          },]}>
            <View >
              <Button transparent onPress={() => this.setState({ showMenu: !this.state.showMenu })}>
                <Icon name="more" style={{ color: 'white' }} />
              </Button>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 9 }}>
              <Title numberOfLines={1}>درباره ما</Title>
            </View>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
              <Button transparent onPress={() => Navigation.pop(this.props.componentId)}>
                <Icon name="arrow-back" style={{ color: 'white' }} />
              </Button>
            </View>
          </View>
        </View>
      
        </Container >
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    //allCourses: state.appReducer.allCourses,
    //allCoursesMeta: state.appReducer.allCoursesMeta,
    user: state.authReducer.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
