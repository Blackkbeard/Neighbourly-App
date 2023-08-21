import { React, useContext } from "react";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Typography, Box, Avatar } from "@mui/material";
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
            <Grid
              xs={5}
              style={{
                borderStyle: "solid",
                borderRadius: "1rem",
              }}
            >
              <TransactionCard></TransactionCard>
            </Grid>
            <Grid
              xs={7}
              style={{
                borderStyle: "solid",
                borderRadius: "1rem",
              }}
            >
              <Box
                sx={{ display: "flex" }}
                xs={12}
                style={{ borderStyle: "solid" }}
              >
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
              </Box>
              <Box display="flex" margin="1rem">
                <Btn width={15}> Accept</Btn>
                <Btn isBrown={true} width={15}>
                  Request
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
