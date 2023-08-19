import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "./context/user";

import SignIn from "./pages/SignIn";
import Registration from "./pages/Registration";
import ProfileSetup from "./pages/ProfileSetup";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ListingPage from "./pages/ListingPage";
import OfferPage from "./pages/OfferPage";
import AddOffer from "./pages/AddOffer";
import Transactions from "./pages/Transactions";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState("");

  return (
    <div className="margin-padding-0">
      <UserContext.Provider
        value={{ accessToken, setAccessToken, userInfo, setUserInfo }}
      >
        <Routes>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/profile-setup" element={<ProfileSetup />}></Route>

          <Route path="/" element={<OfferPage />}></Route>
          <Route path="/add-offer" element={<AddOffer />}></Route>
          <Route path="/listing-page" element={<ListingPage />}></Route>

          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/settings" element={<Settings />}></Route>

          <Route path="/transactions" element={<Transactions />}></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
