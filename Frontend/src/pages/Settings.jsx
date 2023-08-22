import React, { useContext, useState } from "react";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Typography, Box, Avatar } from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const Settings = (props) => {
  const userCtx = useContext(UserContext);
  const userFullInfo = userCtx.userInfo;
  const fetchData = useFetch();
  const [fullInfo, setFullInfo] = useState([]);

  const getUserFullInfo = async () => {
    const res = await fetchData(
      "/auth/accounts/" + id,
      "GET",

      userFullInfo
    );
    console.log(userFullInfo);
    if (res.ok) {
      setFullInfo(res.data);
    } else {
      console.log(res.data);
    }
  };
  return (
    <>
      <TopBar showBurger={true}></TopBar>

      <Container maxWidth="lg">
        <Box>
          <Grid container>
            <Grid xs={3}>
              <Typography textAlign="center">Account Settings</Typography>
              <Avatar
                alt=""
                src="https://seeklogo.com/images/G/general-assembly-logo-D5C634F07A-seeklogo.com.png"
                sx={{ width: 150, height: 150 }}
                display="flex"
                justifycontent="center"
              ></Avatar>
            </Grid>
            <Grid xs={9}>
              <Typography textAlign="center">Account Settings</Typography>
              <Box xs={2}>
                Name :
                <Typography gutterBottom variant="h6">
                  {userCtx.userInfo.display_name}
                </Typography>
              </Box>
              <Box xs={2}>
                Email:
                <Typography gutterBottom variant="h6">
                  {userCtx.userInfo.email}
                </Typography>
              </Box>
              <Box xs={2}>
                Biography :
                <Typography gutterBottom variant="h6">
                  {userCtx.userInfo.biography}
                </Typography>
              </Box>
              <Box xs={2}>
                Mobile Number :
                <Typography gutterBottom variant="h6">
                  {userCtx.userInfo.mobile_number}
                </Typography>
              </Box>
              <Box xs={2}>
                Locations :
                <Typography gutterBottom variant="h6">
                  {userCtx.userInfo.location[0].district}
                </Typography>
                <Typography gutterBottom variant="h6">
                  {userCtx.userInfo.location[0].postal_code}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Settings;
