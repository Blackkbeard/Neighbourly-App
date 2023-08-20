import React from "react";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Typography, Box } from "@mui/material";

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
        <Box>
          <Grid container>
            <Grid xs={12} style={{ borderStyle: "solid" }}>
              <Typography textAlign="center">Registration</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Registration;
