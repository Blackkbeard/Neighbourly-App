import React from "react";
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

const ProfileSetup = () => {
  // const fetchData = useFetch();
  // const userCtx = useContext(UserContext);
  // const [dispName, setDispName] = useRef("");
  // const [bio, setBio] = useRef("");
  // const [number, setNumber] = useRef("");

  // const updateUser = async (id) => {
  //   const res = await fetchData("/auth/update" + id, "patch", {
  //     dispName: dispName.current.value,
  //     bio: bio.current.value,
  //     number: number.current.value,

  //   });

  //   if (res.ok) {
  //     setEmail("");
  //     setPassword("");
  //     props.setShowLogin(true);
  //   } else {
  //     console.log(res.data);
  //   }
  // };

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
                defaultValue="Display Name"
                // onChange={(e) => setDispName(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Biography"
                variant="outlined"
                defaultValue="Intrests & Hobbies"
                // onChange={(e) => setBio(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                defaultValue="Mobile Number"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Btn>Update</Btn>
              <Link underline="always">Skip for Now</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ProfileSetup;
