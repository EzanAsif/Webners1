import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "../../Components/Layouts/AppLayout";
import CtaBtn from "../../Components/CtaBtn";
import { useNavigate } from "react-router-dom";
import { getUserDataFunc } from "../../App/user";
import {
  Backdrop,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import "./styles.css";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

const Withdraw = ({ setMuiAlert, muiAlert }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const { auth } = useSelector((state) => state);

  const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
    props,
    ref
  ) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          console.log(values, props, "values, props");
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        // prefix="$"
      />
    );
  });

  NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  console.log(amount);

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
                  navigate("/");
                }}
              />
            </div>
            <div className="page-heading">Withdraw</div>
          </div>
          <div className="amount-input-div">
            <Typography align="center" sx={{ color: "text.primary" }}>
              Enter amount to withdraw
            </Typography>
            <div style={{ margin: "50px 0px" }}>
              <CurrencyTextField
                className="currency-input"
                variant="standard"
                value={amount}
                currencySymbol="$"
                minimumValue="0"
                outputFormat="number"
                decimalCharacter="."
                digitGroupSeparator=","
                onChange={(event, value) => {
                  if (value > 10) {
                    setAmount(value);
                  }
                }}
              />
            </div>
            <Button
              size="large"
              onClick={() => {
                navigate("/verify-password");
              }}
              disabled={!amount}
              variant="contained"
              fullWidth
            >
              Withdraw
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdraw;
