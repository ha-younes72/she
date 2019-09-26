import React, { Component } from "react";
import { StyleSheet, Image, Dimensions, TouchableOpacity, Alert, View, ScrollView, Animated } from "react-native";
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
  Form,
  Textarea
} from "native-base";
import customVariables from '../_global/variables';
const deviceWidth = Dimensions.get("window").width;
const logo = require("../../../images/profile.jpeg");
const cardImage = require("../../../images/index.jpeg");
import { colors } from "../_global/theme";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from './actions';
import { IMG_URL, API_URL } from "../../constants/api";
import ProgressBar from '../_global/ProgressBar';
import IconWithBadge from "../_global/Icons";
import { Navigation } from 'react-native-navigation';
import Axios from "axios";
import ImagePicker from 'react-native-image-picker';
var RNFS = require('react-native-fs');
import RNFetchBlob from 'rn-fetch-blob'

class School extends Component {

  state = {
    cards: [1, 2],
    isLoading: true
  }
  componentDidMount() {
    console.log(API_URL + 'parts/' + this.props.id)
    Axios
      .get(API_URL + 'parts/' + this.props.id)
      .then(res => {
        console.log('Part Res: ', res)
        this.setState({
          episodes: res.data.data.episodes,
          isLoading: false
        })
      })
      .catch(err => {
        console.log('Part Errr: ', err.response ? err.response : err)
      })

    //this.props.actions.retrieveMyCourses(this.props.token, this.props.userId)
  }

  componentWillUpdate() {
    //console.log('Watched Movies: ', this.props.watchedMovies)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.myCourses) {
      this.setState({
        isLoading: false
      })
    }
    /*if (nextProps.watchedMovies) {
      console.log('You watched again')
      var allWatched = true
      this.props.myCourses[this.props.index].episodes.data.map((item, index) => {
        console.log('Watched Movies: ', this.props.watchedMovies)
        if (this.props.watchedMovies[this.props.myCourses[this.props.index].id].includes(item)) {
          console.log(item + ' Watched!!!!!!!')
          this.setState({
            allWatched
          })
        } else {
          allWatched = false
          this.setState({
            allWatched
          })
        }
      })
    }*/
  }

  render() {
    return (

      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>

          {/*<StyleProvider style={getTheme(customVariables)}>
          <Header>
            <Left>
              <Button transparent >
                <Icon name="more" />
              </Button>
            </Left>
            <Body style={{alignItems:'flex-start'}}>
              <Title>{this.props.myCourses[this.props.index].title}</Title>
            </Body>
            <Right style={{alignItems:'flex-end', justifyContent:'flex-end', backgroundColor:'red'}}>
              <Button style={{alignItems:'center', justifyContent:'flex-start', backgroundColor:'green'}}>
                <Text>
                  Back
                </Text>
              </Button>
            </Right>
          </Header>
        </StyleProvider>
        */}
          {
            this.state.isLoading ?
              <ProgressBar />
              :
              //<Content padder>
              <ScrollView
                contentContainerStyle={{
                  padding: 15,
                  marginTop: 50,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >

                <Text style={{ fontFamily: 'IRANSansMobile', color: 'black', paddingVertical: 10 }}>
                  {this.props.content}
                </Text>
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    borderColor: colors.primary,
                    borderTopWidth: 1,
                    //borderBottomWidth: 1,
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <Text style={{ fontFamily: 'IRANSansMobile', color: 'black', paddingVertical: 5 }}>
                    لیست دروس:
              </Text>
                </View>

                {
                  this.state.episodes.data.map((item, index) => (
                    < Card key={index} style={[styles.mb, { width: '100%' }]}>
                      <TouchableOpacity
                        /*style={{
                          borderRadius: 50,
                          borderColor: colors.primary,
                          borderWidth: 1,
                          aspectRatio: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          //padding: 2
                        }}*/
                        onPress={() => {
                          /*Navigation.push(this.props.componentId, {
                            component: {
                              name: 'app.VideoPlayer',
                              passProps: {
                                text: 'Pushed screen',
                                courseId: this.props.myCourses[this.props.index].id,
                                episodeId: item.number
                              },
                              options: {
                                //topBar: {
                                //  title: {
                                //    text: 'Pushed screen title'
                                //  }
                                }
                              }
                            }
                          });*/
                          // emoved for money
                          Navigation.showModal({
                            stack: {
                              children: [{
                                component: {
                                  name: 'app.VideoPlayer',
                                  passProps: {
                                    text: 'Pushed screen',
                                    index: this.props.index,
                                    courseId: this.props.course_id,
                                    episodeId: item.number
                                  },
                                  options: {
                                    topBar: {

                                    },
                                    layout: {
                                      backgroundColor: 'transparent',
                                    },
                                    //screenBackgroundColor: 'transparent',
                                    modalPresentationStyle: 'overFullscreen',
                                  },
                                },
                              }],
                            },

                          });
                          // emoved for money
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
                        <CardItem bordered>
                          <Body style={{ flexDirection: 'column' }}>
                            <Text style={{ fontFamily: 'IRANSansMobile' }} numberOfLines={1} >{item.title}</Text>
                            <Text style={{ fontFamily: 'IRANSansMobile' }} note>{item.time}</Text>
                          </Body>

                          <IconWithBadge name={'ios-play'} color={colors.primary} size={22} />


                        </CardItem>
                      </TouchableOpacity>

                    </Card>
                  ))
                }
                <Text
                  style={{
                    fontFamily: 'IRANSansMobile',
                    marginTop: 15,
                    paddingBottom: 7,
                    borderColor: colors.primary,
                    borderTopWidth: 1
                  }}
                >
                  ویدیو و نظر مربوط به کار خود را وارد نموده و آپلود کنید.
              </Text>

                {

                  <TouchableOpacity
                    disabled={this.state.uploadBegin}
                    onPress={() => {

                      const options = {
                        title: 'Select Video',
                        mediaType: 'image',
                        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
                        storageOptions: {
                          skipBackup: true,
                          path: 'images',
                        },
                      };

                      /**
                       * The first arg is the options object for customization (it can also be null or omitted for default options),
                       * The second arg is the callback which sends object: response (more info in the API Reference)
                       */
                      ImagePicker.launchImageLibrary(options, (response) => {
                        //console.log('Response = ', response);

                        if (response.didCancel) {
                          console.log('User cancelled image picker');
                        } else if (response.error) {
                          console.log('ImagePicker Error: ', response.error);
                        } else if (response.customButton) {
                          console.log('User tapped custom button: ', response.customButton);
                        } else {
                          console.log('Image Response: ', response)
                          const source = {
                            uri: response.uri,
                            fileName: response.fileName,
                            fileSize: response.fileSize,
                            type: response.type,
                            path: response.path,
                          }
                          //Alert.alert('Image Picked', response.uri)
                          // You can also display the image using data:
                          // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                          this.setState({
                            videoSource: source,
                          });
                        }
                      });
                      /*Navigation.push(this.props.componentId, {
                        component: {
                          name: 'app.Gallery',
                          options: {
                            topBar: {
                              visible: false
                            }
                          }
                        }
                      })*/
                    }}
                    style={{
                      //flex: 1,
                      width: '45%',
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      aspectRatio: 1,
                      //marginRight: 10,
                      borderWidth: 2,
                      borderRadius: 5,
                      borderStyle: 'dashed',
                      borderColor: colors.primary
                    }}
                  >
                    {!this.state.percentage ?
                      null :
                      !this.state.uploadDone ?
                        <Animated.View
                          style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            width: '' + this.state.percentage + '%',
                            height: '' + this.state.percentage + '%',
                            backgroundColor: colors.primary
                          }}
                        >
                        </Animated.View>
                        : null
                    }
                    {<Icon name='ios-cloud-outline' style={{ fontSize: 76, color: colors.primary }}></Icon>
                    }
                    {<Text style={{ fontFamily: 'IRANSansMobile', fontSize: 14, color: colors.primary }}>فایل خود را انتخاب کنید</Text>
                    }

                  </TouchableOpacity>

                }
                {
                  this.state.videoSource ?
                    <Text style={{ fontFamily: 'IRANSansMobile' }}>
                      {this.state.videoSource.path}
                    </Text>
                    :
                    null
                }
                {
                  /*this.state.percentage ?
                    <View style={{ width: '100%' }}>
                      <Animated.View
                        style={{
                          marginTop: 10,
                          width: '' + this.state.percentage + '%',
                          height: 5,
                          backgroundColor: colors.primary
                        }}>
                      </Animated.View>
                    </View>
                    :
                    null*/
                }
                <View
                  style={{
                    //width: '100%',
                    //flex: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 5,
                    marginTop: 10
                  }}
                >
                  <Form style={{ flex: 1, paddingRight: 3 }}>
                    <Textarea
                      value={this.state.content}
                      inputStyle={{ fontFamily: 'IRANSansMobile' }}
                      onChangeText={(val) => {
                        this.setState({
                          content: val
                        })
                      }}
                      rowSpan={7}
                      bordered
                      placeholder="توضیحات خود را وارد نمایید"
                      style={{
                        borderRadius: 7,
                        backgroundColor: 'white',
                        fontFamily: 'IRANSansMobile'
                      }}
                    />
                  </Form>
                </View>


                {
                  //this.props.allWatched.includes(this.props.myCourses[this.props.index].id)
                  //  ?
                  <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <TouchableOpacity
                      onPress={() => {
                        // Axios.post(API_URL + 'userpanel/tickets/store', {text:'text', mobile: '09135148892', subject:'test'},
                        //	      {headers:{
                        //		      'Authorization': 'Bearer ' + this.props.token
                        //	      }}).then(res=>console.log('eee', res)).catch(errr=>console.log('eee', errr))
                        if (!this.state.content) {
                          Alert.alert('خطا', 'لطفا توضیحات خود را وارد نمایید')
                          return false
                        }
                        if (!this.state.videoSource) {
                          Alert.alert('خطا', 'لطفا ویدیو را انتخاب نمایید')
                          return false
                        }
                        console.log('Video to be uploaded: ', this.state.videoSource)
                        token = 'Bearer ' + this.props.token
                        console.log('Token:', this.props.token)


                        RNFS
                          .stat(this.state.videoSource.path)
                          .then(statRes => {
                            console.log('Stat1 Result: ', statRes)
                          })
                          .catch(err => {
                            console.log('Stat Err: ', err)
                          })
                        var uploadUrl = API_URL + 'userpanel/tickets/store';

                        RNFetchBlob.fetch('POST', uploadUrl, {
                          Authorization: token,
                          //otherHeader : "foo",
                          // this is required, otherwise it won't be process as a multipart/form-data request
                          'Content-Type': 'multipart/form-data',
                        }, [
                          // append field data from file path
                          {
                            name: 'file',
                            filename: this.state.videoSource.fileName, // this.state.videoSource.fileName,
                            //filepath: this.state.videoSource.path,
                            //name : 'avatar',
                            //filename : 'avatar.png',
                            // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
                            // Or simply wrap the file path with RNFetchBlob.wrap().
                            data: RNFetchBlob.wrap(this.state.videoSource.path)
                          },
                          /*{
                            name : 'ringtone',
                            filename : 'ring.mp3',
                            // use custom MIME type
                            type : 'application/mp3',
                            // upload a file from asset is also possible in version >= 0.6.2
                            data : RNFetchBlob.wrap(RNFetchBlob.fs.asset('default-ringtone.mp3'))
                          }*/
                          // elements without property `filename` will be sent as plain text
                          //	  text: JSON.stringify(this.state.content),
                          //user_id: JSON.stringify(this.props.userId),
                          //                          subject: JSON.stringify('ﻡﻮﺿﻮﻋ ﺖﺴﺗ'),
                          //                            mobile: JSON.stringify(this.props.mobile)
                          { name: 'text', data: JSON.stringify(this.state.content) },
                          { name: 'subject', data: JSON.stringify(this.props.ctitle +"/" + this.props.title) },
                          { name: 'mobile', data: JSON.stringify(this.props.mobile) }
                        ])
                          .uploadProgress((written, total) => {
                            var percentage = Math.floor((written / total) * 100);
                            this.setState({
                              percentage,
                              uploadBegin: true,
                              uploadDone: false
                            })
                            console.log('uploaded', written / total)
                          })
                          .progress((received, total) => {
                            console.log('progress', received / total)
                          })
                          .then((resp) => {
                            console.log('Resp: ', resp)
                            Alert.alert('موفق', 'نمونه کار شما با موفقیت آپلود شد.')
                            this.setState({
                              uploadBegin: false,
                              uploadDone: true,
                              videoSource: null,
                              content: null
                            })
                            // ...
                          })
                          .catch((err) => {
                            console.log('Err: ', err)
                            this.setState({
                              uploadBegin: false,
                              uploadDone: true,
                              videoSource: null,
                              content: null
                            })
                            Alert.alert('نا موفق', 'آپلود با مشکل روبرو شد، لطفا مجددا تلاش فرمایید.')
                          })









                        var files = [{
                          name: 'file',
                          filename: 'TestFile', // this.state.videoSource.fileName,
                          filepath: this.state.videoSource.path,
                          //filetype: this.state.videoSource.type
                        }];

                        var uploadBegin = (response) => {
                          this.setState({
                            uploadBegin: true,
                            uploadDone: false
                          })
                          var jobId = response.jobId;
                          console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
                          //Alert.alert('UPLOAD HAS BEGUN! JobId: ' + jobId);
                        };

                        var uploadProgress = (response) => {
                          var percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
                          this.setState({
                            percentage
                          })
                          console.log('UPLOAD IS ' + percentage + '% DONE!');
                        };

                        // upload files
                        /*RNFS.uploadFiles({
                          toUrl: uploadUrl,
                          files: files,
                          method: 'POST',
                          headers: {
                            //'Accept': 'application/json',
				 // 'Content-Type' : 'multipart/form-data',
                            //'content-type': 'multipart/form-data',
				  'content-type'
:
"application/json",
				  'Authorization': token
                          },
                          fields:
                          {
                            text: JSON.stringify(this.state.content),
                            //user_id: JSON.stringify(this.props.userId),
                            subject: JSON.stringify('موضوع تست'),
                            mobile: JSON.stringify(this.props.mobile)
                          },
                          begin: uploadBegin,
                          progress: uploadProgress
                        }).promise.then((response) => {
                          if (response.statusCode == 200) {
                            console.log('FILES UPLOADED: ', response); // response.statusCode, response.headers, response.body
                            Alert.alert('موفق', 'نمونه کار شما با موفقیت آپلود شد.')
                            this.setState({
                              uploadBegin: false,
                              uploadDone: true,
                              videoSource: null,
                              content: null
                            })
                            //newObservations[currentIndex].img = newObservations[currentIndex].img.uri
                            //dispatch(uploadNewObservationSuccess(newObservations[currentIndex], currentIndex))
                            //Alert.alert('Success', 'Observation Uploaded!')
                            //console.log('Put New Response: ', response)
                          } else {
                            //dispatch(uploadNewObservationFail(newObservations[currentIndex], currentIndex))
                            //Alert.alert('SERVER ERROR', JSON.stringify(response))
                            console.log('SERVER ERROR');
                            this.setState({
                              uploadBegin: false,
                              uploadDone: true,
                              videoSource: null,
                              content: null
                            })
                            Alert.alert('نا موفق', 'آپلود با مشکل روبرو شد، مشکلی از سمت سرور رخ داده است، لطفا با ادمین تماس حاصل فرمایید.')
                          }
                        })
                          .catch((err) => {
                            if (err.description === "cancelled") {
                              console.log('Upload Cancelled')
                              // cancelled by user
                            }
                            //dispatch(uploadNewObservationFail(newObservations[currentIndex], currentIndex))
                            //Alert.alert('ERROR', JSON.stringify(err))
                            console.log('Err Uploading: ', err);
                            this.setState({
                              uploadBegin: false,
                              uploadDone: true,
                              videoSource: null,
                              content: null
                            })
                            Alert.alert('نا موفق', 'آپلود با مشکل روبرو شد، لطفا مجددا تلاش فرمایید.')
                          });*/
                      }}
                      /*onPress={() => {
                        Navigation.push('AppStack', {
                          component: {
                            name: 'app.VideoUpload',
                            passProps: {
                              index: this.props.index,
                              //type: 'all'
                            }
                          }
                        })
                      }}*/
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        padding: 7,
                        backgroundColor: colors.primary,
                        borderRadius: 3
                      }}>
                      <Text style={{ fontFamily: 'IRANSansMobile', fontSize: 19, color: 'white' }}>
                        ارسال نمونه کار
                    </Text>
                    </TouchableOpacity>
                  </View>
                  //:
                  //null
                }
              </ScrollView>
            //</Content>
          }

        </ScrollView>
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
              <Title numberOfLines={1}>{this.props.title}</Title>
            </View>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
              <Button transparent onPress={() => Navigation.pop(this.props.componentId)}>
                <Icon name="arrow-back" style={{ color: 'white' }} />
              </Button>
            </View>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 50,
            left: 10,
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.primary,
            //height: 25,
            backgroundColor: 'white',
            //backfaceVisibility: 'hidden',
            opacity: this.state.showMenu ? 1 : 0
          }}>
          <Button transparent onPress={() => this.props.actions.logOut()}>
            <Text style={{ color: 'black', fontFamily: 'IRANSansMobile' }}>خروج</Text>
            <Icon name="log-out" color={colors.primary} />
          </Button>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    mobile: state.authReducer.user.mobile,
    myCourses: state.appReducer.myCourses,
    myCoursesMeta: state.appReducer.myCoursesMeta,
    watchedMovies: state.appReducer.watchedMovies,
    allWatched: state.appReducer.allWatched
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(School);
