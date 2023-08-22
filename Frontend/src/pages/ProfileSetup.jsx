import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import Btn from "../components/Btn";
import UserContext from "../context/user";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Link,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProfileSetup = (props) => {
  const navigate = useNavigate();
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [dispName, setDispName] = useState("");
  const [bio, setBio] = useState("");
  const [number, setNumber] = useState("");

  //for image upload
  const [file, setFile] = useState();

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("user_id", props.userInfo._id);

    const res = await fetch(import.meta.env.VITE_SERVER + "/api/images", {
      method: "POST",
      headers: {},
      body: formData,
    });
    const data = await res.json();

    let returnValue = {};
    if (res.ok) {
      if (data.status === "error") {
        returnValue = { ok: false, data: data.msg };
      } else {
        returnValue = { ok: true, data };
      }
    } else {
      if (data?.errors && Array.isArray(data.errors)) {
        const messages = data.errors.map((item) => item.msg);
        returnValue = { ok: false, data: messages };
      } else if (data?.status === "error") {
        returnValue = { ok: false, data: data.message || data.msg };
      } else {
        console.log(data);
        returnValue = { ok: false, data: "An error has occurred" };
      }
    }

    return returnValue;
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  // const dispNameRef = useRef("");
  // const bioRef = useRef("");
  // const numberRef = useRef("");
  const skipUpdate = async () => {
    navigate("/profile");
  };

  const updateUser = async (id) => {
    console.log(id);
    const requestBody = {
      display_name: dispName,
      biography: bio,
      mobile_number: number,

      // dispName: dispNameRef.current.value,
      // bio: bioRef.current.value,
      // number: numberRef.current.value,
    };
    console.log(requestBody);
    const res = await fetchData(
      "/auth/update/" + id,
      "PATCH",
      requestBody,
      userCtx.accessToken
    );

    if (res.ok) {
      console.log("update succeeded");
      console.log(res.data);
      // setDispName("");
      // setBio("");
      // setNumber("");
      navigate("/profile");
    } else {
      console.log(res.data);
    }
  };
  // useEffect(() => { dispName: dispNameRef.current.value,
  //     bio: bioRef.current.value,
  //     number: numberRef.current.value, } , []);
  return (
    <>
      <TopBar></TopBar>

      <Container maxWidth="lg">
        {/* {JSON.stringify(props.userInfo)} */}
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
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h5" textAlign="start" margin="2rem 0">
                Welcome To The Neighbourhood!
              </Typography>

              <Avatar
                alt=""
                src="https://seeklogo.com/images/G/general-assembly-logo-D5C634F07A-seeklogo.com.png"
                sx={{ width: 180, height: 180 }}
              />
              <TextField
                id="outlined-basic"
                label="Display Name"
                variant="outlined"
                defaultValue="vinesh"
                onChange={(e) => setDispName(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Biography"
                variant="outlined"
                defaultValue="run"
                onChange={(e) => setBio(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                defaultValue="98879870"
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
        <form
          onSubmit={submit}
          style={{ width: 650 }}
          className="flex flex-col space-y-5 px-5 py-14"
        >
          <input onChange={fileSelected} type="file" accept="image/*"></input>

          <button type="submit">Submit</button>
        </form>
      </Container>
    </>
  );
};

export default ProfileSetup;
