import { React, useContext } from "react";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Typography, Box, Avatar } from "@mui/material";
import Divider from "@mui/material/Divider";
import Btn from "../components/Btn";
import UserContext from "../context/user";
import TransactionCard from "../components/TransactionCards";

const Transactions = () => {
  const userCtx = useContext(UserContext);
  return (
    <>
      <TopBar showBurger={true}></TopBar>

      <Container maxWidth="lg">
        <Box>
          <Grid container>
            <Grid xs={12}>
              <Typography variant="h5" textAlign="start" margin="2rem 0">
                Your transactions
              </Typography>
            </Grid>
            <Grid xs={4}>
              <TransactionCard></TransactionCard>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid xs={7}>
              <Box sx={{ display: "flex" }} xs={12}>
                <Box
                  xs={2}
                  sx={{ display: "flex", flexDirection: "column" }}
                  margin="1rem"
                >
                  <Avatar sx={{ width: "3rem", height: "3rem" }}></Avatar>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "column" }}
                  margin="1rem"
                >
                  <Typography component="div" variant="h6">
                    RequesterName
                  </Typography>
                  <Typography
                    variant="subtitle"
                    color="text.secondary"
                    component="div"
                  >
                    Neighbour in NEIGHBOURHOOD
                  </Typography>
                </Box>
              </Box>
              <Divider
                variant="middle"
                sx={{ marginLeft: "5%", marginRight: "5%" }}
              />
              <Box>
                <Typography
                  variant="body"
                  color="text.secondary"
                  component="div"
                  display="block"
                  margin="1rem"
                >
                  RequesterName is interested in ListingTitle.
                </Typography>
                <Typography
                  variant="body"
                  color="text.secondary"
                  component="div"
                  display="block"
                  margin="1rem"
                >
                  Accept this request?
                </Typography>
                <Typography
                  variant="body"
                  color="text.secondary"
                  component="div"
                  display="block"
                  margin="1rem"
                >
                  Once accepted, you will exchange mobile numbers to arrange a
                  meet-up.
                </Typography>

                <Typography
                  variant="body"
                  color="text.secondary"
                  component="div"
                  display="block"
                  margin="1rem"
                >
                  Your mobile number: +65 91234567
                </Typography>
              </Box>
              <Box display="flex" margin="1rem">
                <Btn width={10}>Accept</Btn>
                <Btn isBrown={true} width={10}>
                  Decline
                </Btn>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Transactions;
