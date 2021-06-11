export const LoginStart = (userCredentials)=>({
    type: "LOGIN_START"
})

export const LoginSuccess = (user)=>({
    type: "LOGIN_SUCCESS",
    payload: user,
})

export const LoginFailure = (userCredentials)=>({
    type: "LOGIN_FAILURE"
})

//new
export const UpdateStart = (userCredentials)=>({
    type: "UPDATE_START"
})

export const UpdateSuccess = (user)=>({
    type: "UPDATE_SUCCESS",
    payload: user,
})

export const UpdateFailure = (userCredentials)=>({
    type: "UPDATE_FAILURE"
})
//

export const Logout = () =>({
    type: "LOGOUT"
})

