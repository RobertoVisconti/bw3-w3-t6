import "./App.css";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import type { AppDispatch } from "./redux/store";
import { getAllProfilesAction } from "./redux/actions/profileActions";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Lavoro from "./pages/Lavoro";
import Profilo from "./pages/Profilo";
import ChatBar from "./components/generali/ChatBar";
import { PaginaErrore } from "./pages/PaginaErrore";
import { Rete } from "./pages/Rete";
import DetailsJob from "./components/lavoro/DetailsJob";
import Login from "./pages/Login";
import Languages from "./pages/Languages";
import ChatExpand from "./pages/ChatExpand";
import Notifications from "./pages/Notifications";
import Esperienze from "./pages/Esperienze";
import DettaglioNotizia from "./components/notizie/DettaglioNotizia";
import { getNewsAsync } from "./redux/actions/NotizieActions";
import { getJobsAsync } from "./redux/actions/jobActions";

import SettingsPage from "./pages/SettingsPage";
import MainCenter from "./components/home-page/MainCenter";
import SnakePage from "./components/games/SnakePage";
import TetrisGame from "./components/games/TetrisGame";
import SudokuGame from "./components/games/SudokuGame";
import PuzzleGame from "./components/games/PuzzleGame";
import PongGame from "./components/games/PongGame";
import FlappyGame from "./components/games/FlippyGame";
import Premium from "./pages/Premium";
import SettingsWork from "./pages/SettingsWork";
import MieiPost from "./pages/MieiPost";
import Authentication from "./pages/Authentication";
import Landing from "./pages/Landing";

// Pagine pubbliche che non richiedono login
const PUBLIC_PAGES = ["/landing", "/login", "/authentication"];

const AppContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true",
  );

  // Controlla login status al mount e quando cambia il path
  useEffect(() => {
    const loggedStatus = localStorage.getItem("isLoggedIn") === "true";
    const isPublicPage = PUBLIC_PAGES.includes(location.pathname);

    // Se non loggato e NON è una pagina pubblica → vai a /landing
    if (!loggedStatus && !isPublicPage) {
      navigate("/landing", { replace: true });
    }

    setIsLoggedIn(loggedStatus);
  }, [location.pathname, navigate]);

  // Carica dati utente quando loggato
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllProfilesAction());
    }
  }, [dispatch, isLoggedIn]);

  // Carica notizie e lavori
  useEffect(() => {
    dispatch(getNewsAsync());
    dispatch(getJobsAsync());
  }, [dispatch]);

  // Determina quali elementi mostrare
  const isPublicPage = PUBLIC_PAGES.includes(location.pathname);
  const isSettingsPage = location.pathname === "/impostazioni";

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar visibile solo se loggato E non in pagine pubbliche */}
      {isLoggedIn && !isPublicPage && (
        <header className="position-fixed w-100 z-3">
          <Navbar />
        </header>
      )}

      <main className="flex-grow-1 pt-5">
        <Routes>
          {/* Pagine pubbliche */}
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/authentication" element={<Authentication />} />

          {/* Pagine protette - richiedono login */}
          <Route element={<Home />}>
            <Route path="/" element={<MainCenter />} />
            <Route path="/notizia/:id" element={<DettaglioNotizia />} />
            <Route path="/giochi/snake" element={<SnakePage />} />
            <Route path="/giochi/tetris" element={<TetrisGame />} />
            <Route path="/giochi/sudoku" element={<SudokuGame />} />
            <Route path="/giochi/puzzle" element={<PuzzleGame />} />
            <Route path="/giochi/pong" element={<PongGame />} />
            <Route path="/giochi/flappy" element={<FlappyGame />} />
          </Route>

          <Route path="/lavoro" element={<Lavoro />} />
          <Route path="/profilo" element={<Profilo />} />
          <Route path="/profilo/:userId" element={<Profilo />} />
          <Route path="/Rete" element={<Rete />} />
          <Route path="/dettaglio-lavoro/:id" element={<DetailsJob />} />
          <Route path="/Esperienze" element={<Esperienze />} />
          <Route path="/messaggistica" element={<ChatExpand />} />
          <Route path="/notifiche" element={<Notifications />} />
          <Route path="/impostazioni" element={<SettingsPage />} />
          <Route path="/languages" element={<Languages />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/crearelavoro" element={<SettingsWork />} />
          <Route path="/mypost" element={<MieiPost />} />

          {/* 404 - deve essere last */}
          <Route path="*" element={<PaginaErrore />} />
        </Routes>
      </main>

      {/* ChatBar visibile solo se loggato E non in pagine pubbliche E non settings */}
      {isLoggedIn && !isPublicPage && !isSettingsPage && <ChatBar />}

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
