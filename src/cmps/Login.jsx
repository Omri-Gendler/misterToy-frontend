import { httpService } from './http.service'

const STORAGE_KEY = 'loggedinUser'

export const authService = {
    login: Login,
    logout,
    getLoggedInUser,
}

async function Login(credentials) {
    const user = await httpService.post('auth/login', credentials)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    return user
}

async function logout() {
    await httpService.post('auth/logout')
    sessionStorage.removeItem(STORAGE_KEY)
}

function getLoggedInUser() {
    const str = sessionStorage.getItem(STORAGE_KEY)
    return str ? JSON.parse(str) : null
}