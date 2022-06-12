import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "../../Components/Layouts/AppLayout";
import CtaBtn from "../../Components/CtaBtn";
import { useNavigate } from "react-router-dom";
import { getUserDataFunc } from "../../App/user";
import {
  Backdrop,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import "./styles.css";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

const Withdraw = ({ setMuiAlert, muiAlert }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open && auth.status == "Pending"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AppLayout hideHeaderFooter={true}>
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
              <TextField
                onChange={(value) => {
                  console.log(value);
                }}
                name="numberformat"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </div>
            <CtaBtn
              label={"Withdraw"}
              variant="contained"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export default Withdraw;
