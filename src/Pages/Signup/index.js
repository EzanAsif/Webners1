import React, { useState } from "react";
import { userDataFromLocalStorage } from "../../Store/Reducers/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { setUserDataFunc } from "../../App/user";
import AuthenticationLayout from "../../Components/Layouts/AuthenticationScreen";
import {
  Backdrop,
  Button,
  CardContent,
  CircularProgress,
  IconButton,
  OutlinedInput,
  InputAdornment,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  UserSignupWithoutRefferalCode,
  UserSignupWithRefferalCode,
} from "../../Store/Reducers/AuthReducer";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = ({ muiAlert, setMuiAlert }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [refCode, setRefCode] = useState();
  const [phNum, setPhNum] = useState();

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

  const setTokenAndUser = async (token, userData, refreshToken) => {
    try {
      let userToken = await setUserDataFunc(token, userData, refreshToken);
      if (userToken) {
        let parsedUserData = JSON.parse(userToken);
        dispatch(userDataFromLocalStorage(parsedUserData));
      }
    } catch (e) {
      return e;
    }
  };

  const userSignup = (e) => {
    e.preventDefault();
    if (refCode) {
      let body = {
        name,
        email,
        password: values.password,
        phoneNo: phNum,
        referralCode: refCode,
      };
      dispatch(UserSignupWithRefferalCode(body))
        .unwrap()
        .then((res) => {
          if (res.status !== "rejected") {
            setOpen(true);
            if (res.token) {
              setOpen(false);
              setMuiAlert({
                open: true,
                alertStatus: "success",
                alertMessage: "User SignUp Success",
              });
              setTokenAndUser(res.token, res.user, res.refreshToken);
              setTimeout(() => {
                setMuiAlert({ ...muiAlert, open: false });
                // navigate("/");
              }, 4000);
            }
          } else {
            setOpen(false);
            setMuiAlert({
              open: true,
              alertStatus: "error",
              alertMessage: `User Signup error - ${res.message}`,
            });
          }
        })
        .catch((e) => {
          setOpen(false);
          setMuiAlert({
            open: true,
            alertStatus: "error",
            alertMessage: `User SignUp error - ${e.message}`,
          });
          setTimeout(() => {
            setMuiAlert({ ...muiAlert, open: false });
            // navigate("/");
          }, 4000);
          return e;
        });
    } else {
      let body = { email, password: values.password, phoneNo: phNum, name };
      dispatch(UserSignupWithoutRefferalCode(body))
        .unwrap()
        .then((res) => {
          if (res.status !== "rejected") {
            setOpen(true);
            if (res.token) {
              setOpen(false);
              setMuiAlert({
                open: true,
                alertStatus: "success",
                alertMessage: "User SignUp Success",
              });
              setTokenAndUser(res.token, res.user, res.refreshToken);
              setTimeout(() => {
                setMuiAlert({ ...muiAlert, open: false });
                // navigate("/");
              }, 4000);
            }
          } else {
            setOpen(false);
            setMuiAlert({
              open: true,
              alertStatus: "error",
              alertMessage: `User SignUp error - ${res.message}`,
            });
          }
        })
        .catch((e) => {
          setOpen(false);
          setMuiAlert({
            open: true,
            alertStatus: "error",
            alertMessage: `User SignUp error - ${e.message}`,
          });
          setTimeout(() => {
            setMuiAlert({ ...muiAlert, open: false });
            // navigate("/");
          }, 4000);
          return e;
        });
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open || auth.status == "Pending"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AuthenticationLayout>
        <CardContent className="authentication-form-container">
          <Typography
            style={{ margin: "15px 0px 15px" }}
            gutterBottom
            align="center"
            variant="h5"
          >
            SignUp
          </Typography>
          <form onSubmit={userSignup}>
            <CardContent>
              <Grid
                fullWidth={true}
                style={{ width: "100%" }}
                spacing={2}
                container
              >
                <Grid className="abc" item lg={6} md={6} sm={12}>
                  <InputLabel shrink="true">Name</InputLabel>
                  <TextField
                    required
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    InputLabelProps={"Name"}
                    id="Name"
                    variant="outlined"
                    placeholder="Enter your full name here"
                    style={{ marginBottom: "20px" }}
                    fullWidth={true}
                    size="small"
                  />
                </Grid>
                <Grid className="abc" item lg={6} md={6} sm={12}>
                  <InputLabel shrink="true">Email</InputLabel>
                  <TextField
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    InputLabelProps={"Email"}
                    id="login"
                    variant="outlined"
                    placeholder="Enter your email here"
                    style={{ marginBottom: "20px" }}
                    fullWidth={true}
                    size="small"
                  />
                </Grid>
                <Grid className="abc" item lg={6} md={6} sm={12}>
                  <InputLabel shrink="true">Password</InputLabel>
                  <OutlinedInput
                    size="small"
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    fullWidth
                    style={{ width: "100%" }}
                    placeholder="Enter your password here"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
                <Grid className="abc" item lg={6} md={6} sm={12}>
                  <InputLabel shrink="true">
                    Referral Code
                    <span style={{ fontSize: 12, marginLeft: 5 }}>
                      OPTIONAL
                    </span>
                  </InputLabel>
                  <TextField
                    onChange={(e) => setRefCode(e.target.value)}
                    id="login"
                    variant="outlined"
                    placeholder="Enter a referral code if you have one"
                    style={{ marginBottom: "20px" }}
                    fullWidth={true}
                    size="small"
                  />
                </Grid>
                <Grid className="abc" item lg={6} md={12} sm={12}>
                  <InputLabel shrink={true}>Phone Number</InputLabel>
                  <PhoneInput
                    fullWidth={true}
                    required
                    placeholder="Enter phone number"
                    // value={value}
                    onChange={(val) => {
                      setPhNum(val);
                    }}
                  />
                </Grid>
              </Grid>
              <button
                style={{
                  width: "100%",
                  border: "none",
                  background: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                <Button
                  disabled={auth.status == "Pending"}
                  size="large"
                  fullWidth={true}
                  variant="contained"
                  style={{ marginTop: "25px" }}
                >
                  Signup by email
                </Button>
              </button>
            </CardContent>
          </form>
          <Typography
            align="center"
            sx={{ fontSize: 12, margin: "0px 0px 5px" }}
            color="text.secondary"
            gutterBottom
          >
            Already an account?{" "}
            <Link to="/login" style={{ color: "#323232", fontWeight: "500" }}>
              Login
            </Link>
          </Typography>
        </CardContent>
      </AuthenticationLayout>
    </>
  );
};

export default Signup;
