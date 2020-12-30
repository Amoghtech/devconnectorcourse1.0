import axios from 'axios';
import { setAlert } from './alert';
import { withRouter } from 'react';
import { GET_PROFILE, PROFILE_ERROR,UPDATE_PROFILE } from './types';

// Get a current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update a profilre
export const createprofile = (formdata, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'contant-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile', formdata, config);
    // After creating get profile
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile updated' : 'Profile Created', 'success'));
    if (!edit) {
      /*if profile is ceated then we have to redirect it to dashboard, if profile is updated then we have to stay oin that page */
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add experience
export const addExperience = (formdata, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'contant-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile/experience', formdata, config);
    // After creating get profile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }};




  // add education
export const addEducation = (formdata, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'contant-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile/education', formdata, config);
    // After creating get profile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }};