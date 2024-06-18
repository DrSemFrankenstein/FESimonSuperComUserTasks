import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes } from "react-router-dom";
import MainScreen from "./MainScreen";

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <main style={{ bgcolor: "background.paper" }}>
        <Routes>
          <Route path="/" element={<MainScreen />} />
        </Routes>
      </main>
    </>
  );
}
