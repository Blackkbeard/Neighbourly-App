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
  Avatar,
} from "@mui/material";
import Btn from "../components/Btn";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";
const SignIn = (props) => {
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetchData = useFetch();
  const handleLogin = async () => {
    const res = await fetchData("/auth/login", "POST", { email, password });
    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      navigate("/Profile");
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
              <Avatar
                alt=""
                src="https://seeklogo.com/images/G/general-assembly-logo-D5C634F07A-seeklogo.com.png"
                sx={{ width: 600, height: 600 }}
                display="flex"
                justifycontent="center"
              />
            </Grid>
            <Grid
              xs={5}
              style={{ borderStyle: "solid" }}
              container
              direction="column"
              justifycontent="center"
              alignItems="center"
            >
              <Typography textAlign="center">Sign-in</Typography>
              <TextField
                id="outlined-basic"
                label="Required"
                variant="outlined"
                defaultValue="test@test.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Required"
                variant="outlined"
                defaultValue="test1234"
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
