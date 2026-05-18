import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./pages/Home"

function App() {
  // ciao
  return (
    <div className="d-flex flex-column min-vh-100">
      <header></header>
      <main className="flex-grow-1">
        <Home />
      </main>
      <footer></footer>
    </div>
  )
}

export default App
