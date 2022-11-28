import { Avatar, Card, CardContent, Chip, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmptyComponent from "../common/Components/Empty";
import ErrorComponent from "../common/Components/Error";
import LoadingComponent from "../common/Components/Loading";
import { dataStates } from "../common/constants";
import { User } from "../common/types";
import { Email, Work, Person, Psychology } from "@mui/icons-material";
import '../App.css';

function Users() {
  let { id } = useParams();
  const [user, setUser] = useState<User>();
  const [dataStatus, setDataStatus] = useState<string>(dataStates.loading);
  const [fullName, setFullName] = useState<string>("")

  function fakeDelay(milliseconds: number) {
    return new Promise( resolve => setTimeout(resolve, milliseconds) );
  }

  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await axios.get(`http://localhost:3001/users/${id}`);
        // Purely to show that I am showing the spinner when awaiting data
        await fakeDelay(2000);

        if(Array.isArray(response.data) && response.data.length) {
          setUser(response.data[0])
          setDataStatus(dataStates.ready)
        } else {
          setDataStatus(dataStates.empty)
        }
      } catch (error) {
        setDataStatus(dataStates.error)
        console.error(error);
      }
    }

    if(id && !isNaN(+id) && +id > 0) {
      getAllUsers();
    } else {
      setDataStatus(dataStates.error);
      alert("The input is not valid. Please use a positive number")
    }
  }, [id]);

  useEffect(() => {
    setFullName(user?.first_name + " " + user?.last_name);
  }, [user])

  switch(dataStatus) {
      case dataStates.ready:
        return (
          <div className="ListParent">
            <Card sx={{ maxWidth: '75%', margin: '0 auto' }}>
              <Avatar 
                alt={fullName} 
                src={user?.avatar}
                sx={{ width: 100, height: 100, margin: '0 auto' }}
              />
              <CardContent>
                <Typography variant="h4" color="text.secondary">
                  {fullName}
                </Typography>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user?.email} secondary={`Email Verified: ${user?.emailVerified ? "True" : "False"}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Date of Birth" secondary={user?.dob} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Work />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user?.company.name} secondary={user?.company.department} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Psychology />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Skills:"/>
                  </ListItem>
                  <ListItem>
                  <Grid paddingTop={1} marginLeft={5} container spacing={2}>
                  {
                      user?.skills.map(skill => <Chip key={user.id+skill} label={skill} variant='outlined' />)
                  }
                  </Grid>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </div>
        );
      case dataStates.empty:
        return (
          <EmptyComponent/>
        )
      case dataStates.error:
        return (
          <ErrorComponent/>
        )
      default:
        return (
          <LoadingComponent/>
        )
    }
}

export default Users;