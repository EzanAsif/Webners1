import React, { useState, useEffect, useSelector } from "react";
import { userDataFromLocalStorage } from "../../Store/Reducers/AuthReducer";
import { useDispatch } from "react-redux";
import { setUserDataFunc } from "../../App/user";
import AuthenticationLayout from "../../Components/Layouts/AuthenticationScreen";
import {
  Button,
  CardActions,
  CardContent,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../../Store/Reducers/AuthReducer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userTokenAfterApiCall, setUserTokenAfterApiCall] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // useEffect(() => {}, []);

  const setToken = async (value) => {
    try {
      let userToken = await setUserDataFunc(value);
      if (userToken) {
        let parsedUserData = JSON.parse(userToken);
        console.log(parsedUserData);
        dispatch(userDataFromLocalStorage(parsedUserData));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const userLoginFunc = (e) => {
    e.preventDefault();
    let body = { email, password };
    dispatch(UserLogin(body))
      .unwrap()
      .then((res) => {
        console.log(res);
        alert("User Logged In");
        setToken(res.token);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        alert("error");
      });
  };

  return (
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
  );
};

export default Login;
