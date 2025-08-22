import { storageService } from './async-storage.service.js'
import { SET_TOYS, ADD_TOY, REMOVE_TOY, UPDATE_TOY, SET_FILTER } from '../stores/store.js'


export function loadToys(filterBy) {
    storageService.query(filterBy)
        .then(toys => store.dispatch({ type: SET_TOYS, toys }))
        .catch(err => {
            console.error('Error loading toys:', err)
        })
}

export function removeToy(toyId) {
    storageService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.error('Error removing toy:', err)
        })
}

export function updateToy(toy) {
    storageService.put(toy)
        .then(() => {
            store.dispatch({ type: UPDATE_TOY, toy })
        })
        .catch(err => {
            console.error('Error updating toy:', err)
        })
}

export function addToy(toy) {
    storageService.post(toy)
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
