import React, { useEffect, useRef, useState, useContext } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

import Grid from "@mui/material/Unstable_Grid2";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import TopBar from "../components/TopBar";
import Btn from "../components/Btn";
import TransactionCard from "../components/TransactionCards";

const Transactions = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [transactions, setTransactions] = useState([]);
  const [txnToggle, setTxnToggle] = useState("listings");
  const [selectedTxn, setSelectedTxn] = useState();

  //fetch transactions by owner
  const getTransactionsByOwner = async () => {
    const res = await fetchData(
      "/api/transactions",
      "POST",
      {
        owner_id: "64e2c2fcdce21246ef81b8ed",
      },
      userCtx.accessToken
    );

    if (res.ok) {
      setTransactions(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getTransactionsByOwner();
  }, []);

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
                    setSelectedTxn={setSelectedTxn}
                  />
                );
              })}
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid xs={6}>
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
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Transactions;
