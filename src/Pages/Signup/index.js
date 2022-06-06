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

const Signup = () => {
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
      <CardContent className="authentication-form-container">
        <Typography
          style={{ margin: "15px 0px 15px" }}
          gutterBottom
          align="center"
          variant="h5"
        >
          SignUp
        </Typography>
        <Typography
          align="center"
          sx={{ fontSize: 12, margin: "5px 0px 0px 0px" }}
          color="text.secondary"
          gutterBottom
        >
          loremLaboris velit nostrud id et velit consectetur aliquip
          exercitation.
        </Typography>
        {/* <CardActions
          style={{ margin: "15px 0px" }}
          className="authentication-form-container"
        > */}
        <CardContent>
          <Button
            style={{ fontSize: 12, marginTop: "5px" }}
            fullWidth={true}
            variant="contained"
            onClick={setToken}
            size="large"
          >
            Signup with a referral code
          </Button>
          <Typography
            align="center"
            style={{ fontSize: 12, marginTop: "15px" }}
            color="text.secondary"
            gutterBottom
          >
            OR
          </Typography>
          <div>
            <InputLabel shrink="true">Email</InputLabel>
            <TextField
              InputLabelProps={"Email"}
              id="login"
              variant="outlined"
              placeholder="Enter your email here"
              style={{ marginBottom: "20px" }}
              fullWidth={true}
            />
          </div>
          <div>
            <InputLabel shrink="true">Password</InputLabel>
            <TextField
              InputLabelProps={"Email"}
              id="Signup"
              variant="outlined"
              placeholder="Enter your password here"
              style={{ marginBottom: "20px" }}
              fullWidth={true}
            />
          </div>
          <Button
            size="large"
            fullWidth={true}
            variant="outlined"
            onClick={setToken}
          >
            Signup with email
          </Button>
        </CardContent>
        {/* </CardActions> */}
        <Typography
          align="center"
          sx={{ fontSize: 12, margin: "5px 0px" }}
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
  );
};

export default Signup;
