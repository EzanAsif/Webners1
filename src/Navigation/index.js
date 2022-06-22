import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Login,
  Signup,
  HomeScreen,
  Transactions,
  Help,
  Withdraw,
  Profile,
  PasswordVerification,
  Deposit,
  PendingTransactions,
} from "../Pages/";
import { useSelector } from "react-redux";

const OnlyAdminRoutes = ({ muiAlert, setMuiAlert }) => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/admin/pending-transactions" />} />
      <Route
        path="/admin/pending-transactions"
        element={
          <PendingTransactions muiAlert={muiAlert} setMuiAlert={setMuiAlert} />
        }
      />
    </Routes>
  );
};

const AuthenticatedRoutes = ({ muiAlert, setMuiAlert }) => {
  return (
    <Routes>
      <Route path="*" element={<>404 Page not found</>} />
      <Route
        path="/"
        element={<HomeScreen muiAlert={muiAlert} setMuiAlert={setMuiAlert} />}
      />
      <Route
        path="/transactions"
        element={<Transactions muiAlert={muiAlert} setMuiAlert={setMuiAlert} />}
      />
      <Route
        path="/help"
        element={<Help muiAlert={muiAlert} setMuiAlert={setMuiAlert} />}
      />
      <Route
        path="/profile"
        element={<Profile muiAlert={muiAlert} setMuiAlert={setMuiAlert} />}
      />
      <Route
        path="/withdraw"
        element={<Withdraw muiAlert={muiAlert} setMuiAlert={setMuiAlert} />}
      />
      <Route
        path="/deposit"
        element={<Deposit muiAlert={muiAlert} setMuiAlert={setMuiAlert} />}
      />
      <Route
        path="/verify-password"
        element={
          <PasswordVerification muiAlert={muiAlert} setMuiAlert={setMuiAlert} />
        }
      />
      {/* REDIRECTING */}
      <Route path="/login" element={<Navigate to="/" />} />
      <Route path="/signup" element={<Navigate to="/" />} />
    </Routes>
  );
};

const NonAuthenticatedRoutes = ({ muiAlert, setMuiAlert }) => {
  return (
    <Routes>
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
    </Routes>
  );
};

const AppRoutes = ({ muiAlert, setMuiAlert }) => {
  const reducerData = useSelector((state) => state);
  const { auth } = reducerData;

  return (
    <>
      {auth.userData && auth.userData.token ? (
        // right now the logic is inversed because not getting proper response from API
        auth.userData.user.isAdmin ? (
          <OnlyAdminRoutes muiAlert={muiAlert} setMuiAlert={setMuiAlert} />
        ) : (
          <AuthenticatedRoutes muiAlert={muiAlert} setMuiAlert={setMuiAlert} />
        )
      ) : (
        // <OnlyAdminRoutes muiAlert={muiAlert}  setMuiAlert={setMuiAlert} />
        <NonAuthenticatedRoutes muiAlert={muiAlert} setMuiAlert={setMuiAlert} />
      )}
    </>
  );
};

export default AppRoutes;
