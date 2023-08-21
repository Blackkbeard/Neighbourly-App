import React, { useContext, useEffect, useState } from "react";
// import useFetch from "../hooks/useFetch";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import Btn from "../components/Btn";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Link,
  TextField,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";

const ProfileSetup = (props) => {
  // const navigate = useNavigate();
  // const fetchData = useFetch();
  // const userCtx = useContext(UserContext);
  // // const [dispName, setDispName] = useState("");
  // // const [bio, setBio] = useState("");
  // // const [number, setNumber] = useState("");

  // const dispNameRef = useRef("");
  // const bioRef = useRef("");
  // const numberRef = useRef("");

  // const updateUser = async (id) => {
  //   const res = await fetchData("/auth/update" + id, "patch", {
  //     dispName: dispNameRef.current.value,
  //     bio: bioRef.current.value,
  //     number: numberRef.current.value,
  //   });

  //   if (res.ok) {
  //     // setDispName("");
  //     // setBio("");
  //     // setNumber("");
  //     navigate("/profile");
  //     props.getProfile;
  //   } else {
  //     console.log(res.data);
  //   }
  // };
  // useEffect(() => { dispName: dispNameRef.current.value,
  //     bio: bioRef.current.value,
  //     number: numberRef.current.value, } , []);
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
                Welcome To The Neighbourhood!!
              </Typography>
              <Avatar
                alt=""
                src="https://seeklogo.com/images/G/general-assembly-logo-D5C634F07A-seeklogo.com.png"
                sx={{ width: 180, height: 180 }}
              />
              <TextField
                id="outlined-basic"
                label="Required"
                variant="outlined"
                defaultValue="vinesh"
                // onChange={(e) => setDispName(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Biography"
                variant="outlined"
                defaultValue="run"
                // onChange={(e) => setBio(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                defaultValue="98879870"
                // onChange={(e) => setEmail(e.target.value)}
              />
              <Btn onClick={updateUser}>Update</Btn>
              <Link underline="always">Skip for Now</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ProfileSetup;
