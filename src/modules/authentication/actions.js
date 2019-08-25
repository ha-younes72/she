import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import * as types from '../../constants/actionTypes';
import { API_URL, API_KEY } from '../../constants/api';
import { goHome } from '../../utils/navigation'
import { Alert } from 'react-native'
// Signin User
export function signinUserSuccess(res) {
	return {
		type: types.SIGNIN_USER_SUCCESS,
		user: res.user,//res.userInfo,
		token: res.token//res.token
	};
}

export function signinUserFail(res) {
	return {
		type: types.SIGNIN_USER_FAIL,
		message: res.msg,
	};
}

export function signinUser(user) {
	console.log('User to be logged in: ', user)
	return function (dispatch) {
		console.log(API_URL + 'login')
		axios.post(API_URL + 'login', {
			mobile: user.mobile,
			password: user.password
		})
			.then(res => {
				console.log('LoginResponse: ', res)
				dispatch(signinUserSuccess({ user: res.data.data, token: res.data.data.api_token }));
				_signInAsync(user)
			})
			.catch(error => {
				console.log("Error Logging In: ", error.response); //eslint-disable-line
				if (error.response.status === 422) {
					dispatch(signinUserFail({ msg: error.response.data.errors.mobile[0] }));
					Alert.alert('خطای سرور', error.response.data.errors.mobile[0])
				}
				if (error.response.status === 403) {
					dispatch(signinUserFail({ msg: error.response.data.data.message }));
					Alert.alert('خطای سرور', error.response.data.data.message)
				}
			});
	};
}

_signInAsync = async (user) => {
	await AsyncStorage.setItem('userToken', JSON.stringify(user))
		.then(() => {
			//console.log("The user has been stored locallkky")
			goHome();
		})
		.catch(err => {
			//alert('error: jhggkj', err);
		})
};

// Signup User
export function signupUserSuccess(res) {
	return {
		type: types.SIGNUP_USER_SUCCESS,
		//message: 'SignedUp'//res.message
		user: res.user,
		token: res.token
	};
}

export function signupUserFail(res) {
	return {
		type: types.SIGNUP_USER_FAIL,
		message: res.message
	};
}

export function signupUser(user) {
	console.log('User to be signed up: ', user)
	return function (dispatch) {

		console.log(API_URL + 'register')
		axios.post(API_URL + 'register', user)
			.then(res => {
				console.log('registerResponse: ', res)
				dispatch(signupUserSuccess(res.meta));
				_signupAsync(user)
			})
			.catch(error => {
				console.log("Error registering: ", error); //eslint-disable-line
				dispatch(signinUserFail({ message: 'خطای سرور' }));
				Alert.alert('خطای سرور', 'خطایی در سرور رخ داده است')
			});
	};
}

_signupAsync = async (user) => {
	await AsyncStorage.setItem('userToken', JSON.stringify(user))
		.then(() => {
			//console.log("The user has been stored locally")
			goHome();
		})
		.catch(err => {
			Alert.alert('error: ', err);
		})
};

export function setStatusSuccess(status) {
	return {
		type: types.SET_STATUS,
		status: status
	}
}

export function setStatus(status) {
	return function (dispatch) {
		dispatch(setStatusSuccess(status));
	}
}

// Error Clear
export function clearErrorSUCCESS() {
	return {
		type: types.CLEAR_AUTH_ERROR,
		message: null
	}
}

export function clearError() {
	return function (dispatch) {
		dispatch(clearErrorSUCCESS());
	};
}