import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import GIF2 from "../assets/gif2.gif";
import { useNavigate, useLocation } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import cookie from "react-cookies";
import gif from '../assets/gif.gif'
import IconButton from "@mui/material/IconButton";
import logo from '../assets/logo.png';
import desc from '../assets/desc.png'





export default function Home() {
  const history = useNavigate();
  const location = useLocation();


  const [loader, setLoader] = React.useState(true);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const handleLogin = () => {
      if(email != "" & email != null){
      axios({
        method: "POST",
        url: "http://localhost:8081/api/login",
        data: {
          email: email,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res)=>{
          if(res.data.password == password){
          toast.info("Login successfull", {
            position: "bottom-center",
            pauseOnHover: true,
            draggable: true,
            autoClose: true,
          });
          history("/Home")
          cookie.save('user', res.data)
        }else{
            toast.info("Incorrect email or password", {
                position: "bottom-center",
                pauseOnHover: true,
                draggable: true,
                autoClose: true,
              });
        }
      })
    }else{
        toast.info("Please enter Email and Passowrd", {
            position: "bottom-center",
            pauseOnHover: true,
            draggable: true,
            autoClose: true,
          });
    }
  }

  useEffect(() => {
    setLoader(true);
  }, []);

  return !loader ? (
    <Backdrop style={{ backgroundColor: "white" }} open={loader}>
      <img src={GIF2} />
    </Backdrop>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" style={{boxShadow:"none",backgroundColor:"black"}}>
        <Toolbar>
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block", textAlign:"left" } }}
            style ={{cursor:"pointer"}}
            onClick={()=>{ history("/");}}
          >
            <img src={logo} style={{width:100,marginTop:5,borderRadius:50}}></img>
          </Typography>
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer", backgroundColor:location.pathname=="/"?"white":"", color:location.pathname=="/"?"black":"", textAlign:"center", borderRadius: location.pathname=="/intor"?5:5}}
            onClick={()=>{ history("/");}}
          >
            Home
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer", backgroundColor:location.pathname=="/Login"?"white":"", color:location.pathname=="/Login"?"black":"", textAlign:"center", borderRadius: location.pathname=="/Login"?5:5}}
            onClick={()=>{ history("/Login");}}
          >
            Login
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer", backgroundColor:location.pathname=="/Signup"?"white":"", color:location.pathname=="/Signup"?"black":"", textAlign:"center", borderRadius: location.pathname=="/Signup"?5:5}}
            onClick={()=>{ history("/Signup");}}
          >
            Signup
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer", backgroundColor:location.pathname=="/About"?"white":"", color:location.pathname=="/About"?"black":"", textAlign:"center", borderRadius: location.pathname=="/About"?5:5}}
            onClick={()=>{ history("/About");}}
          >
           About
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style ={{cursor:"pointer", backgroundColor:location.pathname=="/Contact"?"white":"", color:location.pathname=="/Contact"?"black":"", textAlign:"center", borderRadius: location.pathname=="/Contact"?5:5}}
            onClick={()=>{ history("/Contact");}}
          >
           Contact
          </Typography>
        </Toolbar>
    </AppBar>
     
    </Box>
  );
}
