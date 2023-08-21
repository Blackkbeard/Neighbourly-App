import React, { useEffect, useRef, useState, useContext } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

import Grid from "@mui/material/Unstable_Grid2";
import {
  Container,
  Typography,
  Box,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import TopBar from "../components/TopBar";
import TransactionCard from "../components/TransactionCards";
import TransactionDetails from "../components/TransactionDetails";

const Transactions = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [transactions, setTransactions] = useState([]);
  const [txnToggle, setTxnToggle] = useState("listings");
  const [selectedTxn, setSelectedTxn] = useState({});
  const [selectedTxnId, setSelectedTxnId] = useState("");

  //fetch all transactions by owner
  const getTransactionsByOwner = async () => {
    const res = await fetchData("/api/transactions", "POST", {
      owner_id: "64e2c2fcdce21246ef81b8ed", //TODO: update to logged-in user
    });

    if (res.ok) {
      setTransactions(res.data); //store in state
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  //get selected transaction
  const getSelectedTxn = async (id) => {
    const res = await fetchData("/api/transactions/" + id);
    if (!id) {
      // Return early if id is empty
      return;
    }

    if (res.ok) {
      console.log(res.data);
      setSelectedTxn(res.data); //store in state
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  //On first render, get all transactions
  useEffect(() => {
    getTransactionsByOwner();
  }, []);

  //On first render, select first transaction
  useEffect(() => {
    if (Object.keys(selectedTxn).length === 0 && transactions.length > 0) {
      setSelectedTxn(transactions[0]); //
    }
  }, [transactions]);

  //Update selected transaction when selected transaction changes
  useEffect(() => {
    getSelectedTxn(selectedTxnId);
  }, [selectedTxnId]);

  const handleToggle = (event, newSelection) => {
    setTxnToggle(newSelection);
    //TODO: toggle to requests section
  };

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

              <ToggleButtonGroup
                value={txnToggle}
                exclusive
                onChange={handleToggle}
                aria-label="transaction selection"
              >
                {/* add icons */}
                <ToggleButton
                  value="listings"
                  aria-label="listings"
                  sx={{ borderRadius: "5rem" }}
                >
                  My Listings
                </ToggleButton>
                <ToggleButton
                  value="rewuests"
                  aria-label="requests"
                  sx={{ borderRadius: "5rem" }}
                >
                  My Requests
                </ToggleButton>
              </ToggleButtonGroup>

              <Divider
                variant="middle"
                sx={{ marginLeft: "5%", marginRight: "5%", margin: "1rem" }}
              />
            </Grid>

            <Grid xs={5}>
              {transactions.map((item, idx) => {
                return (
                  <TransactionCard
                    key={idx}
                    id={item._id}
                    listingTitle={item.listing_id.title}
                    listingImage={item.listing_id.image_url}
                    status={item.status}
                    requesterName={item.requester_id.display_name}
                    requesterImage={item.requester_id.image_url}
                    setSelectedTxnId={setSelectedTxnId}
                  />
                );
              })}
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid xs={6}>
              {Object.keys(selectedTxn).length > 0 ? (
                <TransactionDetails
                  selectedTxn={selectedTxn}
                ></TransactionDetails>
              ) : (
                <Box>Loading..</Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Transactions;
