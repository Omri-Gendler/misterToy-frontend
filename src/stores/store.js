import store from 'redux'


export const SET_TOYS = 'SET_TOYS'

const initialState = {
    toys: [],
    filterBy: null,
    user: null
}

export function AppReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case 'SET_TOYS':
            return { ...state, toys: cmd.toys }
        default:
            return state
    }
}

export const store = createStore(AppReducer)