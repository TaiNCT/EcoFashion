import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
//Pages
import Homepages from "./pages/Homepages";
import About from "./pages/About";
import FooterInfo from "./pages/FooterInfo";
import FashionDetail from "./pages/FashionDetail";
import DesignerRegister from "./pages/DesignerRegister";

import { createTheme, ThemeProvider } from "@mui/material/styles";
// make sure its top
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Lato", "sans-serif"].join(","),
    },
  });
  return (
    <div className="app">
      <ScrollToTop />
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <ThemeProvider theme={theme}>
              <Homepages />
            </ThemeProvider>
          }
        />
        <Route path="/ourstory" element={<About />} />
        <Route path="/detail/:id" element={<FashionDetail />} />
        <Route path="/designerregister" element={<DesignerRegister />} />
      </Routes>
      <FooterInfo />
    </div>
  );
}

export default App;
