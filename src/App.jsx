import "./App.css";
import Layout from "./Screens/Layout";
import theme from "./theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ position: "relative", zIndex: 1, height: "100vh" }}>
          <Router>
            <Layout />
          </Router>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
