import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Container,
  Typography,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";
import Btn from "../components/Btn";
import { useNavigate } from "react-router-dom";
import DistrictEnums from "../enums/districtEnums";

const Registration = (props) => {
  const fetchData = useFetch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zip, setZip] = useState("");
  const [district, setDistrict] = useState("");

  const navigate = useNavigate();

  const registerUser = async () => {
    const res = await fetchData("/auth/register", "PUT", {
      email: email,
      password: password,
      location: [
        {
          district,
          postal_code: zip,
        },
      ],
    });

    if (res.ok) {
      console.log(res.data);
      props.setUserInfo(res.data.createdUser);
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
          <Grid container alignItems="center">
            <Grid
              xs={12}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h5" textAlign="start" margin="2rem 0">
                Register for an account
              </Typography>
              <div>
                <TextField
                  label="Email"
                  variant="outlined"
                  defaultValue="test@test.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  defaultValue="test12345"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

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
                <Autocomplete
                  disablePortal
                  id="outlined-basic"
                  options={DistrictEnums}
                  inputValue={district}
                  onInputChange={(event, newInputValue) => {
                    setDistrict(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="District" />
                  )}
                />
              </div>
              <Box sx={{ display: "flex", m: "0.5rem" }}>
                {" "}
                <Btn onClick={registerUser}>Register</Btn>
                <Btn
                  isBrown={true}
                  onClick={() => {
                    navigate("/sign-in");
                  }}
                >
                  Cancel
                </Btn>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Registration;
