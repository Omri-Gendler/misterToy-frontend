import store from 'redux'


export const ADD_TOY = 'ADD_TOY'

const initialState = {
    toys: [],
    filterBy: null,
    user: null
}

export function AppReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case 'ADD_TOY':
            return { ...state, toys: [...state.toys, cmd.toy] }
        default:
            return state
    }
}

export const store = createStore(AppReducer)