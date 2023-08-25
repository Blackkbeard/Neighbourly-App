import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "./context/user";
import useFetch from "./hooks/useFetch";

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
  const fetchData = useFetch();
  const initUserId = JSON.parse(localStorage.getItem("userId"));
  const initAccessToken = JSON.parse(localStorage.getItem("accessToken"));

  // states
  const [accessToken, setAccessToken] = useState(initAccessToken);
  const [userId, setUserId] = useState(initUserId);
  const [userInfo, setUserInfo] = useState({});
  const [open, setOpen] = useState(false); //snackbar

  //endpoints
  const getUserInfo = async () => {
    const res = await fetchData("/auth/accounts/" + userId);

    // Store userInfo to localStorage and set as initial state
    localStorage.setItem("userInfo", JSON.stringify(res.data));

    // Set initial userInfo from localStorage after component mounts
    const initUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (initUserInfo) {
      setUserInfo(initUserInfo);
    }
  };

  //when user logs in, userId is updated and app gets user info
  useEffect(() => {
    getUserInfo();
  }, [userId]);

  return (
    <div className="margin-padding-0">
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          userInfo,
          setUserInfo,
          userId,
          setUserId,
          getUserInfo,
        }}
      >
        <Routes>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route
            path="/registration"
            element={<Registration setUserInfo={setUserInfo} />}
          ></Route>
          <Route
            path="/profile-setup"
            element={
              <ProfileSetup
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                getUserInfo={getUserInfo}
              />
            }
          ></Route>

          {/* Make path "/" to direct to SignIn if no accessToken */}
          {!accessToken ? (
            <Route path="/" element={<SignIn />}></Route>
          ) : (
            <Route path="/" element={<OfferPage />}></Route>
          )}
          <Route path="/add-offer" element={<AddOffer />}></Route>
          <Route
            path="/listing/:item"
            element={<ListingPage setOpen={setOpen} />}
          ></Route>

          <Route
            path="/profile/:item"
            element={<Profile open={open} setOpen={setOpen} />}
          ></Route>
          <Route path="/settings" element={<Settings />}></Route>

          <Route path="/transactions" element={<Transactions />}></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
