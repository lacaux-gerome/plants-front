import React from "react";
import { Typography, Link } from "@material-ui/core";

export const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    Copyright ©
    <Link color="inherit" href="">
      Plants by Alicoin et Geromu
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);
