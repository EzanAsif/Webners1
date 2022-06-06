import React from "react";
import { userDataFromLocalStorage } from "../../Store/Reducers/AuthReducer";
import { useDispatch } from "react-redux";
import { setUserDataFunc } from "../../App/user";
import AuthenticationLayout from "../Layouts/Authentication Screen";
import {
  Button,
  CardActions,
  CardContent,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const setToken = async (value) => {
    try {
      const v = {
        userId: "5555-1275673-123123-3145",
      };
      let userToken = await setUserDataFunc(v);
      if (userToken) {
        let parsedUserData = JSON.parse(userToken);
        dispatch(userDataFromLocalStorage(parsedUserData));
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AuthenticationLayout>
      <CardContent className=" auth-mui-card">
        <Typography gutterBottom align="center" variant="h5">
          Login
        </Typography>
        <div style={{ margin: "20px 0px" }}>
          <InputLabel shrink="true" margin="dense">
            Email
          </InputLabel>
          <TextField
            InputLabelProps={"Email"}
            id="login"
            variant="outlined"
            placeholder="Enter your email here"
            margin="normal"
            size="small"
          />
        </div>
        <div style={{ margin: "0px 0px 20px" }}>
          <InputLabel shrink="true" margin="dense">
            Password
          </InputLabel>
          <TextField
            InputLabelProps={"Email"}
            id="Signup"
            variant="outlined"
            placeholder="Enter your password here"
            margin="dense"
            size="small"
          />
        </div>
        <CardActions>
          <Button
            size="large"
            fullWidth={true}
            variant="contained"
            onClick={setToken}
          >
            Login
          </Button>
        </CardActions>
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
