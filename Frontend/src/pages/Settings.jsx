import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import DistrictEnums from "../enums/districtEnums";
import {
  Autocomplete,
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
  // const [name, setName] = useState("");
  // const [bio1, setBio1] = useState("");
  // const [number1, setNumber1] = useState("");
  // const [email1, setEmail1] = useState("");
  // const [zip1, setZip1] = useState("");
  const [district1, setDistrict1] = useState("");
  const newNameRef = useRef();
  const newBioRef = useRef();
  const newNumberRef = useRef();
  const newEmailRef = useRef();
  const newZipRef = useRef();
  // const newDistrictRef = useRef(userCtx.userInfo?.location?.[0].district);

  const fetchData = useFetch();

  // functions
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const updateUser = async () => {
    // const userData = {
    //   display_name: name,
    //   biography: bio1,
    //   mobile_number: number1,
    //   email: email1,
    //   location: [
    //     {
    // district: district1,
    //       postal_code: zip1,
    //     },
    //   ],
    // };

    // console.log("update body: " + JSON.stringify(userData));
    const res = await fetchData(
      "/auth/update/" + userFullInfo._id,
      "PATCH",
      // userData,
      {
        display_name: newNameRef.current.value,
        biography: newBioRef.current.value,
        mobile_number: newNumberRef.current.value,
        email: newEmailRef.current.value,
        location: [
          {
            district: district1,
            postal_code: newZipRef.current.value,
          },
        ],
      }
      // userCtx.accessToken
    );
    // console.log(newDistrictRef.current.value);
    console.log(newZipRef.current.value);
    if (res.ok) {
      handleCloseUpdate();
      console.log("update succeeded");
      console.log(res.data);
      userCtx.getUserInfo();
    } else {
      console.log(res.data);
    }
  };

  //for image upload
  const [file, setFile] = useState();

  const submit = async (event) => {
    event.preventDefault();
    console.log(file);
    if (!file) {
      alert("Please select an image file");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("user_id", userFullInfo._id);

    const res = await fetch(
      import.meta.env.VITE_SERVER + "/api/images/avatars",
      {
        method: "POST",
        headers: {},
        body: formData,
      }
    );
    const data = await res.json();

    let returnValue = {};
    if (res.ok) {
      if (data.status === "error") {
        returnValue = { ok: false, data: data.msg };
        alert(JSON.stringify(returnValue.data));
      } else {
        returnValue = { ok: true, data };
        alert("Profile Picture updated");
        userCtx.getUserInfo();
      }
    } else {
      if (data?.errors && Array.isArray(data.errors)) {
        const messages = data.errors.map((item) => item.msg);
        returnValue = { ok: false, data: messages };
        alert(returnValue.data);
      } else if (data?.status === "error") {
        returnValue = { ok: false, data: data.message || data.msg };
        alert(returnValue.data);
      } else {
        console.log(data);
        returnValue = { ok: false, data: "An error has occurred" };
        alert(returnValue.data);
      }
    }
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <>
      <TopBar showBurger={true}></TopBar>

      <Container maxWidth="lg">
        <Box>
          <Typography variant="h5" textAlign="start" margin="2rem 0">
            Account Settings{" "}
          </Typography>
          <Grid container>
            <Grid xs={5}>
              <Avatar
                alt=""
                src={userCtx.userInfo.image_url}
                sx={{ width: 150, height: 150 }}
                display="flex"
                justifycontent="center"
              ></Avatar>

              <input
                onChange={fileSelected}
                type="file"
                accept="image/*"
              ></input>

              <Btn onClick={submit}>Update</Btn>
            </Grid>
            <Grid xs={5}>
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
                  Location :
                </Typography>
                <Typography gutterBottom variant="h6">
                  District: {userCtx.userInfo?.location?.[0].district}
                </Typography>
                <Typography gutterBottom variant="h6">
                  Postal Code: {userCtx.userInfo?.location?.[0].postal_code}
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
                {/* <Typography>Name :</Typography> */}
                <TextField
                  id="filled-password-input"
                  defaultValue={userCtx.userInfo.display_name}
                  label="Name"
                  variant="filled"
                  // onChange={(e) => setName(e.target.value)}
                  inputRef={newNameRef}
                ></TextField>
              </Box>
              <Box xs={2}>
                {/* <Typography>Email:</Typography> */}
                <TextField
                  id="filled-read-only-input"
                  label="Email"
                  defaultValue={userCtx.userInfo.email}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
                  // onChange={(e) => setEmail1(e.target.value)}
                  inputRef={newEmailRef}
                ></TextField>
              </Box>
              <Box xs={2}>
                {/* <Typography>Biography :</Typography> */}

                <TextField
                  id="filled-password-input"
                  label="Interests & Hobbies"
                  defaultValue={userCtx.userInfo.biography}
                  variant="filled"
                  // onChange={(e) => setBio1(e.target.value)}
                  inputRef={newBioRef}
                ></TextField>
              </Box>
              <Box xs={2}>
                {/* <Typography>Mobile Number :</Typography> */}
                <TextField
                  id="filled-password-input"
                  label="Mobile Number"
                  defaultValue={userCtx.userInfo.mobile_number}
                  variant="filled"
                  // onChange={(e) => setNumber1(e.target.value)}
                  inputRef={newNumberRef}
                ></TextField>
              </Box>
              <Box xs={2}>
                {/* <Typography>Locations :</Typography>
                <TextField
                  onChange={(e) => setDistrict1(e.target.value)}
                ></TextField> */}
                <Autocomplete
                  disablePortal
                  id="filled-password-input"
                  variant="filled"
                  defaultValue={userCtx.userInfo?.location?.[0].district}
                  options={DistrictEnums}
                  // inputValue={newDistrictRef}
                  inputValue={district1}
                  onInputChange={(event, newInputValue) => {
                    setDistrict1(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="District" />
                  )}
                />
                <TextField
                  id="filled-password-input"
                  label="Postal Code"
                  variant="filled"
                  defaultValue={userCtx.userInfo?.location?.[0].postal_code}
                  // onChange={(e) => setZip1(e.target.value)}
                  inputRef={newZipRef}
                ></TextField>
              </Box>
            </Box>
          </DialogContentText>

          <DialogActions>
            <Btn onClick={handleCloseUpdate} isBrown={true}>
              Cancel
            </Btn>
            <Btn onClick={updateUser} id="edit">
              Confirm
            </Btn>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Settings;
