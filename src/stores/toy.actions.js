import { toyService } from '../services/toy.service.js'
import { SET_TOYS, ADD_TOY, REMOVE_TOY, UPDATE_TOY, SET_FILTER, SET_IS_LOADING } from '../reducers/toy.reducer.js'
import { store } from './store.js'
import swal from 'sweetalert2'
import { showErrorMsg } from '../services/event-bus.service.js'

export const toyActions = {
    loadToys,
    removeToyOptimistic,
    saveToy,
    updateToy,
    addToy,
    setFilter
}


// frontend/src/stores/toy.actions.js

export async function loadToys() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        // ✨ שלב קריטי: קוראים את הפילטר העדכני ביותר ישירות מה-store
        const filterBy = store.getState().toyModule.filterBy

        console.log('Action is loading toys with filter:', filterBy) // נשאיר את זה לבדיקה

        // שולחים את הפילטר שקיבלנו מה-store לסרוויס
        const data = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, data })

    } catch (err) {
        console.log('toy action -> Cannot load toys', err)
        throw err
    } finally {
        setTimeout(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        }, 350)
    }
}
export async function removeToyOptimistic(toyId) {
    const originalToys = store.getState().toyModule.toys

    store.dispatch({ type: 'REMOVE_TOY', toyId })

    try {
        await toyService.remove(toyId)

        showSuccessMsg('Toy removed!')

    } catch (err) {
        console.error('Failed to remove toy, rolling back state', err)
        showErrorMsg('Could not remove toy')
        store.dispatch({ type: 'SET_TOYS', toys: originalToys })
    }
}

function showSuccessMsg(msg) {
    swal.fire({
        position: 'top-end',
        icon: 'success',
        title: msg,
        showConfirmButton: false,
        timer: 1500
    })
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
        showSuccessMsg('Toy updated successfully!')
        return updatedToy
    } catch (err) {
        console.error('Error updating toy:', err)
        showErrorMsg('Could not update toy')
    }
}

export function addToy(toy) {
    toyService.save(toy)
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
