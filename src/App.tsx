import "./App.css"
import "./Navbar.css"
import "bootstrap/dist/css/bootstrap.min.css"

import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import { Provider } from "react-redux"
import { store } from "./redux/store"

function App() {
  return (
    <Provider store={store}>
      <div className="d-flex flex-column min-vh-100">
        <header>
          <Navbar />
        </header>
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lavoro" element={<Lavoro />} />
          </Routes>
        </main>
        <footer></footer>
      </div>
    </Provider>
  )
}

export default App
