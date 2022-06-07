import React from "react";
import { userDataFromLocalStorage } from "../../Store/Reducers/AuthReducer";
import { useDispatch } from "react-redux";
import { setUserDataFunc } from "../../App/user";
import AuthenticationLayout from "../../Components/Layouts/Authentication Screen";
import {
  Button,
  CardContent,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

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
        <form
          onSubmit={(e) => {
            alert("form submitted");
            e.preventDefault();
            setToken();
          }}
        >
          <CardContent>
            <>
              <div>
                <InputLabel shrink={true}>Email</InputLabel>
                <TextField
                  InputLabelProps={"Email"}
                  id="login"
                  variant="outlined"
                  placeholder="Enter your email here"
                  style={{ marginBottom: "20px" }}
                  fullWidth={true}
                  size="small"
                />
              </div>
              <div>
                <InputLabel shrink={true}>Password</InputLabel>
                <TextField
                  InputLabelProps={"Email"}
                  id="Signup"
                  variant="outlined"
                  placeholder="Enter your password here"
                  style={{ marginBottom: "20px" }}
                  fullWidth={true}
                  size="small"
                />
              </div>
              <div>
                <InputLabel shrink={true}>
                  Referral Code
                  <span style={{ fontSize: 12, marginLeft: 5 }}>OPTIONAL</span>
                </InputLabel>
                <TextField
                  InputLabelProps={"Email"}
                  id="login"
                  variant="outlined"
                  placeholder="Enter a referral code if you have one"
                  style={{ marginBottom: "20px" }}
                  fullWidth={true}
                  size="small"
                />
              </div>
              <div>
                <InputLabel shrink={true}>Phone Number</InputLabel>
                <PhoneInput
                  placeholder="Enter phone number"
                  // value={value}
                  onChange={(val) => {
                    console.log(val);
                  }}
                />
              </div>
            </>
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
  );
};

export default Signup;
