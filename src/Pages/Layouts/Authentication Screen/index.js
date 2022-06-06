import { AppBar, Container, Toolbar, Typography, Card } from "@mui/material";
import React from "react";
import AppLogo from "../../../Assets/logo-sams-club.jpeg";
import "./styles.css";
const AuthenticationLayout = ({ children }) => {
  return (
    <div className="authentication-layout-container">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src={AppLogo} width={50} height={50} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Card variant="outlined">{children}</Card>

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
