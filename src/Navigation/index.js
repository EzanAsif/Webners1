import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Login,
  DemoScreen,
  Signup,
  HomeScreen,
  Transactions,
  Help,
  Profile,
} from "../Pages/";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const reducerData = useSelector((state) => state);
  const { auth } = reducerData;
  const [userData, setUserData] = React.useState({});

  React.useEffect(() => {
    if (auth.userData && auth.userData.userId) {
      setUserData(auth.userData);
    } else {
      setUserData(null);
    }
  }, [auth]);

  return (
    <Routes>
      {userData && userData.userId ? (
        <>
          <Route path="*" element={<>404 Page not found</>} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          {/* REDIRECTING */}
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/signup" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="*" element={<>404 Page not found</>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          {/* Redirecting */}
          <Route path="/" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
