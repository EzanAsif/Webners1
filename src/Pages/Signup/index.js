import React, { useState } from "react";
import { userDataFromLocalStorage } from "../../Store/Reducers/AuthReducer";
import { useDispatch } from "react-redux";
import { setUserDataFunc } from "../../App/user";
import AuthenticationLayout from "../../Components/Layouts/AuthenticationScreen";
import {
  Button,
  CardContent,
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

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [refCode, setRefCode] = useState();
  const [phNum, setPhNum] = useState();

  const setToken = async (value) => {
    try {
      const v = {
        token: value,
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

  const userSignup = (e) => {
    e.preventDefault();
    if (refCode) {
      let body = { email, password, refCode, phNum };
      dispatch(UserSignupWithRefferalCode(body))
        .unwrap()
        .then((res) => {
          alert("signed up");
          console.log(res);
        })
        .catch((e) => {
          alert(e);
          console.log(e);
        });
    } else {
      let body = { email, password, phNum };
      console.log(body, "body");
      dispatch(UserSignupWithoutRefferalCode(body))
        .unwrap()
        .then((res) => {
          alert("signed up");
          console.log(res);
          // navigate("/");
        })
        .catch((e) => {
          alert(e);
          console.log(e);
        });
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
        <form onSubmit={userSignup}>
          <CardContent>
            <>
              <div>
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
              </div>
              <div>
                <InputLabel shrink="true">Password</InputLabel>
                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
                <InputLabel shrink="true">
                  Referral Code
                  <span style={{ fontSize: 12, marginLeft: 5 }}>OPTIONAL</span>
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
              </div>
              <div>
                <InputLabel shrink={true}>Phone Number</InputLabel>
                <PhoneInput
                  required
                  placeholder="Enter phone number"
                  // value={value}
                  onChange={(val) => {
                    setPhNum(val);
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
