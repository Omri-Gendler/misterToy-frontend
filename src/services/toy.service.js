import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
// Removed import of removeTodo action to prevent circular dependency

const TOY_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultFilter,
    getFilterFromSearchParams,
    getImportanceStats,
}
// For Debug (easy access from console):
window.cs = toyService

function query(filterBy = {}) {
    return storageService.query(TOY_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.txt))
            }
            console.log('toys', toys)
            return toys
        })
}

function get(toyId) {
    return storageService.get(TOY_KEY, toyId)
        .then(toy => {
            toy = _setNextPrevTodoId(toy)
            return toy
        })
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        // TODO - updatable fields
        toy.updatedAt = Date.now()
        return storageService.put(TOY_KEY, toy)
    } else {
        toy.createdAt = toy.updatedAt = Date.now()

        return storageService.post(TOY_KEY, toy)
    }
}

function getEmptyToy(txt = '', importance = 5) {
    return { txt, importance, isDone: false }
}

function getDefaultFilter() {
    return { txt: '', importance: 0 }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}


function getImportanceStats() {
    return storageService.query(TOY_KEY)
        .then(toys => {
            const toyCountByImportanceMap = _getTodoCountByImportanceMap(toys)
            const data = Object.keys(toyCountByImportanceMap).map(speedName => ({ title: speedName, value: toyCountByImportanceMap[speedName] }))
            return data
        })

}

function _createToys() {
    const img = 'assets/logo/logo.avif'
    let toys = JSON.parse(localStorage.getItem(TOY_KEY))
    if (!toys || !toys.length) {
        toys = [
            { _id: 't101', name: 'Lego', price: 120, type: 'Building', imgUrl: img },
            { _id: 't102', name: 'Barbie', price: 80, type: 'Doll', imgUrl: img },
            { _id: 't103', name: 'Hot Wheels', price: 50, type: 'Car', imgUrl: img }
        ]
        localStorage.setItem(TOY_KEY, JSON.stringify(toys))
    }
}
function _createToy(txt, importance) {
    const toy = getEmptyToy(txt, importance)
    toy._id = utilService.makeId()
    toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return toy
}

function _setNextPrevTodoId(toy) {
    return storageService.query(TOY_KEY).then((toys) => {
        const todoIdx = toys.findIndex((currTodo) => currTodo._id === toy._id)
        const nextToy = toys[todoIdx + 1] ? toys[todoIdx + 1] : toys[0]
        const prevToy = toys[todoIdx - 1] ? toys[todoIdx - 1] : toys[toys.length - 1]
        toy.nextToyId = nextToy._id
        toy.prevToyId = prevToy._id
        return toy
    })
}

function _getToyCountByImportanceMap(toys) {
    const toyCountByImportanceMap = toys.reduce((map, toy) => {
        if (toy.importance < 3) map.low++
        else if (toy.importance < 7) map.normal++
        else map.urgent++
        return map
    }, { low: 0, normal: 0, urgent: 0 })
    return toyCountByImportanceMap
}


// Data Model:
// const toy = {
//     _id: "gZ6Nvy",
//     txt: "Master Redux",
//     importance: 9,
//     isDone: false,
//     createdAt: 1711472269690,
//     updatedAt: 1711472269690
// }

