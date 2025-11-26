import { loginReducer, logoutReducer } from "../reducers/userReducer"
import { AppDispatch } from "../store"

export const loginAction = (userData: any) => (dispatch: AppDispatch) => {
    dispatch(loginReducer(userData))
}

export const logoutAction = () => (dispatch: AppDispatch) => {
    dispatch(logoutReducer([]))
}


  