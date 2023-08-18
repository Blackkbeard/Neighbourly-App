import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div className="container">
      
      <Routes>
        <Route path="/sign-in" element={<SignIn />}></Route>
      </Routes>
    </div>
  );
}

export default App;
