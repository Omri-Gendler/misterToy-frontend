export const SET_TOYS = 'SET_TOYS'
export const ADD_TOY = 'ADD_TOY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_FILTER = 'SET_FILTER'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: [
        { _id: 't101', name: 'Lego', price: 120, type: 'Building' },
        { _id: 't102', name: 'Barbie', price: 80, type: 'Doll' },
        { _id: 't103', name: 'Hot Wheels', price: 50, type: 'Car' }
    ],
    filterBy: {
        txt: '',
    },
    user: null,
    isLoading: false
}

export function AppReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case 'SET_TOYS':
            return { ...state, toys: cmd.toys }
        case 'ADD_TOY':
            return { ...state, toys: [...state.toys, cmd.toy] }
        case 'REMOVE_TOY':
            return { ...state, toys: state.toys.filter(toy => toy._id !== cmd.toyId) }
        case 'UPDATE_TOY':
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === cmd.toy._id ? cmd.toy : toy)
            }
        case 'SET_IS_LOADING':
            return { ...state, isLoading: cmd.isLoading }
        case 'SET_FILTER':
            return { ...state, filterBy: cmd.filterBy }
        default:
            return state
    }
}