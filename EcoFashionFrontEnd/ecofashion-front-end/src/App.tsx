import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Homepages from "./pages/Homepages";
import About from "./pages/About";
import FooterInfo from "./pages/FooterInfo";

function App() {
  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepages />} />
        <Route path="/ourstory" element={<About />} />
      </Routes>
      <FooterInfo />
    </div>
  );
}

export default App;
