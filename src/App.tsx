import "./App.css";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import type { AppDispatch } from "./redux/store";
import { getAllProfilesAction } from "./redux/actions/profileActions";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Lavoro from "./pages/Lavoro";
import Profilo from "./pages/Profilo";
import ChatBar from "./components/ChatBar";
import { PaginaErrore } from "./pages/PaginaErrore";

const AppContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllProfilesAction());
  }, [dispatch]);
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lavoro" element={<Lavoro />} />
          <Route path="/profilo" element={<Profilo />} />
          <Route path="/profilo/:userId" element={<Profilo />} />
          <Route path="*" element={<PaginaErrore />} />
        </Routes>
      </main>
      <ChatBar />
      <footer></footer>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
