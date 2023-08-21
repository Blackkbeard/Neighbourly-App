import { React, useContext } from "react";
import TopBar from "../components/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import { Container, Typography, Box } from "@mui/material";
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
              <Typography textAlign="center">Transactions</Typography>
              <Btn>Sign</Btn>
              <Btn isBrown={true} width={15}>
                Cancel
              </Btn>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Transactions;
