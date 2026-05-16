import { BrowserRouter, Route, Routes } from "react-router";
import Auth from "./pages/auth";


function App() {


  return <BrowserRouter>
    <Routes>
      {/* Routes go here */}
      <Route path="/auth" element={<Auth />} />
    </Routes>
  </BrowserRouter>
}

export default App;
