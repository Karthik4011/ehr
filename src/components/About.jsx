import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import GIF2 from "../assets/gif2.gif";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import cookie from "react-cookies";
import gif from "../assets/mhr4.png";
import IconButton from "@mui/material/IconButton";
import logo from "../assets/intor.jpeg";
import desc from "../assets/desc.png";
import THeader from "./TopHeader";

export default function Home() {
  const history = useNavigate();

  const [loader, setLoader] = React.useState(true);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const handleLogin = () => {
    if ((email != "") & (email != null)) {
      axios({
        method: "POST",
        url: "http://localhost:8081/api/login",
        data: {
          email: email,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.data.password == password) {
          toast.info("Login successfull", {
            position: "bottom-center",
            pauseOnHover: true,
            draggable: true,
            autoClose: true,
          });
          history("/Home");
          cookie.save("user", res.data);
        } else {
          toast.info("Incorrect email or password", {
            position: "bottom-center",
            pauseOnHover: true,
            draggable: true,
            autoClose: true,
          });
        }
      });
    } else {
      toast.info("Please enter Email and Passowrd", {
        position: "bottom-center",
        pauseOnHover: true,
        draggable: true,
        autoClose: true,
      });
    }
  };

  useEffect(() => {
    setLoader(true);
  }, []);

  return !loader ? (
    <Backdrop style={{ backgroundColor: "white" }} open={loader}>
      <img src={GIF2} />
    </Backdrop>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <THeader></THeader>
      <Grid container justifyContent="center" style={{ marginTop: 30 }}>
        <Grid item xs={7} style={{ marginTop: 30 }}>
          <Paper style={{ padding: 25 }} elevation={3}>
            <Grid container>
              <Grid item xs={12}>
                <Typography>
                  Medical information is one of the sorts of data that is
                  distinguished by the variety and quantity of its sources. This
                  diversity contributes to the emergence of a slew of issues,
                  the most serious of which is the difficulty of communicating
                  and interacting with systems. This is referred to as the
                  interoperability problem. In this regard, we suggest the
                  Electronic Medical Health Record System as a novel mediator
                  semantic in this work provides the user with a unified
                  representation of information that was previously dispersed
                  across numerous separate and heterogeneous sites and is tied
                  to a given project. This application will help the user by
                  identifying the specific doctor as per their health condition.
                  It also allows the user to interact with a big number of
                  people
                </Typography>
              </Grid>
              <Grid item xs={12} style={{marginTop:50}}>
              <Button
                  variant="contained"
                  style={{ backgroundColor: "white", color: "black" }}
                  color="primary"
                  onClick={() => {
                    history("/");
                  }}
                >
                  Home
                </Button>&nbsp;
                <Button
                  variant="contained"
                  style={{ backgroundColor: "white", color: "black" }}
                  color="primary"
                  onClick={() => {
                    history("/Signup");
                  }}
                >
                  Back
                </Button>&nbsp;
                <Button
                  variant="contained"
                  style={{ backgroundColor: "white", color: "black" }}
                  color="primary"
                  onClick={() => {
                    history("/Contact");
                  }}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {/* <AppBar position="fixed"  style={{boxShadow:"none",bottom:100,top:"auto",backgroundColor:"white"}}>
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
                history("/Signup");
              }}
            >
              Previous
            </Button>
          </IconButton>
          <IconButton edge="end" color="inherit">
            <Button
              variant="contained"
              style={{backgroundColor:"white", color:"black"}}
              color="primary"
              onClick={() => {
                history("/Contact");
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
                window.open("about:blank", "_self");
                window.close();
              }}
            >
              Exit
            </Button>
          </IconButton>
        </Toolbar>
      </AppBar>  */}
    </Box>
  );
}
