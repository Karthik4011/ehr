import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import GIF2 from "../assets/gif2.gif";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import emailjs from "emailjs-com";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import cookie from "react-cookies";
import IconButton from "@mui/material/IconButton";
import logo from "../assets/logo.png";
import THeader from "./TopHeader";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function Home() {
  const history = useNavigate();

  const [loader, setLoader] = React.useState(true);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [type, setType] = React.useState("patient")

  const handleLogin = () => {
    if ((email != "") & (email != null)) {
        toast.info(
            "We are trying to send password details to your email address.",
            {
              position: "bottom-center",
              pauseOnHover: true,
              draggable: true,
              autoClose: false,
            }
          );
      var aurl = type == "patient" ? "http://localhost:8081/api/patient/login" : "http://localhost:8081/api/doctor/login"
      axios({
        method: "POST",
        url: aurl,
        data: {
          email: email,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log(response)
        if (response.data) {
            const templateParams = {
                from_name: "EHR",
                message: response.data.password,
                subject: "REQUEST FOR EHR PASSWORD",
                to_name: response.data.firstname + " " + response.data.lastname,
                to_email: email,
                from_email: email,
              };
              emailjs
                .send(
                  "service_2pioyjp",
                  "template_7euffcm",
                  templateParams,
                  "user_UrSzNfk0Txv33rqJCC7uC"
                )
                .then(
                  (response) => {
                    console.log(
                      "SUCCESS!",
                      response.status,
                      response.text
                    );
                    toast.success(
                      "Email has been sent successfully🎉",
                      {
                        position: "bottom-center",
                        pauseOnHover: true,
                        draggable: true,
                        autoClose: false,
                      }
                    );

                    toast.warning("Please check your email.", {
                      position: "bottom-center",
                      pauseOnHover: true,
                      draggable: true,
                      autoClose: false,
                    });
                  },
                  (err) => {
                    console.log("FAILED...", err);
                    toast.warning(
                      "Something went wrong in sending mail, Please contact personally🙂",
                      {
                        position: "bottom-center",
                        pauseOnHover: true,
                        draggable: true,
                        autoClose: false,
                      }
                    );
                  }
                );
          history("/Login");
        } else {
          toast.info("Incorrect email or User doesn't exist", {
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
      <Grid container justifyContent="center" style={{ marginTop: 80 }}>
        <Grid item xs={7}>
          <Paper elevation={3} style={{ padding: "30px 30px 60px 30px" }}>
            {/* <Typography style={{marginBottom:10,fontStyle:"italic"}}>Account Recovery</Typography> */}
            <Grid container justifyContent={"center"}>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Email"
                  value={email}
                  fullWidth
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={6} style={{ marginTop: 20 }}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  style={{ backgroundColor: "black" }}
                  onClick={handleLogin}
                >
                  Recover My Account
                </Button>
              </Grid>
              <Grid item xs={10} style={{ marginTop: 15 }}>
              <FormControl onChange={(event)=>{
                setType(event.target.value)
              }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    checked = {type === "patient"}
                    value="patient"
                    control={<Radio />}
                    label="Patient"
                  />
                  <FormControlLabel
                    checked = {type === "doctor"}
                    value="doctor"
                    control={<Radio />}
                    label="Doctor"
                  />
                </RadioGroup>
              </FormControl>
              </Grid>
              <Grid item xs={7} style={{ marginTop: 15 }}>
                <Typography
                  style={{
                    fontSize: 12,
                    color: "CaptionText",
                    fontStyle: "italic",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    history("/Login");
                  }}
                >
                  Go Back to Login
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {/* <AppBar position="fixed"  style={{boxShadow:"none",bottom:0,top:"auto"}}>
        <Toolbar>
        <div style={{flexGrow:0.5}} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history("/intor");
            }}
            style={{backgroundColor:"white", color:"black"}}
            >
            Previous
          </Button>
          <IconButton edge="end" color="inherit">
            <Button
              variant="contained"
              style={{backgroundColor:"white", color:"black"}}
              color="primary"
              onClick={() => {
                history("/Signup");
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
      </AppBar> */}
    </Box>
  );
}
