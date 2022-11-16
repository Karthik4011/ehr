import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import GIF2 from "../assets/gif2.gif";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import cookie from "react-cookies";
import Header from "./DoctorHeader";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Button, Dialog, DialogContent } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import profimage from "../images/profile.png";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { ToastContainer, toast } from "react-toastify";



export default function Home() {
  const history = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState(null);
  const [luser, setLuser] = React.useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [loader, setLoader] = React.useState(true);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [appntms, setAppntms] = useState(null);
  const [doctorl, setDoctorl] = React.useState(null);
  const [odoctorl, setOdoctorl] = React.useState(null);
  const [docdic, setDocdic] = useState(null);
  const [adates, setAdates] = useState([]);
  const [odates, setOdates] = useState([]);
  const [patdictionary, setPatdictionary] = React.useState(null);



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

  const onChange = (dates) => {
    setStartDate(dates);
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
    axios({
      method: "GET",
      url: "http://localhost:8081/api/availability",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      var temp = []
      for(var i=0;i<res.data.length;i++){
        if(res.data[i].doctorid == dat.id){
          temp.push(new Date(res.data[i].adate))
        }
      }
      setOdates(res.data)
      setAdates(temp)
      console.log(temp)
    });

    axios({
      method: "GET",
      url: "http://localhost:8081/api/patients",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      var temp = {};
      for (var i = 0; i < res.data.length; i++) {
        temp[res.data[i].id] = res.data[i];
      }
      setPatdictionary(temp);
    });
  }, []);

  const handleDelete = (adate) => {
    console.log(adate)
    axios({
      method: "DELETE",
      url: "http://localhost:8081/api/availability/"+adate.id,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      axios({
        method: "GET",
        url: "http://localhost:8081/api/availability",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        var temp = []
        for(var i=0;i<res.data.length;i++){
          if(res.data[i].doctorid == luser.id){
            temp.push(new Date(res.data[i].adate))
          }
        }
        setOdates(res.data)
        setAdates(temp)
      });
    });
  };

  return !loader ? (
    <Backdrop style={{ backgroundColor: "white" }} open={loader}>
      <img src={GIF2} />
    </Backdrop>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Grid container justifyContent="center" style={{ marginTop: 20 }}>
        {/* <Grid item xs={10} style={{ marginBottom: 10 }}>
          <Typography style={{ fontSize: 18, fontStyle: "italic" }}>
            Welcome Doctor, {cookie.load("user")["first_name"]}
          </Typography>
        </Grid> */}
        <Grid xs={11}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Paper>
                <Grid
                  container
                  style={{ padding: 10, maxHeight: 600, overflow: "scroll" }}
                >
                  <Grid item xs={12}>
                    <Typography>Appointment History</Typography>
                    <br></br>
                  </Grid>
                  {appntms
                    ? appntms.map((appointment) =>
                        appointment.doctorid == luser.id ? (
                          <Grid
                            item
                            xs={12}
                            style={{
                              marginBottom: 10,
                              border: "1px solid #ccc",
                              borderRadius: 5,
                            }}
                          >
                            <Paper style={{ padding: 5 }}>
                              <Grid container>
                                <Grid item xs={2} style={{ marginTop: 6 }}>
                                  <img
                                    style={{ borderRadius: 50, height: 50 }}
                                    src={profimage}
                                  ></img>
                                </Grid>
                                <Grid item xs={6}>
                                  {patdictionary ? (
                                    <span>
                                      <Typography style={{ fontSize: 14 }}>
                                        Patient Name:{" "}
                                        {
                                          patdictionary[appointment.patientid]
                                            .first_name
                                        }
                                      </Typography>
                                      <Typography style={{ fontSize: 12 }}>
                                        {patdictionary[appointment.patientid].email}
                                      </Typography>
                                      <Typography style={{ fontSize: 12 }}>
                                        Phone:{" "}
                                        {patdictionary[appointment.patientid].phone}
                                      </Typography>
                                    </span>
                                  ) : null}
                                </Grid>

                                <Grid item xs={2} style={{ padding: 10 }}>
                                  <Typography style={{ fontSize: 13 }}>
                                    Date: {appointment.bookingdate}
                                  </Typography>
                                </Grid>
                                <Grid item xs={2} style={{ marginTop: 16 }}>
                                  {appointment.status == "Cancelled" ? (
                                    <Button
                                      variant="contained"
                                      disabled
                                      size="small"
                                      style={{ fontSize: 8 }}
                                    >
                                      Cancelled
                                    </Button>
                                  ) : new Date(appointment.bookingdate) <=
                                    new Date() ? (
                                    <Button
                                      variant="contained"
                                      disabled
                                      size="small"
                                      style={{ fontSize: 8,backgroundColor:'green',color:'white' }}
                                    >
                                      Completed
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="contained"
                                      size="small"
                                      style={{ fontSize: 8 }}
                                      onClick={() => {
                                        var body = appointment;
                                        body.status = "Cancelled";

                                        axios({
                                          method: "POST",
                                          url: "http://localhost:8081/api/booking",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                          data: body,
                                        }).then((res) => {
                                          console.log(res.data);
                                          axios({
                                            method: "GET",
                                            url: "http://localhost:8081/api/bookings",
                                            headers: {
                                              "Content-Type":
                                                "application/json",
                                            },
                                          }).then((res) => {
                                            setAppntms(res.data);
                                          });
                                        });
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                  )}
                                </Grid>
                                <Grid item xs={12} style={{ marginTop: 10 }}>
                                  {appointment.documentslist
                                    .split(",")
                                    .map((doc, key) => (
                                      <a
                                        style={{
                                          fontSize: 11,
                                          textDecoration: "none",
                                          color: "blue",
                                        }}
                                        href={doc}
                                      >
                                        Document{key + 1} &nbsp;
                                      </a>
                                    ))}
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                        ) : null
                      )
                    : null}
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper style={{ paddingTop: 20, paddingBottom: 20, paddingRight:10 }}>
                <Grid container>
                  <Grid item xs={6}>
                    <DatePicker
                      selected={startDate}
                      onChange={onChange}
                      excludeDates={adates}
                      minDate={new Date()}
                      selectsDisabledDaysInRange
                      inline
                    />
                    <Button
                      variant="contained"
                      size="small"
                      style={{ marginTop: 10 }}
                      onClick={()=>{
                        axios({
                          method: "POST",
                          url: "http://localhost:8081/api/availability",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          data:{
                            doctorid: luser.id,
                            adate: startDate.toLocaleDateString('en-US')
                          }
                        }).then((res) => {
                          var temp = startDate
                          axios({
                            method: "GET",
                            url: "http://localhost:8081/api/availability",
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }).then((res) => {
                            var temp = []
                            for(var i=0;i<res.data.length;i++){
                              if(res.data[i].doctorid == luser.id){
                                temp.push(new Date(res.data[i].adate))
                              }
                            }
                            setOdates(res.data)
                            setAdates(temp)
                          });
                        });

                      }}
                    >
                      Block Date
                    </Button>
                  </Grid>
                  <Grid item xs={6} style={{textAlign:"left", maxHeight: 300, overflow:"scroll", paddingRight: 10}}>
                      {odates.map((adate)=>(
                        <Chip label={adate.adate} style={{margin:"5px"}} onDelete={()=>handleDelete(adate)} />
                      ))}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

     <AppBar position="fixed"  style={{boxShadow:"none",bottom:0,top:"auto", backgroundColor:"white"}}>
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
                history("/DoctorHome");
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
                history("/DoctorHome");
              }}
            >
              Back
            </Button>
            </IconButton>
            <IconButton edge="end" color="inherit">
            <Button
              variant="contained"
              style={{backgroundColor:"white", color:"black"}}
              color="primary"
              onClick={() => {
                history("/DoctorHome");
              }}
            >
              Submit
            </Button>
            </IconButton>
          <IconButton edge="end" color="inherit">
            <Button
              variant="contained"
              style={{backgroundColor:"white", color:"black"}}
              color="primary"
              onClick={() => {
                history("/DoctorProfile");
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
      </AppBar> 
    </Box>
  );
}
