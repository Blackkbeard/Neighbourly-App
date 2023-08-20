import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Link,
} from "@mui/material";
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
            <Grid
              xs={5}
              style={{ borderStyle: "solid" }}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
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
              <Link>No Account? Create Account</Link>
              <Button variant="text">No Account? Create Account</Button>
              <Btn variant="text" onClick={handleLogin}>
                Sign In
              </Btn>
              {/* <Btn isBrown={true} width={15}>
                Cancel
              </Btn> */}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
