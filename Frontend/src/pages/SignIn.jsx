import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Typography, Box, TextField } from "@mui/material";
import Btn from "../components/Btn";
import UserContext from "../context/user";

const SignIn = (props) => {
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetchData = useFetch();
  const handleLogin = async () => {
    const res = await fetchData("/auth/login", "POST", { email, password });
    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      const decoded = jwtDecode(res.data.access);
      userCtx.setRole(decoded.role);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  return (
    <>
      <TopBar></TopBar>

      <Container maxWidth="lg">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container>
            <Grid xs={7} style={{ borderStyle: "solid" }}>
              <Typography textAlign="center">Sign-in</Typography>
            </Grid>
            <Grid xs={5} style={{ borderStyle: "solid" }}>
              <Typography textAlign="center">Sign-in</Typography>
              <TextField
                id="outlined-basic"
                label="Required"
                variant="outlined"
                defaultValue="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Required"
                variant="outlined"
                defaultValue="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Btn onClick={() => props.setShowLogin()}>Login</Btn>
              <Btn isBrown={true} width={15}>
                Cancel
              </Btn>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
