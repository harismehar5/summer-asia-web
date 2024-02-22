import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ListHeader({
  firstButton,
  secondButton,
  thirdButton,
  firstButtonText,
  secondButtonText,
  thirdButtonText,
  firstLink,
  secondLink,
  thirdLink,
  header,
  handle,
  handle2,
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
            component={Link}
            to={firstLink}
            onClick={handle}
            sx={{ marginX: 1 }}
          >
            {firstButtonText}
          </Button>
        ) : null}
        {secondButton ? (
          <Button
            variant="contained"
            size="small"
            color="success"
            component={Link}
            to={secondLink}
            sx={{ marginX: 1 }}
            onClick={handle2}
          >
            {secondButtonText}
          </Button>
        ) : null}
        {thirdButton ? (
          <Button
            variant="contained"
            size="small"
            color="success"
            component={Link}
            to={thirdLink}
            sx={{ marginX: 1 }}
          >
            {thirdButtonText}
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}
