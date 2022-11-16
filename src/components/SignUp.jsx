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
  const [firstname, setFirstname] = React.useState(null);
  const [lastname, setLastname] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [dateofbirth, setDob] = React.useState(null);
  const [gender, setGender] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [specialization, setSpecialization] = React.useState(null);
  const [fathername, setFathername] = React.useState(null);
  const [mothername, setMothername] = React.useState(null);
  const [spousename, setSpousename] = React.useState(null);
  const [occupation, setOccupation] = React.useState(null);
  const [pincode, setPincode] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [err, setErr] = React.useState(false);
  const [password, setPassword] = React.useState(null);
  const [cpassword, setCpassword] = React.useState(null);
  const [type, setType] = React.useState("patient");
  const handleLogin = () => {
    var alrdy = false;
    var geturl =
      type == "patient"
        ? "http://localhost:8081/api/patients"
        : "http://localhost:8081/api/doctors";
    axios({
      method: "GET",
      url: geturl,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      var data = res.data;
      for (var i = 0; i < data.length; i++) {
        if (email == data[i].email) {
          alrdy = true;
        }
      }
      if (alrdy) {
        toast.info("User already exists!!!", {
          position: "bottom-center",
          pauseOnHover: true,
          draggable: true,
          autoClose: true,
        });
        setEmail("");
      } else {
        proceedSign();
      }
    });
  };
  const proceedSign = () => {
    var errr = false;
    if (
      email == "" ||
      email == null ||
      password == "" ||
      password == null ||
      firstname == "" ||
      firstname == null ||
      lastname == "" ||
      lastname == null ||
      phone == "" ||
      phone == null ||
      address == "" ||
      address == null ||
      dateofbirth == "" ||
      dateofbirth == null ||
      gender == "" ||
      gender == null ||
      country == "" ||
      country == null ||
      password != cpassword
    ) {
      errr = true;
    }
    if (!errr) {
      var aurl =
        type == "patient"
          ? "http://localhost:8081/api/patient/signup"
          : "http://localhost:8081/api/doctor/signup";

      var datap = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        phone: phone,
        address: address + "," + city + "," + pincode,
        date_of_birth: dateofbirth,
        sex: gender,
        father_name: fathername,
        mother_name: mothername,
        spouse_name: spousename,
        nationality: country,
        occupation: occupation,
        password: password,
        action: "insert",
        pdate: new Date(),
      };
      var datad = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        phone: phone,
        address: address + "," + city + "," + pincode,
        date_of_birth: dateofbirth,
        sex: gender,
        nationality: country,
        password: password,
        specialization: specialization,
        action: "insert",
        ddate: new Date(),
      };
      axios({
        method: "POST",
        url: aurl,
        data: type == "patient" ? datap : datad,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          toast.info("Account created successfully", {
            position: "top-center",
            pauseOnHover: true,
            draggable: true,
            autoClose: false,
          });
          history("/Login");
        }
      });
    } else {
      toast.info("Please enter All details", {
        position: "top-center",
        pauseOnHover: true,
        draggable: true,
        autoClose: false,
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
      <Grid container justifyContent="center" style={{ marginTop: 50 }}>
        <Grid item xs={7}>
          <Paper elevation={3} style={{ padding: "30px 30px 60px 30px" }}>
            <Grid container justifyContent={"center"}>
              <Grid item xs={10} style={{ marginBottom: 15 }}>
                <FormControl
                  onChange={(event) => {
                    setType(event.target.value);
                  }}
                >
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      checked={type === "patient"}
                      value="patient"
                      control={<Radio />}
                      label="Patient"
                    />
                    <FormControlLabel
                      checked={type === "doctor"}
                      value="doctor"
                      control={<Radio />}
                      label="Doctor"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={10}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Firstname*"
                      value={firstname}
                      fullWidth
                      onChange={(event) => {
                        setFirstname(event.target.value);
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Lastname*"
                      value={lastname}
                      fullWidth
                      onChange={(event) => {
                        setLastname(event.target.value);
                      }}
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={10} style={{ marginTop: 5 }}>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Email*"
                  value={email}
                  fullWidth
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                ></TextField>
              </Grid>

              <Grid item xs={10} style={{ marginTop: 5 }}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Phone*"
                      value={phone}
                      fullWidth
                      onChange={(event) => {
                        setPhone(event.target.value);
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Date of Birth*"
                      value={dateofbirth}
                      fullWidth
                      onChange={(event) => {
                        setDob(event.target.value);
                      }}
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={10} style={{ marginTop: 5 }}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Gender*"
                      value={gender}
                      fullWidth
                      onChange={(event) => {
                        setGender(event.target.value);
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      size="small"
                      label="country*"
                      value={country}
                      fullWidth
                      onChange={(event) => {
                        setCountry(event.target.value);
                      }}
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>
              {type == "doctor" ? (
                <Grid item xs={10} style={{ marginTop: 5 }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Specialization"
                    value={specialization}
                    fullWidth
                    onChange={(event) => {
                      setSpecialization(event.target.value);
                    }}
                  ></TextField>
                </Grid>
              ) : null}
              {/* {type == "patient" ? (
                <Grid item xs={10} style={{ marginTop: 10 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        size="small"
                        label="Father Name"
                        value={fathername}
                        fullWidth
                        onChange={(event) => {
                          setFathername(event.target.value);
                        }}
                      ></TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        size="small"
                        label="Mother Name"
                        value={mothername}
                        fullWidth
                        onChange={(event) => {
                          setMothername(event.target.value);
                        }}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>
              ) : null} */}
              {/* {type == "patient" ? (
                <Grid item xs={10} style={{ marginTop: 10 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        size="small"
                        label="Spouse Name"
                        value={spousename}
                        fullWidth
                        onChange={(event) => {
                          setSpousename(event.target.value);
                        }}
                      ></TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        variant="outlined"
                        size="small"
                        label="Occupation"
                        value={occupation}
                        fullWidth
                        onChange={(event) => {
                          setOccupation(event.target.value);
                        }}
                      ></TextField>
                    </Grid>
                  </Grid>
                </Grid>
              ) : null} */}
              <Grid item xs={10}>
                <Grid container spacing={1}>
                  <Grid item xs={6} style={{ marginTop: 5 }}>
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Address*"
                      value={address}
                      fullWidth
                      onChange={(event) => {
                        setAddress(event.target.value);
                      }}
                    ></TextField>
                  </Grid>

                  <Grid item xs={3} style={{ marginTop: 5 }}>
                    <TextField
                      variant="outlined"
                      size="small"
                      label="City"
                      value={city}
                      fullWidth
                      onChange={(event) => {
                        setCity(event.target.value);
                      }}
                    ></TextField>
                  </Grid>

                  <Grid item xs={3} style={{ marginTop: 5 }}>
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Pin"
                      value={pincode}
                      fullWidth
                      onChange={(event) => {
                        setPincode(event.target.value);
                      }}
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={10} style={{ marginTop: 5 }}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      type="password"
                      variant="outlined"
                      size="small"
                      label="Password*"
                      value={password}
                      fullWidth
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="password"
                      variant="outlined"
                      size="small"
                      label="Confirm Password*"
                      value={cpassword}
                      fullWidth
                      onChange={(event) => {
                        setCpassword(event.target.value);
                      }}
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>

              {/* <Grid item xs={6} style={{ marginTop: 20 }}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  style={{ backgroundColor: "black" }}
                  onClick={handleLogin}
                >
                  Submit
                </Button>
              </Grid> */}
              <Grid item xs={12} style={{ marginTop: 15 }}></Grid>
              <Grid item xs={7}>
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
                  Existing User? Login Here
                </Typography>
              </Grid>
              <Grid item xs={12} style={{marginTop: 50}}>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    history("/");
                  }}
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  Home
                </Button>&nbsp;
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    history("/Login");
                  }}
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  Back
                </Button>&nbsp;
                <Button
                  color="primary"
                  variant="contained"
                  style={{ backgroundColor: "white", color: "black" }}
                  onClick={handleLogin}
                >
                  Submit
                </Button>&nbsp;
                <Button
                  variant="contained"
                  style={{ backgroundColor: "white", color: "black" }}
                  color="primary"
                  onClick={() => {
                    history("/About");
                  }}
                >
                  Next
                </Button>&nbsp;
                <Button
                  variant="contained"
                  style={{ backgroundColor: "white", color: "black" }}
                  color="primary"
                  onClick={() => {
                    window.open("about:blank", "_self");
                    window.close();
                  }}
                >
                  Exit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {/* <AppBar
        position="fixed"
        style={{
          boxShadow: "none",
          bottom: 0,
          top: "auto",
          backgroundColor: "black",
        }}
      >
        <Toolbar>
          <div style={{ flexGrow: 0.5 }} />
          <IconButton edge="end" color="inherit">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                history("/Login");
              }}
              style={{ backgroundColor: "white", color: "black" }}
            >
              Previous
            </Button>
          </IconButton>

          <IconButton edge="end" color="inherit">
            <Button
              fullWidth
              color="primary"
              variant="contained"
              style={{ backgroundColor: "white", color: "black" }}
              onClick={handleLogin}
            >
              Submit
            </Button>
          </IconButton>



          <IconButton edge="end" color="inherit">
            <Button
              variant="contained"
              style={{ backgroundColor: "white", color: "black" }}
              color="primary"
              onClick={() => {
                history("/About");
              }}
            >
              Next
            </Button>
          </IconButton>





          <IconButton edge="end" color="inherit">
            <Button
              variant="contained"
              style={{ backgroundColor: "white", color: "black" }}
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
