import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './stores/store.js'

import { Home } from './pages/Home.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyIndex } from './cmps/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/toy" element={<ToyIndex />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/toy/:id" element={<ToyDetails />} />
          <Route path="/toy/edit/:id?" element={<ToyEdit />} />
        </Routes>
      </Router>
    </Provider>
  )
}
