import React, { useState, useEffect } from "react";
import { userDataFromLocalStorage } from "../../Store/Reducers/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { setUserDataFunc } from "../../App/user";
import AuthenticationLayout from "../../Components/Layouts/AuthenticationScreen";
import {
  Backdrop,
  Button,
  CardActions,
  CardContent,
  CircularProgress,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../../Store/Reducers/AuthReducer";

const Login = ({ setMuiAlert, muiAlert }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // useEffect(() => {}, []);

  const setTokenAndUser = async (token, userData) => {
    try {
      let userToken = await setUserDataFunc(token, userData);
      if (userToken) {
        let parsedUserData = JSON.parse(userToken);
        console.log(parsedUserData);
        dispatch(userDataFromLocalStorage(parsedUserData));
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(muiAlert);
  const userLoginFunc = (e) => {
    e.preventDefault();
    let body = { email, password };

    setOpen(true);

    dispatch(UserLogin(body))
      .unwrap()
      .then((res) => {
        console.log(res);
        setOpen(false);
        setMuiAlert({
          open: true,
          alertStatus: "success",
          alertMessage: "User Loggedin Success",
        });
        setTokenAndUser(res.token, res.user);
        setTimeout(() => {
          setMuiAlert({ ...muiAlert, open: false });
          // navigate("/");
        }, 4000);
      })
      .catch((e) => {
        console.log(e);
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
                <TextField
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  id="Signup"
                  variant="outlined"
                  placeholder="Enter your password here"
                  margin="dense"
                  size="small"
                  fullWidth={true}
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
