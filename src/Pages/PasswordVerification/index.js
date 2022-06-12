import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDataFunc } from "../../App/user";
import {
  Backdrop,
  Button,
  CircularProgress,
  InputAdornment,
  Typography,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordVerification = ({ setMuiAlert, muiAlert }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open && auth.status == "Pending"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="App-wrapper">
        <div className="withdraw-deposit-page">
          <div className="withdraw-deposit-header">
            <div className="back-icon">
              <ArrowBackRoundedIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/withdraw");
                }}
              />
            </div>
            <div className="page-heading">Verify Password</div>
          </div>
          <div className="amount-input-div">
            <Typography align="center" sx={{ color: "text.primary" }}>
              Please Verify Your Password
            </Typography>
            <div style={{ margin: "50px 0px" }}>
              <OutlinedInput
                size="small"
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                placeholder="Enter your password here"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            <Button
              disabled={!values.password.length}
              size="large"
              variant="contained"
              fullWidth
            >
              Verify
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordVerification;
