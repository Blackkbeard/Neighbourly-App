import React, { useContext, useState } from "react";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Container,
  Typography,
  Box,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Btn from "../components/Btn";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const Settings = (props) => {
  const userCtx = useContext(UserContext);
  const userFullInfo = userCtx.userInfo;
  const [openUpdate, setOpenUpdate] = useState(false);

  const fetchData = useFetch();
  const [fullInfo, setFullInfo] = useState([]);

  // functions
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const updateUser = async () => {
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
              <Typography textAlign="center"></Typography>
              <Box xs={2}>
                <Typography gutterBottom variant="h4">
                  Name :
                </Typography>
                <Typography gutterBottom variant="h6">
                  {userCtx.userInfo.display_name}
                </Typography>
              </Box>
              <Box xs={2}>
                <Typography gutterBottom variant="h4">
                  Email:
                </Typography>
                <Typography gutterBottom variant="h6">
                  {userCtx.userInfo.email}
                </Typography>
              </Box>
              <Box xs={2}>
                <Typography gutterBottom variant="h4">
                  Biography :
                </Typography>

                <Typography gutterBottom variant="h6">
                  {userCtx.userInfo.biography}
                </Typography>
              </Box>
              <Box xs={2}>
                <Typography gutterBottom variant="h4">
                  Mobile Number :
                </Typography>
                <Typography gutterBottom variant="h6">
                  {userCtx.userInfo.mobile_number}
                </Typography>
              </Box>
              <Box xs={2}>
                <Typography gutterBottom variant="h4">
                  Locations :
                </Typography>
                <Typography gutterBottom variant="h6">
                  {userCtx.userInfo.location[0].district}
                </Typography>
                <Typography gutterBottom variant="h6">
                  {userCtx.userInfo.location[0].postal_code}
                </Typography>
              </Box>
              <Btn
                startIcon={<ModeEditOutlineOutlinedIcon />}
                onClick={handleOpenUpdate}
              >
                Update Profile
              </Btn>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Update User Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 3, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <Box xs={2}>
                <Typography>Name :</Typography>
                <TextField>{userCtx.userInfo.display_name}</TextField>
              </Box>
              <Box xs={2}>
                <Typography>Email:</Typography>
                <TextField>{userCtx.userInfo.email}</TextField>
              </Box>
              <Box xs={2}>
                <Typography>Biography :</Typography>

                <TextField>{userCtx.userInfo.biography}</TextField>
              </Box>
              <Box xs={2}>
                <Typography>Mobile Number :</Typography>
                <TextField>{userCtx.userInfo.mobile_number}</TextField>
              </Box>
              <Box xs={2}>
                <Typography>Locations :</Typography>
                <TextField>{userCtx.userInfo.location[0].district}</TextField>
                <TextField>
                  {userCtx.userInfo.location[0].postal_code}
                </TextField>
              </Box>
            </Box>
          </DialogContentText>

          <DialogActions>
            <Btn onClick={handleCloseUpdate} isBrown={true}>
              Cancel
            </Btn>
            {/* <Btn onClick={updateListing} id="edit">
              Confirm
            </Btn> */}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Settings;
