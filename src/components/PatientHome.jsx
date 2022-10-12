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
import { Button, Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import { Cancel } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const history = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState(null);
  const [search, setSearch] = React.useState(null);
  const [doctorl, setDoctorl] = React.useState(null);
  const [odoctorl, setOdoctorl] = React.useState(null);
  const [seldoc, setSeldoc] = React.useState(null);
  const [dopen, setDopen] = React.useState(false);
  const [luser, setLuser] = React.useState(null);

  const [loader, setLoader] = React.useState(true);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [appntms, setAppntms] = useState(null);
  const [docdic, setDocdic] = useState(null);

  const onChange = (dates) => {
    setStartDate(dates);
  };

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
    setLuser(dat);
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
      setDoctorl(res.data);
      setOdoctorl(res.data);
      var temp = {};
      for (var i = 0; i < res.data.length; i++) {
        temp[res.data[i].id] = res.data[i];
      }
      setDocdic(temp);
      console.log(temp);
    });
    axios({
      method: "GET",
      url: "http://localhost:8081/api/bookings",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setAppntms(res.data);
    });
  }, []);

  const bookAppointment = () => {
    var body = {
      doctorid: seldoc.id,
      patientid: luser.id,
      bookingdate: startDate.toLocaleDateString("en-US"),
    };
    console.log(body);

    axios({
      method: "POST",
      url: "http://localhost:8081/api/booking",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    }).then((res) => {
      if (res.status == 200) {
        toast.info("Booked Appointment Successfully", {
          position: "bottom-center",
          pauseOnHover: true,
          draggable: true,
          autoClose: true,
        });
        axios({
          method: "GET",
          url: "http://localhost:8081/api/bookings",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          setAppntms(res.data);
        });
      }
    });
  };

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
        <Grid item xs={10}></Grid>
        <Grid item xs={11}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Paper>
                <Grid container style={{ padding: 10 }}>
                  <Grid item xs={12}>
                    <Typography>Appointment History</Typography><br></br>
                  </Grid>
                  {appntms
                    ? appntms.map((appointment) => 
                    appointment.patientid == luser.id ?
                    (
                        <Grid item xs={12} style={{marginBottom: 10, border:"1px solid #ccc", borderRadius:5}}>
                          <Paper style={{padding:5}}>
                            <Grid container>
                              <Grid item xs={2} style={{marginTop:6}}>
                                <img
                                  style={{ borderRadius: 50, height: 50 }}
                                  src="https://xsgames.co/randomusers/assets/avatars/male/74.jpg"
                                ></img>
                              </Grid>
                              <Grid item xs={6}>
                                {docdic ? (
                                  <span>
                                    <Typography style={{ fontSize: 14 }}>
                                      Doctot Name: {docdic[appointment.doctorid].first_name}
                                    </Typography>
                                    <Typography style={{ fontSize: 12 }}>
                                      {docdic[appointment.doctorid].email}
                                    </Typography>
                                    <Typography style={{ fontSize: 12 }}>
                                      Phone:{" "}
                                      {docdic[appointment.doctorid].phone}
                                    </Typography>
                                  </span>
                                ) : null}
                              </Grid>

                              <Grid item xs={2} style={{padding: 10}}>
                                <Typography style={{fontSize: 13}}>Date: {appointment.bookingdate}</Typography>
                                
                              </Grid>
                              <Grid item xs={2} style={{marginTop: 16}}>
                              
                                {new Date(appointment.bookingdate) <=  new Date()?
                                (<Button variant="contained" disabled size="small" style={{fontSize:8}}>
                                  Completed
                                </Button>) : (
                                    <Button variant="contained" size="small" style={{fontSize:8}}>
                                    Cancel
                                  </Button>
                                ) }
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      )
                      : null
                    )
                    : null}
                </Grid>
              </Paper>
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
                        console.log("searching");
                        if (
                          event.target.value == "" ||
                          event.target.value == null
                        ) {
                          setDoctorl(odoctorl);
                        } else {
                          var temp = [];
                          var li = doctorl;
                          for (var i = 0; i < li.length; i++) {
                            if (
                              li[i].first_name
                                .toLowerCase()
                                .includes(event.target.value.toLowerCase())
                            ) {
                              temp.push(li[i]);
                            }
                          }
                          setDoctorl(temp);
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container style={{ marginTop: 20 }} spacing={1}>
                      {doctorl &&
                        doctorl.map((doc) => (
                          <Grid item xs={4}>
                            <Paper style={{ padding: 10 }}>
                              <Grid container justifyContent="center">
                                <Grid item xs={12}>
                                  <img
                                    style={{ borderRadius: 50, height: 100 }}
                                    src="https://xsgames.co/randomusers/assets/avatars/male/74.jpg"
                                  ></img>
                                </Grid>
                                <Grid item xs={12} style={{ marginTop: 10 }}>
                                  <Typography style={{ fontSize: 14 }}>
                                    {doc.first_name}
                                  </Typography>
                                  <Typography style={{ fontSize: 12 }}>
                                    {doc.email}
                                  </Typography>
                                  <Typography style={{ fontSize: 12 }}>
                                    Specialization: {doc.specialization}
                                  </Typography>
                                  <Typography style={{ fontSize: 12 }}>
                                    Phone: {doc.phone}
                                  </Typography>
                                </Grid>
                                <Grid item xs={10} style={{ marginTop: 5 }}>
                                  <Button
                                    value={doc}
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={(event) => {
                                      console.log(doc);
                                      setSeldoc(doc);
                                      setDopen(true);
                                    }}
                                  >
                                    Book Appointment
                                  </Button>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                        ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={dopen}>
        <DialogContent style={{ height: 500, width: 500 }}>
          <Grid container justifyContent="center">
            <Grid item xs={12} style={{ textAlign: "right", padding: "10px" }}>
              <Cancel
                onClick={() => {
                  setDopen(false);
                }}
                style={{ cursor: "pointer" }}
              ></Cancel>
            </Grid>
            {seldoc ? (
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography style={{ fontSize: 14 }}>
                  Doctor: {seldoc.first_name} {seldoc.last_name}
                </Typography>
                <Typography style={{ fontSize: 12 }}>{seldoc.email}</Typography>
                <Typography style={{ fontSize: 12 }}>
                  Specialization: {seldoc.specialization}
                </Typography>
                <Typography style={{ fontSize: 12 }}>
                  Phone: {seldoc.phone}
                </Typography>
              </Grid>
            ) : null}
            <Grid item xs={12} style={{ textAlign: "center", marginTop: 20 }}>
              <DatePicker
                selected={startDate}
                onChange={onChange}
                excludeDates={[new Date(), new Date("10/13/2022")]}
                minDate={new Date()}
                selectsDisabledDaysInRange
                inline
              />
            </Grid>
            <Grid xs={5} style={{ marginTop: 10 }} onClick={bookAppointment}>
              <Button fullWidth size="small" variant="contained">
                Confirm Appointment
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

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
