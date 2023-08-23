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
import Avt from "../components/Avt";

const Settings = (props) => {
  const userCtx = useContext(UserContext);
  const userFullInfo = userCtx.userInfo;
  const [openUpdate, setOpenUpdate] = useState(false);
  const [district1, setDistrict1] = useState("");
  const newNameRef = useRef();
  const newBioRef = useRef();
  const newNumberRef = useRef();
  const newEmailRef = useRef();
  const newZipRef = useRef();

  const fetchData = useFetch();

  // functions
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const updateUser = async () => {
    const res = await fetchData(
      "/auth/update/" + userFullInfo._id,
      "PATCH",

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
      },
      userCtx.accessToken
    );

    if (res.ok) {
      handleCloseUpdate();
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
          <Grid container>
            <Grid xs={12}>
              <Typography variant="h5" textAlign="start" margin="2rem 0">
                Account Settings
              </Typography>
            </Grid>
            <Grid xs={4}>
              <Avt src={userCtx.userInfo.image_url} size="15"></Avt>
              <br />
              <input
                onChange={fileSelected}
                type="file"
                accept="image/*"
              ></input>

              <Btn onClick={submit}>Update</Btn>
            </Grid>
            <Grid xs={8}>
              <Typography
                gutterBottom
                variant="h6"
                fontWeight="bold"
                className="burgundy-text"
              >
                Name
              </Typography>
              <Typography gutterBottom variant="body1" sx={{ mb: "2rem" }}>
                {userCtx.userInfo.display_name}
              </Typography>

              <Typography
                gutterBottom
                variant="h6"
                fontWeight="bold"
                className="burgundy-text"
              >
                Email
              </Typography>
              <Typography gutterBottom variant="body1" sx={{ mb: "2rem" }}>
                {userCtx.userInfo.email}
              </Typography>

              <Typography
                gutterBottom
                variant="h6"
                fontWeight="bold"
                className="burgundy-text"
              >
                Biography
              </Typography>

              <Typography gutterBottom variant="body1" sx={{ mb: "2rem" }}>
                {userCtx.userInfo.biography}
              </Typography>

              <Typography
                gutterBottom
                variant="h6"
                fontWeight="bold"
                className="burgundy-text"
              >
                Mobile Number
              </Typography>
              <Typography gutterBottom variant="body1" sx={{ mb: "2rem" }}>
                {userCtx.userInfo.mobile_number}
              </Typography>

              <Typography
                gutterBottom
                variant="h6"
                fontWeight="bold"
                className="burgundy-text"
              >
                Location
              </Typography>
              <Typography gutterBottom variant="body1" sx={{ ml: "0" }}>
                {userCtx.userInfo?.location?.[0].district}
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                sx={{ ml: "0", mb: "2rem" }}
              >
                {userCtx.userInfo?.location?.[0].postal_code}
              </Typography>
            </Grid>
            <Grid xs={4}></Grid>
            <Grid xs={8}>
              <Btn
                startIcon={<ModeEditOutlineOutlinedIcon />}
                onClick={handleOpenUpdate}
              >
                Edit Account Info
              </Btn>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Edit account dialogue */}
      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Edit Account Info</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            margin="dense"
            defaultValue={userCtx.userInfo.display_name}
            label="Name"
            variant="outlined"
            sx={{ width: "32rem" }}
            inputRef={newNameRef}
          ></TextField>

          <TextField
            disabled
            type="text"
            margin="dense"
            label="Email"
            defaultValue={userCtx.userInfo.email}
            variant="outlined"
            sx={{ width: "32rem" }}
            inputRef={newEmailRef}
          ></TextField>

          <TextField
            type="text"
            margin="dense"
            label="Biography"
            defaultValue={userCtx.userInfo.biography}
            variant="outlined"
            sx={{ width: "32rem" }}
            inputRef={newBioRef}
          ></TextField>

          <TextField
            type="text"
            margin="dense"
            label="Mobile Number"
            defaultValue={userCtx.userInfo.mobile_number}
            variant="outlined"
            sx={{ width: "32rem" }}
            inputRef={newNumberRef}
          ></TextField>

          <Autocomplete
            disablePortal
            type="text"
            margin="dense"
            variant="outlined"
            sx={{ width: "32rem", mt: "0.4rem", mb: "0.2rem" }}
            defaultValue={userCtx.userInfo?.location?.[0].district}
            options={DistrictEnums}
            inputValue={district1}
            onInputChange={(event, newInputValue) => {
              setDistrict1(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label="District" />}
          />
          <TextField
            type="text"
            margin="dense"
            label="Postal Code"
            variant="outlined"
            sx={{ width: "32rem" }}
            defaultValue={userCtx.userInfo?.location?.[0].postal_code}
            inputRef={newZipRef}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Btn onClick={handleCloseUpdate} isBrown={true}>
            Cancel
          </Btn>
          <Btn onClick={updateUser} id="edit">
            Confirm
          </Btn>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Settings;
