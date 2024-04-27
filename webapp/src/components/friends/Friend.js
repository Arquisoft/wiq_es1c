import React, { useState, useEffect } from "react";
import { Nav } from "../nav/Nav";
import { Autocomplete, Avatar, Box, Button, Container, CssBaseline, Grid, Stack, TextField, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTranslation } from "react-i18next";
import { getUsers, getCurrentUser } from "../../services/user.service";
import { acceptRequest, getFriends, getRequests, sendRequest } from "../../services/friends.service";
import {Footer} from '../footer/Footer';
import Swal from 'sweetalert2';

export const Friends = () => {
  const { t } = useTranslation();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [friends, setFriends] = useState([]);

  const handleUserChange = (event, newValue) => {
    setSelectedUser(newValue);
  }

  const acceptFriendRequest = async (from) => {
    await acceptRequest(localStorage.getItem("token"), from)
    updateFriends();
  }

  const sendFriendRequest = () => {
    if(selectedUser && selectedUser.id)
      sendRequest(localStorage.getItem("token"), selectedUser.id).then(() => {
        Swal.fire(
          `${t('Friends.success')}`,
          `${t('Friends.reqmsg')}`,
          'success'
        )
      });
  }

  const updateFriends = () => {
    getUsers().then(async (users) => {
      let json = users.map(user => {return{label: user.name, id: user.id}})
      let currentUser = (await getCurrentUser())
      json = json.filter((user) => user.label != currentUser);

      setUsers(json)

      let usersDict = {}

      json.forEach(user => usersDict[user.id] = user.label)

      getRequests(localStorage.getItem("token")).then(requests => {
        requests = requests.map(r => {return{
          from: r.from,
          name: usersDict[r.from]
        }});
        setRequests(requests);
        getFriends(localStorage.getItem("token")).then(friends => {
          let json = friends.flatMap(friend => [usersDict[friend.friend1], usersDict[friend.friend2]]);
          json = json.filter((user) => user != currentUser && user);
          setFriends(json);
        })
      });
    });
  }

  useEffect(() => {
    updateFriends();
  },[])

  return (
    <>
      <Nav />
      <ThemeProvider theme={darkTheme}>
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "85vh",
          }}
          className="min-h-screen flex justify-center align-middle"
        >
          <Container
            className="bg-teal-50 dark:bg-zinc-800 rounded-lg flex"
            component="main"
            maxWidth="sm"
          >
              <CssBaseline />
              <Box
                  sx={{
                      padding: 3,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                  }}
                  
              >
                  <Typography className="text-black dark:text-white ">{ t('Friends.friends') }</Typography>
                  <Stack spacing={2}>
                    {
                      friends.length > 0
                      ?
                      friends.map(name => 
                        <Grid container spacing={2} key={name}>
                          <Grid item xs={4}>
                            <Avatar>{(""+name)[0]}</Avatar>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography className="text-black dark:text-white">{".   " + name}</Typography>
                          </Grid>
                        </Grid>
                      )
                      :
                      <Typography className="text-black dark:text-white">{ t('Friends.noFriends') }</Typography>
                    }
                  </Stack>
              </Box>
              <Box
                  sx={{
                      padding: 3,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                  }}
                  
              >
                  <Typography className="text-black dark:text-white ">{ t('Friends.receivedFriendRequest') }</Typography>
                  <Stack spacing={2}>
                    {
                      requests.length > 0
                      ?
                      requests.map(request => 
                        <Grid container spacing={2} key={request.id}>
                          <Grid item xs={8}>
                            <Typography className="text-black dark:text-white">{request.name}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Button onClick={()=>acceptFriendRequest(request.from)}variant="outlined">{ t('Friends.accept') }</Button>
                          </Grid>
                        </Grid>
                      )
                      :
                      <Typography className="text-black dark:text-white">{ t('Friends.noFriendRequest') }</Typography>
                    }
                  </Stack>
              </Box>
              <Box
                  sx={{
                      padding: 3,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                  }}
                  
              >
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-users"
                        options={users}
                        sx={{ width: 300 }}
                        onChange={handleUserChange}
                        renderInput={(params) => <TextField {...params} label={ t('Friends.searchUsers') } />}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button onClick={sendFriendRequest}variant="outlined">{ t('Friends.sendRequest') }</Button>
                  </Grid>
                </Grid>
              </Box>
          </Container>
        </Container>
      </ThemeProvider>
      <Footer/>
    </>
  );
};
