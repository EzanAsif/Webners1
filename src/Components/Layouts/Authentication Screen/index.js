import { AppBar, Container, Toolbar, Typography, Card } from "@mui/material";
import React from "react";
import AppLogo from "../../../Assets/logo-sams-club.jpeg";
import "./styles.css";
const AuthenticationLayout = ({ children }) => {
  return (
    <div className="authentication-layout-container">
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

      <Card className="auth-mui-card" variant="outlined">
        {children}
      </Card>

      <footer className="authentication-footer">
        <img
          width={15}
          src="https://img.icons8.com/material-outlined/2x/creative-commons.png"
          style={{ borderRadius: 100 }}
        />
        CopyRight XYZ
      </footer>
    </div>
  );
};

export default AuthenticationLayout;
