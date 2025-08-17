import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "@pages/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
