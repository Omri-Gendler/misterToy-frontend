import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './stores/store.js'

import { Home } from './pages/Home.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/toy/:toyId" element={<ToyDetails />} />
        </Routes>
      </Router>
    </Provider>
  )
}
