import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import GIF2 from "../assets/gif2.gif";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import cookie from "react-cookies";
import Header from "./PatientHeader";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";

export default function Home() {
  const history = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState(null);
  const [search, setSearch] = React.useState(null);
  const [doctorl, setDoctorl] = React.useState(null);


  const [loader, setLoader] = React.useState(true);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    setLoader(true);
    var dat = cookie.load("user");
    console.log(dat);
    if (!dat) {
      history("/Login");
    }
    axios({
      method: "GET",
      url: "http://localhost:8081/api/doctors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log("doclis")
      console.log(res)
      setDoctorl(res.data)
    })
  }, []);

  return !loader ? (
    <Backdrop style={{ backgroundColor: "white" }} open={loader}>
      <img src={GIF2} />
    </Backdrop>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Grid
        container
        justifyContent="center"
        style={{ marginTop: 20 }}
        spacing={1}
      >
        <Grid item xs={10}>
          {/* <Typography style={{ fontSize: 18, fontStyle: "italic" }}>
            Welcome Patient, {cookie.load("user")["first_name"]}
          </Typography> */}
        </Grid>
        <Grid item xs={11}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              
            </Grid>
            <Grid item xs={6}>
              <Paper style={{ padding: 10 }} elevation={3}>
                <Grid container justifyContent="center">
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Search Doctor"
                      value={search}
                      fullWidth
                      onChange={(event) => {
                        setSearch(event.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                      <Grid container style={{marginTop:20}} spacing={1}>
                        {doctorl && doctorl.map((doc)=>
                         <Grid item xs={4}>
                         <Paper style={{padding:10}}>
                           <Grid container justifyContent="center">
                             <Grid item xs={12}>
                               <img
                               style={{borderRadius:50,height:100}}
                               src="https://xsgames.co/randomusers/assets/avatars/male/74.jpg"></img>
                             </Grid>
                             <Grid item xs={12} style={{marginTop:10}}>
                               <Typography style={{fontSize:14}}>{doc.first_name}</Typography>
                               <Typography style={{fontSize:12}}>{doc.email}</Typography>
                               <Typography style={{fontSize:12}}>Specialization: {doc.specialization}</Typography>
                               <Typography style={{fontSize:12}}>Phone: {doc.phone}</Typography>
                             </Grid>
                             <Grid item xs={10} style={{marginTop:5}}>
                               <Button variant="contained" color="primary" size="small">Book Appointment</Button>
                             </Grid>
                           </Grid>
                         </Paper>
                       </Grid>
                        )}
                       
                      </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* <AppBar position="fixed"  style={{boxShadow:"none",bottom:0,top:"auto"}}>
        <Toolbar>
        <div style={{flexGrow:0.5}} />
        <IconButton edge="end" color="inherit">
          </IconButton>
          <IconButton edge="end" color="inherit">
            <Button
              variant="contained"
              style={{backgroundColor:"white", color:"black"}}
              color="primary"
              onClick={() => {
                history("/Add");
              }}
            >
              Next
            </Button>
          </IconButton>
          <IconButton edge="end" color="inherit">
          <Button
              variant="contained"
              style={{backgroundColor:"white", color:"black"}}
              color="primary"
              onClick={() => {
                history("/Home");
              }}
            >
              Home
            </Button>
            </IconButton>
          <IconButton edge="end" color="inherit">
            <Button
              variant="contained"
              style={{backgroundColor:"white", color:"black"}}
              color="primary"
              onClick={() => {
                cookie.remove('user')
                toast.info("Application exited successfully", {
                  position: "bottom-center",
                  pauseOnHover: true,
                  draggable: true,
                  autoClose: true,
                });
                history('/Login')
              }}
            >
              Exit
            </Button>
          </IconButton>
        </Toolbar>
      </AppBar> */}
    </Box>
  );
}
