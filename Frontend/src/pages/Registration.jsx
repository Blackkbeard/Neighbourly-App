import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Typography, Box, TextField } from "@mui/material";
import Btn from "../components/Btn";
import { useNavigate } from "react-router-dom";

const Registration = (props) => {
  const fetchData = useFetch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zip, setZip] = useState("");
  const [district, setDistrict] = useState("");

  const navigate = useNavigate();

  const registerUser = async () => {
    const res = await fetchData("/auth/register", "PUT", {
      email,
      password,
      zip,
      district,
    });

    if (res.ok) {
      props.setUserInfo(res.data.createdUser);
      setEmail("");
      setPassword("");
      setZip("");
      setDistrict("");
      navigate("/profile-setup");
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
                  defaultValue="test@test.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Required"
                  variant="outlined"
                  defaultValue="test12345"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* <div>
                <TextField
                  id="outlined-basic"
                  label="Required"
                  variant="outlined"
                  defaultValue="Confirm Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div> */}
              <div>
                <TextField
                  id="outlined-basic"
                  label="Zip Code"
                  variant="outlined"
                  defaultValue="760758"
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Required"
                  variant="outlined"
                  defaultValue="Yishun"
                  onChange={(e) => setDistrict(e.target.value)}
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
