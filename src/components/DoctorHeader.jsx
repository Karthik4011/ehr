import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import GIF2 from "../assets/gif2.gif";
import { useNavigate, useLocation } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Drawer from "@mui/material/Drawer";
import LogoutIcon from '@mui/icons-material/Logout';
import cookie from "react-cookies";
import { ToastContainer, toast } from "react-toastify";
import logo from "../assets/logo.png";




export default function Home() {
  const history = useNavigate();
  const location = useLocation();

  const [open, setOpen] = React.useState(false);

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
    var dat = cookie.load('user')
    if(!dat){
      history("/Login")
    }
  }, []);




  const today = new Date(Date.now());

  return !loader ? (
    <Backdrop style={{ backgroundColor: "white" }} open={loader}>
      <img src={GIF2} />
    </Backdrop>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  position="static" style={{boxShadow:"none", backgroundColor:"black"}}>
      <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block", textAlign: "left" },
            }}
            style={{ cursor: "pointer" }}
          >
            <div>

            <img
              src={logo}
              style={{ width: 100, marginTop: 5, borderRadius: 50,verticalAlign:"middle" }}
            ></img>
            <span style={{marginLeft:10}}>Electronic Health Record</span>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <AppBar position="static" style={{boxShadow:"none", backgroundColor:"white"}}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer", backgroundColor:location.pathname=="/DoctorHome"?"black":"", color:location.pathname=="/DoctorHome"?"white":"black", textAlign:"center", borderRadius: location.pathname=="/DoctorHome"?5:5}}
            onClick={()=>{ history("/DoctorHome");}}
          >
            Home
          </Typography>
           <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer", backgroundColor:location.pathname=="/DoctorProfile"?"black":"", color:location.pathname=="/DoctorProfile"?"white":"black", textAlign:"center", borderRadius: location.pathname=="/DoctorProfile"?5:5}}
            onClick={()=>{ history("/DoctorProfile");}}
          >
            Account
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer", backgroundColor:location.pathname=="/DoctorDocuments"?"black":"", color:location.pathname=="/DoctorDocuments"?"white":"black", textAlign:"center", borderRadius: location.pathname=="/DoctorProfile"?5:5}}
            onClick={()=>{ history("/DoctorDocuments");}}
          >
            Upload Reports
          </Typography>
          {/*<Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer", backgroundColor:location.pathname=="/Search"?"white":"", color:location.pathname=="/Search"?"black":"", textAlign:"center", borderRadius: location.pathname=="/Search"?5:5}}
            onClick={()=>{ history("/Search");}}

          >
            Search Item
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer", backgroundColor:location.pathname=="/Trade"?"white":"", color:location.pathname=="/Trade"?"black":"", textAlign:"center", borderRadius: location.pathname=="/Trade"?5:5}}
            onClick={()=>{ history("/Trade");}}

          >
            Trade Negotiations
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer", backgroundColor:location.pathname=="/Notifications"?"white":"", color:location.pathname=="/Notifications"?"black":"", textAlign:"center", borderRadius: location.pathname=="/Notifications"?5:5}}
            onClick={()=>{ history("/Notifications");}}

          >
            Notifications
          </Typography>*/}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer", color:"black"}}
            onClick={()=>{
              cookie.remove('user')
              toast.info("Logged out successfull", {
                position: "bottom-center",
                pauseOnHover: true,
                draggable: true,
                autoClose: false,
              });
              history('/Login')
            }}

          >
            Logout
          </Typography> 
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <Grid
          container
          style={{ width: "400px"}}
          justifyContent="center"
          spacing={1}
        >
          <Grid xs={12} style={{height:64, backgroundColor:"#1876d1"}}>
          </Grid>
        </Grid>
      </Drawer>
    </Box>
  );
}
