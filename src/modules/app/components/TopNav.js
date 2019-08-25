import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native'

import { Navigation } from "react-native-navigation";
//import { RNCamera } from 'react-native-camera';

import { colors, fonts } from '../../_global/theme'
import IconWithBadge from '../../_global/Icons';
import { iconsMap } from '../../../utils/AppIcons';

class TopNav extends React.Component {

    render() {
        const { screenTitle } = this.props
        return (
            <View style={styles.container}>
                {
                /*<TouchableOpacity style={styles.menuTrigger} onPress={() => { this.openDrawer() }}>
                    <View style={styles.menuTriggerInner}>
                        <IconWithBadge name={'ios-menu'} size={37} color={'white'} ></IconWithBadge>
                    </View>
                </TouchableOpacity>
                */
                }

                <View style={styles.title}>
                    <Text style={styles.titleText} > {screenTitle} </Text>
                </View>

                <View style={styles.barcode}>
                    <TouchableOpacity onPress={() => { this.sync() }}>
                        <View>
                            <IconWithBadge name={'ios-sync'} size={30} color={'white'} ></IconWithBadge>
                        </View>
                    </TouchableOpacity>
                </View>


            </View>
        );
    }

    sync(){
        Alert.alert('I am syncing')
    }
    
    openCamera() {
        Navigation.push('AppStack', {
            component: {
                name: 'app.Camera',
            },
        })
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        top: 0,
        left: 0,
        height: 45,
        backgroundColor: colors.primary,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
    },
    title: {
        flex: 5,
        alignItems: 'flex-start',
        paddingHorizontal:7
    },
    titleText: {
        fontSize: 21,
        color: 'white',
        fontFamily: fonts.primary,
    },
    barcode: {
        flex: 1,
        alignItems:'flex-end',
        paddingHorizontal:7
    }
})


export default TopNav