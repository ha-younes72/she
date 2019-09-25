import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
import * as types from '../../constants/actionTypes';
import { API_URL, API_KEY } from '../../constants/api';
import { goHome, goToAuth } from '../../utils/navigation'
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
				console.log('LoginResponseData: ', res.data.data)
				dispatch(signinUserSuccess({ user: res.data.data, token: res.data.data.api_token }));
				_signInAsync(user)
			})
			.catch(error => {
				console.log("Error Logging In: ", error.response ? error.response : error); //eslint-disable-line
				Alert.alert("Error Logging In: ", String(error))
				if (error.response) {
					if (error.response.status === 422) {
						dispatch(signinUserFail({ msg: error.response.data.errors.mobile[0] }));
						Alert.alert('خطای سرور', error.response.data.errors.mobile[0])
					}
					if (error.response.status === 403) {
						dispatch(signinUserFail({ msg: error.response.data.data.message }));
						Alert.alert('خطای سرور', error.response.data.data.message)
					}
				}
			});
	};
}

_signInAsync = async (user) => {
	await AsyncStorage.setItem('userToken', JSON.stringify(user))
		.then(() => {
			console.log("The user has been stored locallkky")
			goHome();
		})
		.catch(err => {
			Alert.alert('Error in Saving Locally', err);
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
export function updateUserSUCCESS() {
	return {
		type: types.UPDATE_USER_SUCCESS,
		//message: null
	}
}

export function updateUserFail(errors) {
	return {
		type: types.UPDATE_USER_FAIL,
		errors: errors
	}
}

export function updateUser(uId, newUser, user, token) {
	return function (dispatch) {
		console.log(API_URL + 'userpanel/profiles/edit/' + uId)
		console.log(newUser)
		axios
			.post(API_URL + 'userpanel/profiles/edit/' + uId + '?api_token=' + token, {
				tavallod: user.tavallod,
				account_bank: newUser[2].value,
				account_owner: user.account_owner,
				account_kart: newUser[3].value,
				account_shaba: newUser[4].value,
			})
			.then(res => {
				console.log('UpdateUser:', res)
				Alert.alert('اطلاعات ثبت شد')
				dispatch(updateUserSUCCESS());
			})
			.catch(err => {
				console.log('UpdateUser Error:', err.response ? err.response : err)
				err.response ?
					dispatch(updateUserFail(err.response.data.errors))
					:
					Alert.alert('خطا در برقراری ارتباط با سرور')
			})
	};
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

export function logOutSUCCESS() {
	return {
		type: types.LOG_OUT_SUCCESS,
		//message: null
	}
}

export function logOut() {
	return function (dispatch) {
		AsyncStorage.removeItem('userToken')
			.then(() => {
				dispatch(logOutSUCCESS())
				//console.log("The user has been stored locally")
				goToAuth();
			})
			.catch(err => {
				Alert.alert('خطا: ', err);
			})
	};
};