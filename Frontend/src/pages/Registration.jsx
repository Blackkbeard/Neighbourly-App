import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Typography, Box, TextField } from "@mui/material";
import Btn from "../components/Btn";

const Registration = () => {
  const fetchData = useFetch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    const res = await fetchData("/auth/register", "PUT", {
      email,
      password,
    });

    if (res.ok) {
      setEmail("");
      setPassword("");
      props.setShowLogin(true);
    } else {
      console.log(res.data);
    }
  };

  return (
    <>
      <TopBar></TopBar>

      <Container maxWidth="lg">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 3, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container>
            <Grid
              xs={12}
              style={{ borderStyle: "solid" }}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography textAlign="center">
                Register For an Account
              </Typography>
              <div>
                <TextField
                  label="Required"
                  variant="outlined"
                  defaultValue="Email"
                />
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Required"
                  variant="outlined"
                  defaultValue="Password"
                  multiline
                />
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Required"
                  variant="outlined"
                  defaultValue="Confirm Password"
                />
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Zip Code"
                  variant="outlined"
                  defaultValue="Enter Your Location"
                />
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Required"
                  variant="outlined"
                  defaultValue="District"
                />
              </div>
              <Btn onClick={registerUser}>Register</Btn>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Registration;
