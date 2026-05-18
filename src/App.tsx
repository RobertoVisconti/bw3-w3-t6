import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./pages/Home"
import Navbar from "./componentsDaniele/Navbar"

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
         <Navbar />
      </header>
      <main className="flex-grow-1">
        <Home />
      </main>
      <footer></footer>
    </div>
  )
}

export default App
