import React from 'react'
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { Root } from 'native-base';

import Initializing from './modules/Initializing'
import Home from './modules/app/Home';
import School from './modules/app/School'
import About from './modules/app/About';
import Profile from './modules/app/Profile'
import SignIn from './modules/authentication/SignIn'
import SignUp from './modules/authentication/SignUp'
import Camera from './modules/app/CameraWix';
import VideosList from './modules/app/VideosList'
import VideoPlayer from './modules/app/Player'
//import Auth from './modules/authentication/Auth'

export function registerScreens(store, persistor) {

    Navigation.registerComponent('app.Initializing', () => (props) => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Initializing {...props} />
            </PersistGate>
        </Provider>
    ), () => Initializing);

    Navigation.registerComponent('app.SignIn', () => (props) => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <SignIn {...props} />
            </PersistGate>
        </Provider>
    ), () => SignIn);

    Navigation.registerComponent('app.SignUp', () => (props) => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <SignUp {...props} />
            </PersistGate>
        </Provider>
    ), () => SignUp);

    Navigation.registerComponent('app.Home', () => (props) => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Root>
                    <Home {...props} />
                </Root>
            </PersistGate>
        </Provider>
    ), () => Home);

    Navigation.registerComponent('app.School', () => (props) => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <School {...props} />
            </PersistGate>
        </Provider>
    ), () => School);

    Navigation.registerComponent('app.About', () => (props) => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <About {...props} />
            </PersistGate>
        </Provider>
    ), () => About);

    Navigation.registerComponent('app.Camera', () => (props) => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Camera {...props} />
            </PersistGate>
        </Provider>
    ), () => Camera);

    Navigation.registerComponent('app.Profile', () => (props) => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Profile {...props} />
            </PersistGate>
        </Provider>
    ), () => Profile);

    Navigation.registerComponent('app.VideosList', () => (props) => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <VideosList {...props} />
            </PersistGate>
        </Provider>
    ), () => VideosList);

    Navigation.registerComponent('app.VideoPlayer', () => (props) => (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <VideoPlayer {...props} />
            </PersistGate>
        </Provider>
    ), () => VideoPlayer);

}