import React from "react";
import { useSelector } from "react-redux";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import AppLogo from "../../../Assets/logo-sams-club.jpeg";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.css";

const AppWrapper = ({ children }) => {
  return <div className="App-wrapper">{children}</div>;
};

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector((state) => state);

  console.log(location, location.pathname, "location");
  const [value, setValue] = React.useState(
    location && location.pathname == "/" ? "home" : location.pathname.slice(1)
  );
  console.log(value, "value");

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
      <AppBar style={{ backgroundColor: "#f6f6f6" }} position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src={AppLogo} width={50} height={50} />
            <Typography
              variant="h6"
              sx={{
                mr: 6,
                width: "-webkit-fill-available",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#141414",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Sam's Club
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <AppWrapper>{children}</AppWrapper>
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
            console.log(e);
          }}
          icon={<ReceiptIcon size={20} />}
        />
        <BottomNavigationAction
          label="Help"
          value="help"
          icon={<HelpIcon size={35} />}
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
