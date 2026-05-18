import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FooterLinkedin from "./ComponentDavide/FooterLinkedin";

function App() {
  // ciao
  return (
    <div className="d-flex flex-column min-vh-100">
      <header></header>
      <main className="flex-grow-1"></main>
      <footer>
        <FooterLinkedin></FooterLinkedin>
      </footer>
    </div>
  );
}

export default App;
