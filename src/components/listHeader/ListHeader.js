import { Box, Button, Typography } from "@mui/material";
import React from "react";

export default function ListHeader({
  firstButton,
  secondButton,
  thirdButton,
  firstButtonText,
  secondButtonText,
  thirdButtonText,
  header,
}) {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={4}
      py={2}
    >
      <Typography variant="h5">{header}</Typography>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {firstButton ? (
          <Button
            variant="contained"
            size="small"
            color="success"
            onClick={() => console.log("Hello")}
          >
            {firstButtonText}
          </Button>
        ) : null}
        {secondButton ? (
          <Button
            variant="contained"
            size="small"
            color="success"
            onClick={() => console.log("Hello")}
          >
            {secondButtonText}
          </Button>
        ) : null}
        {thirdButton ? (
          <Button
            variant="contained"
            size="small"
            color="success"
            onClick={() => console.log("Hello")}
          >
            {thirdButtonText}
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}
