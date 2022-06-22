import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import AppLogo from "../../../Assets/logo-sams-club.jpeg";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import HelpIcon from "@mui/icons-material/Help";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useNavigate, useLocation } from "react-router-dom";
import Web3 from "web3";
import "./styles.css";
import CtaBtn from "../../CtaBtn";
import {
  disableLoading,
  enableLoading,
  fillOutState,
  fillUpState,
} from "../../../Store/Reducers/MetamaskAccount";
import AppHeader from "../../AppHeader/AppHeader";

const AppWrapper = ({ children, hideHeaderFooter = false }) => {
  return (
    <div
      className={`App-wrapper ${!hideHeaderFooter ? "" : "hideHeaderFooter"}`}
    >
      {children}
    </div>
  );
};

const AppLayout = ({ children, hideHeaderFooter = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(
    location && location.pathname === "/" ? "home" : location.pathname.slice(1)
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue !== "home") {
      navigate(`/${newValue}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <AppHeader />
      <AppWrapper hideHeaderFooter={hideHeaderFooter}>{children}</AppWrapper>
      <BottomNavigation
        // sx={{ width: 500 }}
        fullWidth={true}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<HomeIcon size={20} />}
        />
        <BottomNavigationAction
          label="Transactions"
          value="transactions"
          onClick={(e) => {
            return e;
          }}
          icon={<ReceiptIcon size={20} />}
        />
        <BottomNavigationAction
          label="Help"
          value="help"
          icon={<HelpIcon size={35} />}
        />
        {auth.userData.user.type == "admin" ? (
          <BottomNavigationAction
            label="Pending Transactions"
            value="pending-transactions"
            icon={<PendingActionsIcon size={25} />}
          />
        ) : null}
        <BottomNavigationAction
          label="Pending"
          value="admin/pending-transactions"
          icon={<PendingActionsIcon size={25} />}
        />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<AccountCircleIcon size={25} />}
        />
      </BottomNavigation>
    </div>
  );
};

export { AppLayout, AppWrapper };
