import { BrowserRouter as Router, Route, Routes, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './stores/store.js'

import { Home } from './pages/Home.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { ShopsMap } from './pages/ShopsMap.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/toy" element={<ToyIndex />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/toy/:id" element={<ToyDetails />} />
          <Route path="/toy/edit/:id?" element={<ToyEdit />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* <Route path="/shops" element={<ShopsMap />} /> */}
        </Routes>
      </Provider>
      <UserMsg />
    </HashRouter>
  )
}
