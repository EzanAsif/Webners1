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

const AppRoutes = ({ muiAlert, setMuiAlert }) => {
  const reducerData = useSelector((state) => state);
  const { auth } = reducerData;

  return (
    <Routes>
      {auth.userData && auth.userData.token ? (
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
          <Route
            path="/login"
            element={<Login muiAlert={muiAlert} setMuiAlert={setMuiAlert} />}
          />
          <Route
            path="/signup"
            element={<Signup muiAlert={muiAlert} setMuiAlert={setMuiAlert} />}
          />
          {/* Redirecting */}
          <Route path="/" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
