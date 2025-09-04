import { toyService } from '../services/toy.service.js'
import { SET_TOYS, ADD_TOY, REMOVE_TOY, UPDATE_TOY, SET_FILTER, SET_IS_LOADING } from '../reducers/toy.reducer.js'
import { store } from './store.js'
import swal from 'sweetalert2'
import { showErrorMsg } from '../services/event-bus.service.js'

export const toyActions = {
    loadToys,
    removeToy,
    saveToy,
    updateToy,
    addToy,
    setFilter
}


export async function loadToys(filterBy = {}) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const toys = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.log('toy action -> Cannot load toys', err)
        throw err
    } finally {
        setTimeout(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        }, 350)
    }
}

export async function removeToy(toyId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const result = await swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        if (!result.isConfirmed) {
            showErrorMsg('Deletion cancelled')
            return;
        }
        await toyService.remove(toyId);
        store.dispatch({ type: REMOVE_TOY, toyId })
    }
    catch (err) {
        console.error('Error removing toy:', err)
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function saveToy(toy) {
    try {
            const savedToy = await toyService.save(toy)
            const type = toy._id ? UPDATE_TOY : ADD_TOY
            store.dispatch({ type, toy: savedToy })
            if (!savedToy) throw new Error('Could not save toy')
            return savedToy
        } catch (err) {
            console.error('Error saving toy:', err)
            throw err
        }

}


export async function updateToy(toy) {
    try {
        const updatedToy = await toyService.save(toy);
        store.dispatch({ type: UPDATE_TOY, toy: updatedToy })
        if (!updatedToy) throw new Error('Could not update toy')
        return updatedToy
    } catch (err) {
        console.error('Error updating toy:', err)
    }
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
