import { Button } from "@mui/material";
import React from "react";

const index = ({
  className = "",
  label,
  variant,
  onClickFunc,
  style,
  size = "large",
  isFullWidth = true,
  color = "primary",
}) => {
  return (
    <Button
      color={color}
      className={className}
      size={size}
      fullWidth={isFullWidth}
      variant={variant}
      onClick={onClickFunc}
      sx={style}
    >
      {label}
    </Button>
  );
};

export default index;
