import { BrowserRouter as Router, Route, Routes, HashRouter, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './stores/store.js'
import { useState } from 'react'

import { Home } from './pages/Home.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { Dashboard } from './cmps/Dashboard.jsx'
import { ShopsMap } from './pages/ShopsMap.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { AddToy } from './cmps/AddToy.jsx'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { authService } from './services/auth.service.js'

import './assets/style/main.css'

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(authService.getLoggedInUser())

  return (
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/toy" element={<ToyIndex />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/toy/:id" element={<ToyDetails />} />
          <Route path="/toy/edit/:id?" element={<ToyEdit />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddToy />} />
          <Route path="/login" element={
            loggedInUser ? <Navigate to="/" replace /> :
            <LoginPage onLogin={(user)=> setLoggedInUser(user)} />
          } />
          <Route path="/signup" element={
            loggedInUser ? <Navigate to="/" replace /> :
            <SignupPage onSignup={user => setLoggedInUser(user)} />
          } />
          <Route path="/shops" element={<ShopsMap />} />
        </Routes>
      </Provider>
      <UserMsg />
    </HashRouter>
  )
}
