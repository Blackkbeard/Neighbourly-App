import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import Btn from "../components/Btn";
import UserContext from "../context/user";
import { Container, Typography, Box, Link, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProfileSetup = (props) => {
  const navigate = useNavigate();
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [dispName, setDispName] = useState("");
  const [bio, setBio] = useState("");
  const [number, setNumber] = useState("");

  const skipUpdate = async () => {
    navigate("/sign-in");
  };

  const updateUser = async (id) => {
    const requestBody = {
      display_name: dispName,
      biography: bio,
      mobile_number: number,

      // dispName: dispNameRef.current.value,
      // bio: bioRef.current.value,
      // number: numberRef.current.value,
    };
    const res = await fetchData(
      "/auth/update/" + id,
      "PATCH",
      requestBody,
      userCtx.accessToken
    );

    if (res.ok) {
      console.log(res.data);
      navigate("/sign-in");
    } else {
      alert(JSON.stringify(res.data));
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
          alignItems="center"
        >
          <Grid container>
            <Grid
              xs={12}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h5" textAlign="start" margin="2rem 0">
                Welcome To The Neighbourhood!
              </Typography>

              <Typography variant="subtitle" textAlign="start" margin="1rem 0">
                Update your public profile:
              </Typography>
              <TextField
                id="outlined-basic"
                label="Display Name"
                variant="outlined"
                defaultValue={`${userCtx.userInfo?.email}`}
                onChange={(e) => setDispName(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Biography"
                variant="outlined"
                defaultValue={userCtx.userInfo?.bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                defaultValue={userCtx.userInfo?.mobile_number}
                // defaultValue="number"
                onChange={(e) => setNumber(e.target.value)}
              />
              <Btn
                onClick={() => {
                  updateUser(props.userInfo._id);
                }}
              >
                Update
              </Btn>
              <Typography
                variant="subtitle"
                textAlign="start"
                margin="1rem 0"
                sx={{ fontSize: "12px" }}
              >
                <Link onClick={skipUpdate} underline="always">
                  Skip for Now
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ProfileSetup;
