import React, { useState, useEffect } from "react";
import {
  userDataFromLocalStorage,
  RefreshToken,
} from "../../Store/Reducers/AuthReducer";
import { GetTransactions } from "../../Store/Reducers/Transactions";
import { useDispatch, useSelector } from "react-redux";
import { setUserDataFunc } from "../../App/user";
import AuthenticationLayout from "../../Components/Layouts/AuthenticationScreen";
import {
  Backdrop,
  Button,
  CardActions,
  CardContent,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../../Store/Reducers/AuthReducer";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = ({ setMuiAlert, muiAlert }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    showPassword: false,
  });

  const newTokenFetchForTransaction = (dateTime) => {
    dispatch(
      RefreshToken({
        refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
      })
    )
      .unwrap()
      .then((res) => {
        let newRefreshToken = res.token;
        newRefreshToken = JSON.stringify(newRefreshToken);
        localStorage.setItem("token", newRefreshToken);
        dispatch(GetTransactions());
      })
      .catch((e) => {
        return e;
      });
  };
  const userLoginFunc = (e) => {
    e.preventDefault();
    let body = { email, password: values.password };

    setOpen(true);

    dispatch(UserLogin(body))
      .unwrap()
      .then((res) => {
        if (res.status !== "rejected") {
          setOpen(false);
          setMuiAlert({
            open: true,
            alertStatus: "success",
            alertMessage: "User Loggedin Success",
          });
          dispatch(GetTransactions())
            .then((result) => {
              let { payload } = result;
              let res = payload;
              if (res.status == "rejected") {
                if (res.message == "Auth failed") {
                  newTokenFetchForTransaction();
                }
              } else {
                return res;
              }
            })
            .catch((e) => {
              return e;
            });
          setTokenAndUser(res.token, res.user, res.refreshToken);
          setTimeout(() => {
            setMuiAlert({ ...muiAlert, open: false });
            // navigate("/");
          }, 4000);
        } else {
          setOpen(false);
          setMuiAlert({
            open: true,
            alertStatus: "error",
            alertMessage: `User Login Failed - ${res.message}`,
          });
          setTimeout(() => {
            setMuiAlert({ ...muiAlert, open: false });
            // navigate("/");
          }, 4000);
        }
      })
      .catch((e) => {
        setOpen(false);
        return e;
        if (e.message == "Request failed with status code 401") {
          setMuiAlert({
            open: true,
            alertStatus: "error",
            alertMessage: `User Login Failed - Invalid user name or password`,
          });
        } else {
          setMuiAlert({
            open: true,
            alertStatus: "error",
            alertMessage: `User Login Failed - ${auth.error}`,
          });
        }

        setTimeout(() => {
          setMuiAlert({ ...muiAlert, open: false });
        }, 2000);
      });
  };

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
      <AuthenticationLayout>
        <CardContent>
          <Typography gutterBottom align="center" variant="h5">
            Login
          </Typography>
          <form onSubmit={userLoginFunc}>
            <>
              <div style={{ margin: "20px 0px" }}>
                <InputLabel shrink="true" margin="dense">
                  Email
                </InputLabel>
                <TextField
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  InputLabelProps={"Email"}
                  id="login"
                  variant="outlined"
                  placeholder="Enter your email here"
                  margin="normal"
                  size="small"
                  fullWidth={true}
                />
              </div>
              <div style={{ margin: "0px 0px 20px" }}>
                <InputLabel shrink="true" margin="dense">
                  Password
                </InputLabel>
                <OutlinedInput
                  size="small"
                  id="outlined-adornment-password"
                  fullWidth
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
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>
            </>
            <CardActions>
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
                  // onClick={setToken}
                >
                  Login
                </Button>
              </button>
            </CardActions>
          </form>
          <Typography
            align="center"
            sx={{ fontSize: 12, marginTop: "5px" }}
            color="text.secondary"
            gutterBottom
          >
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#323232", fontWeight: "500" }}>
              SignUp
            </Link>
          </Typography>
        </CardContent>
      </AuthenticationLayout>
    </>
  );
};

export default Login;
