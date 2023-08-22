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
import Carousel from "react-material-ui-carousel";
import CarouselItem from "../components/CarouselItem";

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

  const carouselItems = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      image_src: "public/homepage/1.png",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      image_src: "public/homepage/2.png",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      image_src: "public/homepage/3.png",
    },
  ];

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
              xs={6}
              justifyContent="center"
              style={{ borderStyle: "solid" }}
            >
              <Carousel>
                {carouselItems.map((item, i) => (
                  <CarouselItem key={i} item={item} />
                ))}
              </Carousel>
            </Grid>
            <Grid
              xs={6}
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

              <Btn onClick={registerUser}>Register</Btn>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Registration;
