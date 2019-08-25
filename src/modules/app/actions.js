import axios from 'axios';
import * as types from '../../constants/actionTypes';
import { API_URL, API_KEY } from '../../constants/api';
import { goHome } from '../../utils/navigation'
import { ToastAndroid, Alert } from "react-native";
import { Navigation } from 'react-native-navigation';
//import * as authActions from '../authentication/actions';
import AsyncStorage from '@react-native-community/async-storage';


export function retrieveAllCoursesSuccess(res) {
	return {
		type: types.RETRIEVE_ALL_COURSES_SUCCESS,
		data: res.data,
		meta: res.meta
	};
}

export function retrieveAllCoursesFail(res) {
	return {
		type: types.RETRIEVE_ALL_COURSES_FAIL,
		message: res.msg,
	};
}

export function retrieveAllCourses() {
	return function (dispatch) {
		console.log(API_URL + 'courses/get_all_courses')
		axios.get(API_URL + 'courses/get_all_courses')
			.then(res => {
				console.log('AllCoursesResponse: ', res)
				dispatch(retrieveAllCoursesSuccess({ data: res.data.data, meta: res.data.meta }));
			})
			.catch(error => {
				console.log("Error AllCoursesResponse: ", error.response); //eslint-disable-line
				dispatch(retrieveAllCoursesFail({ msg: 'قادر به دریافت تمامی دوره ها نبودیم ' }));
				Alert.alert('خطای سرور', 'قادر به دریافت تمامی دوره ها نبودیم ')

				/*if (error.response.status === 422) {
					dispatch(signinUserFail({ msg: error.response.data.errors.mobile[0] }));
					Alert.alert('خطای سرور', error.response.data.errors.mobile[0])
				}
				if (error.response.status === 403) {
					dispatch(signinUserFail({ msg: error.response.data.data.message }));
					Alert.alert('خطای سرور', error.response.data.data.message)
				}*/
			});
	};
}

export function retrieveMyCoursesSuccess(res) {
	return {
		type: types.RETRIEVE_MY_COURSES_SUCCESS,
		data: res.data,
		//meta: res.meta
	};
}

export function retrieveMyCoursesFail(res) {
	return {
		type: types.RETRIEVE_MY_COURSES_FAIL,
		message: res.msg,
	};
}

async function retrieveDetails(urls) {
	//crss = []
	crss = await urls.map((crs, index) => {
		console.log(API_URL + 'courses/' + crs.course_id)
		axios
			.get(API_URL + 'courses/' + crs.course_id)
			.then(res => {
				//crss.concat(res.data.data)
				console.log('Crs Response: ', res.data.data)
				return res.data.data
			})
			.catch(error => {
				console.log('Crs Error: ', error.response ? error.response : error)
			})
	})
	return crss
}

export function retrieveMyCourses(token, id) {
	return function (dispatch) {
		console.log(API_URL + 'userpanel/get_user_courses/' + id + '?api_token=' + token)
		axios.get(API_URL + 'userpanel/get_user_courses/' + id + '?api_token=' + token)
			.then(res => {
				//(async () => {
				//	crss = ['jkh']
				res.data.data.learnings.data.map((crs, index) => {
					console.log(API_URL + 'courses/' + crs.course_id)
					axios
						.get(API_URL + 'courses/' + crs.course_id)
						.then(res1 => {
							dispatch(retrieveMyCoursesSuccess({ data: res1.data.data }));
							//crss.concat(res.data.data)
							console.log('Crs Response: ', res1.data.data)
							//crss.concat(res.data.data)
						})
						.catch(error => {
							console.log('Crs Error: ', error.response ? error.response : error)
						})
				})
				//console.log('CRSS: ', crss)
				//return crss
				//})
				//().then((res1) => {
				console.log('MyCoursesResponse: ', res)
				//console.log('MyRetrieveResponse: ', res1)
				//dispatch(retrieveMyCoursesSuccess({ data: res1 }));
				//})
				/*
				retrieveDetails(res.data.data.learnings.data)
					.then(res1 => {
						console.log('MyRetrieveResponse: ', res1)
						dispatch(retrieveMyCoursesSuccess({ data: res1 }));
					})
				*/
			})
			.catch(error => {
				console.log("Error MyCoursesResponse: ", error.response ? err.response : error); //eslint-disable-line
				dispatch(retrieveMyCoursesFail({ msg: 'قادر به دریافت دوره های شما نبودیم ' }));
				Alert.alert('خطای سرور', 'قادر به دریافت دوره های شما نبودیم ')

				/*if (error.response.status === 422) {
					dispatch(signinUserFail({ msg: error.response.data.errors.mobile[0] }));
					Alert.alert('خطای سرور', error.response.data.errors.mobile[0])
				}
				if (error.response.status === 403) {
					dispatch(signinUserFail({ msg: error.response.data.data.message }));
					Alert.alert('خطای سرور', error.response.data.data.message)
				}*/
			});
	};
}

export function addPhotoSuccess(imgUri) {
	return {
		type: types.ADD_TO_NEWOBSERVATIONS_SUCCESS,
		imgUri: imgUri
	}
}

export function addPhoto(img, user) {
	return async function (dispatch) {
		const data = await AsyncStorage.getItem(user.email);
		if (data === null) {
			await AsyncStorage.setItem(user.email, JSON.stringify({
				newObservations: [{
					img: 'file://' + img
				}]
			}))
				.then(() => {
					console.log("The observation has been stored locallkky")
					dispatch(addPhotoSuccess(img));
					//goHome();
				})
				.catch(err => {
					Alert.alert('Could not save locally', err);
				})
		} else {
			if (data.newObservations) {
				data.newObservations = [...data.newObservations, { img: 'file://' + img }]
				await AsyncStorage.setItem(user.email, JSON.stringify(data))
					.then(() => {
						dispatch(addPhotoSuccess(img));
					})
			} else {
				data.newObservations = [{ img: 'file://' + img }]
				await AsyncStorage.setItem(user.email, JSON.stringify(data))
					.then(() => {
						dispatch(addPhotoSuccess(img));
					})
			}
		}
	};
}

export function addTimeandLocSuccess(time, lon, lat) {
	return {
		type: types.ADD_TIME_AND_LOC_TO_NEWOBSERVATIONS_SUCCESS,
		time: time,
		lon: lon,
		lat: lat
	}
}

export function addTimeandLoc(time, lon, lat, user, currentIndex) {
	return async function (dispatch) {
		//= null
		var jdata = await AsyncStorage.getItem(user.email)

		//console.log('data: ',data)
		const data = JSON.parse(jdata)
		//console.log('jdata: ',jdata)
		if (data === null) {
			console.log('Nothing')
		}
		//console.log('jdata newobservation: ',jdata.newObservations)
		if (currentIndex === 0) {
			data.newObservations = [{
				img: data.newObservations[0].img,
				time: time,
				lon: lon,
				lat: lat
			}]
			await AsyncStorage.setItem(user.email, JSON.stringify(data))
		} else {
			data.newObservations = data.newObservations.slice(0, currentIndex).concat(
				[{
					img: data.newObservations[currentIndex].img,
					time: time,
					lon: lon,
					lat: lat
				}].concat(data.newObservations.slice(currentIndex + 1))
			)
			await AsyncStorage.setItem(user.email, JSON.stringify(data))
		}

		dispatch(addTimeandLocSuccess(time, lon, lat));
	};
}

export function addHumanstoNewObservationSuccess(human) {
	return {
		type: types.ADD_HUMANS_TO_NEWOBSERVATIONS_SUCCESS,
		human: human
	}
}

export function addHumanstoNewObservation(human, user, currentIndex) {
	return async function (dispatch) {
		const jdata = await AsyncStorage.getItem(user.email);

		var data = JSON.parse(jdata)
		if (currentIndex === 0) {
			data.newObservations = [{
				img: data.newObservations[0].img,
				time: data.newObservations[0].time,
				lon: data.newObservations[0].lon,
				lat: data.newObservations[0].lat,
				text: String(human[0].num) + ' ' + human[0].species,
				human: human,
				animal: data.newObservations[0].animal ? data.newObservations[0].animal : null
			}]
			await AsyncStorage.setItem(user.email, JSON.stringify(data))
		} else {
			data.newObservations = data.newObservations.slice(0, currentIndex).concat(
				[{
					img: data.newObservations[currentIndex].img,
					time: data.newObservations[currentIndex].time,
					lon: data.newObservations[currentIndex].lon,
					lat: data.newObservations[currentIndex].lat,
					text: String(human[0].num) + ' ' + human[0].species,
					human: human,
					animal: data.newObservations[currentIndex].animal ? data.newObservations[currentIndex].animal : null
				}].concat(data.newObservations.slice(currentIndex + 1))
			)
			await AsyncStorage.setItem(user.email, JSON.stringify(data))
		}
		dispatch(addHumanstoNewObservationSuccess(human));
	};
}

export function addAnimalstoNewObservationSuccess(animal) {
	return {
		type: types.ADD_ANIMALS_TO_NEWOBSERVATIONS_SUCCESS,
		animal: animal
	}
}
export function addAnimalstoNewObservation(animal, user, currentIndex) {
	return async function (dispatch) {
		const jdata = await AsyncStorage.getItem(user.email);
		var data = JSON.parse(jdata)
		if (currentIndex === 0) {
			data.newObservations = [{
				img: data.newObservations[0].img,
				time: data.newObservations[0].time,
				lon: data.newObservations[0].lon,
				lat: data.newObservations[0].lat,
				text: String(animal[0].num) + ' ' + animal[0].species,
				animal: animal,
				human: data.newObservations[0].human ? data.newObservations[0].human : null
			}]
			await AsyncStorage.setItem(user.email, JSON.stringify(data))
		} else {
			data.newObservations = data.newObservations.slice(0, currentIndex).concat(
				[{
					img: data.newObservations[currentIndex].img,
					time: data.newObservations[currentIndex].time,
					lon: data.newObservations[currentIndex].lon,
					lat: data.newObservations[currentIndex].lat,
					text: String(animal[0].num) + ' ' + animal[0].species,
					animal: animal,
					human: data.newObservations[currentIndex].human ? data.newObservations[currentIndex].human : null
				}].concat(data.newObservations.slice(currentIndex + 1))
			)
			await AsyncStorage.setItem(user.email, JSON.stringify(data))
		}
		dispatch(addAnimalstoNewObservationSuccess(animal));
	};
}

// Signin User
export function retrieveNewObservationsSuccess(res, index) {
	return {
		type: types.RETRIEVE_NEW_OBSERVATIONS_SUCCESS,
		newObservations: res,
		currentIndex: index
	};
}

export function retrieveObservationsSuccess(res) {
	return {
		type: types.RETRIEVE_OBSERVATIONS_SUCCESS,
		observations: res
	};
}

export function retrieveObservations(status, user, token) {
	return async function (dispatch) {
		if (!status) {
			//online

			//console.log(API_URL + 'observations')
			var config = {
				headers: { 'Authorization': token }
			};

			var bodyParameters = {

			};
			axios.get(API_URL + 'observations', bodyParameters, config)
				.then(res => {
					console.log('Observations: ', res)
					dispatch(retrieveObservationsSuccess(res.meta));
					_saveObservations(res.meta, user)
					//goHome();
				})
				.catch(async (error) => {
					Alert.alert('Server Err', 'We could not retrieve the observations.')
					//_loadObservations(user)
					const jdata = await AsyncStorage.getItem(user.email)
					const data = JSON.parse(jdata)
					console.log('Load Obsrv: ', data)
					if (data === null) {
						Alert.alert('No data', 'You have no observations, you can add one by pressing Log.')
					} else {
						if (data.observations) {
							dispatch(retrieveObservationsSuccess(data.observations))
						}
						if (data.newObservations) {
							dispatch(retrieveNewObservationsSuccess(data.newObservations, data.newObservations.length - 1))
						}
					}
					console.log(error); //eslint-disable-line
				});

		} else {
			//offline
			Alert.alert('Offline', 'We could not retrieve the observations.')
			//_loadObservations(user)
			const jdata = await AsyncStorage.getItem(user.email)
			if (jdata === null) {
				Alert.alert('No data', 'You have no observations, you can add one by pressing Log.')
			} else {
				const data = JSON.parse(jdata)
				console.log('Load Obsrv: ', data)
				if (data.observations) {
					dispatch(retrieveObservationsSuccess(data.observations))
				}
				if (data.newObservations) {
					dispatch(retrieveNewObservationsSuccess(data.newObservations, data.newObservations.length - 1))
				}
			}
		}
	};
}

async function _saveObservations(data, user) {
	await AsyncStorage.setItem(user.email, JSON.stringify({ observations: data }))
		.then(() => {
			//console.log("The user has been stored locallkky")
			//goHome();
		})
		.catch(err => {
			//alert('error: jhggkj', err);
		})
}

export function _loadObservations(user) {
	//Alert.alert('No data', 'You have no observations, you can add one by pressing Log.')
	return async function (dispatch) {
		const jdata = await AsyncStorage.getItem(user.email)
			.then(() => {
				console.log('Read')
				const data = JSON.parse(jdata)
				console.log('Load Obsrv: ', data)
				if (data === null) {
					Alert.alert('No data', 'You have no observations, you can add one by pressing Log.')
				} else {
					if (data.observations) {
						dispatch(retrieveObservationsSuccess(data.observations))
					}
					if (data.newObservations) {
						dispatch(retrieveNewObservationsSuccess(data.newObservations, data.newObservations.length - 1))
					}
				}
			})
			.catch((err) => {
				console.log('Err Read: ', err)
			})
	}
}
