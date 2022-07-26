import * as ACTIONS from './Constrants'
import { login, logout, signup } from '../api/apiCall';
export const loginSuccess = (authState) => {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authState
    }
}
export const logoutSuccess = () => {
    return async (dispatch) => {
        try {
            await logout();
        } catch (error) { }
        dispatch({ type: ACTIONS.LOGOUT_SUCCESS })
    }
};
export const updateSuccess = ({ displayName, image }) => {
    return {
        type: ACTIONS.UPDATE_SUCCESS,
        payload: {
            displayName, image
        }
    }
}
export const loginHandler = (credentials) => {
    return async (dispatch) => {
        const response = await login(credentials);
        const authState = {
            ...response.data.userVM,
            password: credentials.password,
            token: response.data.token
        }
        dispatch(loginSuccess(authState));
        return response;
    }
}
export const signupHandler = (user) => {
    return async (dispatch) => {
        const response = await signup(user);
        await dispatch(loginHandler(user));
        return response;
    }
}