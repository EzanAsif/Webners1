import { Button } from "@mui/material";
import React from "react";
import "./styles.css";

const index = ({ label, variant, onClickFunc, style, size = "large" }) => {
  return (
    <Button
      size={size}
      fullWidth={true}
      variant={variant}
      onClick={onClickFunc}
      sx={style}
    >
      {label}
    </Button>
  );
};

export default index;
