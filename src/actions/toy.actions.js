import { storageService } from './async-storage.service.js'


export function loadToys(filterBy) {
    storageService.query(filterBy)
        .then(toys => store.dispatch({ type: SET_TOYS, toys }))
        .catch(err => {
            console.error('Error loading toys:', err)
        })
}
