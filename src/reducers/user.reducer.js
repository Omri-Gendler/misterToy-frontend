const initialState = {
    loggedInUser: null
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_LOGGED_IN_USER':
            return { ...state, loggedInUser: action.user }
        case 'LOGOUT_USER':
            return { ...state, loggedInUser: null }
        default:
            return state
    }
}