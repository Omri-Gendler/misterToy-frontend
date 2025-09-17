import { httpService } from './http.service'

const BASE_URL = 'toy/'

export const toyService = {
  query,
  getById,
  save,
  remove,
  add,
  getEmptyToy,
  getDefaultFilter,
  getToyLabels,
  getLabelCounts,
  addMsg,
  removeMsg,
}

const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
]
// בקובץ: frontend/src/services/toy.service.js

async function query(filterBy = {}) {
  // ניצור עותק של הפילטרים כדי לא לשנות את האובייקט המקורי ב-store
  const paramsToBuild = { ...filterBy }

  // 1. נטפל ידנית באובייקט המיון המקונן
  if (paramsToBuild.sortBy) {
    // נהפוך את { sortBy: { type: 'name', dir: 1 } }
    // ל- { 'sortBy[type]': 'name', 'sortBy[dir]': 1 }
    paramsToBuild['sortBy[type]'] = paramsToBuild.sortBy.type
    paramsToBuild['sortBy[sortDir]'] = paramsToBuild.sortBy.sortDir
    delete paramsToBuild.sortBy // נמחק את המפתח המקורי כדי למנוע כפילות
  }

  // 2. עכשיו ניתן ל-URLSearchParams לעשות את שאר העבודה על אובייקט "שטוח"
  const params = new URLSearchParams(paramsToBuild)
  const queryString = params.toString()
  const finalUrl = `${BASE_URL}?${queryString}`

  // 3. (חשוב!) נוסיף console.log כדי לראות את ה-URL הסופי לפני השליחה
  console.log('Service is sending request to URL:', finalUrl)

  return httpService.get(finalUrl, null, { withCredentials: true })
}

async function getById(toyId) {
  return httpService.get(BASE_URL + toyId)
}

async function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

async function add(toy) {
  return httpService.post(BASE_URL, toy, { withCredentials: true })
}

async function save(toy) {
  const BASE_URL = toy._id ? `toy/${toy._id}` : 'toy/'
  const method = toy._id ? 'put' : 'post'
  return httpService[method](BASE_URL, toy)
}

async function addMsg(toyId, msg) {
  return httpService.post(BASE_URL + `${toyId}/msg`, msg)
}

async function removeMsg(toyId, msgId) {
  return httpService.delete(BASE_URL + `${toyId}/msg/${msgId}`)
}

function getDefaultFilter() {
  return {
    txt: '',
    inStock: null,
    labels: [],
    pageIdx: 0,
    sortBy: { type: '', sortDir: 1 },
  }
}

function getEmptyToy() {
  return {
    name: '',
    price: '',
    labels: _getRandomLabels(),
  }
}

function getToyLabels() {
  return [...labels]
}

function _getRandomLabels() {
  const labelsCopy = [...labels]
  const randomLabels = []
  for (let i = 0; i < 2; i++) {
    const randomIdx = Math.floor(Math.random() * labelsCopy.length)
    randomLabels.push(labelsCopy.splice(randomIdx, 1)[0])
  }
  return randomLabels
}

async function getLabelCounts() {
  try {
    const { toys } = await query()
    const labelCounts = {}
    toys.forEach(toy => {
      toy.labels.forEach(label => {
        if (labelCounts[label]) {
          labelCounts[label]++
        } else {
          labelCounts[label] = 1
        }
      })
    })
    const labelCountArray = Object.entries(labelCounts).map(
      ([label, count]) => ({
        label,
        count,
      })
    )
    return labelCountArray
  } catch (error) {
    console.log('Could not get label count', error)
  }
}
