import axios from "axios"

import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS,SET_CURRENT_USER } from "./constants.js"


// Create a new profile for user
export let createProfile = (profileData, history) => (dispatch) => {
  axios
    .post('/api/profile', profileData)
    .then((response) => {
      history.push('/dashboard')
    })
    .catch( (error) =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    )
}



// Get all existing profiles of users
export let getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading())
  axios
    .get('/api/profile/all')
    .then( (response) =>
      dispatch({
        type: GET_PROFILES,
        payload: response.data
      })
    )
    .catch( (error) =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    )
}



// Get an existing profile of user
export let getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get("/api/profile")
    .then( (response) =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      }))
    .catch( (error) =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    )
}


// Add new education details
export let addEducation = (eduData, history) => (dispatch) => {
  axios
    .post('/api/profile/education', eduData)
    .then( (response) => {
      history.push('/dashboard')
    })
    .catch( (error) =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    )
}



// Delete existing education details
export let deleteEducation = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then( (response) =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    )
    .catch( (error) =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    )
}




// Add new experience details
export let addExperience = (expData, history) => (dispatch) => {
  axios
    .post('/api/profile/experience', expData)
    .then( (response) => {
      history.push('/dashboard')
    })
    .catch( (error) =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    )
}



// Delete existing experience details
export let deleteExperience = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then( (response) =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    )
    .catch( (error) =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    )
}





//  Get a profile via Handle
export let getProfileByHandle = (handle) => (dispatch) => {
  dispatch(setProfileLoading())
  axios
    .get(`/api/profile/handle/${handle}`)
    .then( (response) =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    )
    .catch( (error) =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    )
}





// Clearing current profile
export let clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}



// Profile loading 
export let setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}



// Delete a user's account
export let deleteAccount = () => (dispatch) => {
  if (window.confirm('This action once performed cannot be undone! Continue?')) {
    axios
      .delete('/api/profile')
      .then( (response) =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch((error) =>
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        })
      )
  }
}