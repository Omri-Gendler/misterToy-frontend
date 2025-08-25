import { toyService } from '../services/toy.service.js'
import { SET_TOYS, ADD_TOY, REMOVE_TOY, UPDATE_TOY, SET_FILTER, SET_IS_LOADING } from '../reducers/toy.reducer.js'
import { store } from './store.js'

export const toyActions = {
    loadToys,
    removeToy,
    saveToy,
    updateToy,
    addToy,
    setFilter
}


export function loadToys(filterBy = {}) {
    // const { filterBy, sortBy } = store.getState().toyModule


    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
        .finally(() => {
            setTimeout(() => {
                store.dispatch({ type: SET_IS_LOADING, isLoading: false })
            }, 350)
        })
}

export function removeToy(toyId) {
    toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.error('Error removing toy:', err)
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            console.log('savedToy:', savedToy)
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}


export function updateToy(toy) {
    toyService.put(toy)
        .then(() => {
            store.dispatch({ type: UPDATE_TOY, toy })
        })
        .catch(err => {
            console.error('Error updating toy:', err)
        })
}

export function addToy(toy) {
    toyService.post(toy)
        .then((newToy) => {
            store.dispatch({ type: ADD_TOY, toy: newToy })
        })
        .catch(err => {
            console.error('Error adding toy:', err)
        })
}

export function setFilter(filterBy) {
    store.dispatch({ type: SET_FILTER, filterBy })
}
