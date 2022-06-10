import { Button } from "@mui/material";
import React from "react";

const index = ({
  className = "",
  label,
  variant,
  onClickFunc,
  style,
  size = "large",
}) => {
  return (
    <Button
      className={className}
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
