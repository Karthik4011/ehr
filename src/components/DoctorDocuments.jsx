import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import GIF2 from "../assets/gif2.gif";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import cookie from "react-cookies";
import Header from "./DoctorHeader";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Button, Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import { Cancel } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { useDropzone } from "react-dropzone";
import filupload from "../images/fileupload.jpeg";
import DeleteIcon from "@mui/icons-material/Delete";
import emptydoc from "../images/nodocuments.png";
import firebase from "../Firebase/Firebase";
import CircularProgress from "@mui/material/CircularProgress";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from "@mui/material/IconButton";

export default function Home() {
  const history = useNavigate();
  const [loader, setLoader] = React.useState(true);
  const [selfile, setSelfile] = React.useState(false);
  const [progres, setProgres] = useState(null);
  const [imageurl, setImageurl] = useState(null);
  const [luser, setLuser] = React.useState(null);
  const [doclis, setDoclis] = React.useState(null);
  const [patdoc, setPatdoc] = React.useState(null);
  const [patlist, setPatlist] = React.useState(null);
  const [patdictionary, setPatdictionary] = React.useState(null);



  const onDrop = useCallback((picture) => {
    console.log("inside drop")
    var patdoc = cookie.load("booking")
    setSelfile(picture);
    console.log(patdoc)
    setProgres(5);
    if (picture.length != 0) {
      var storage = firebase.storage();
      var storageRef = storage.ref();
      var uploadTask = storageRef
        .child("ehr/" + picture[0].name)
        .put(picture[0]);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          var progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgres(progress);
        },
        (error) => {
          throw error;
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log(url);
            var body = patdoc;
            var olist = body.documentslist.split(",")
            console.log(olist)
            olist.push(url)
            console.log(olist)
            body.documentslist = olist.join(", ")
            console.log("body")
            console.log(body)
            axios({
              method: "POST",
              url: "http://localhost:8081/api/booking",
              headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
              },
              data: body
            }).then((res) => {
              toast.info("Report Uploaded successfully.", {
                position: "bottom-center",
                pauseOnHover: true,
                draggable: true,
                autoClose: true,
              });

              setImageurl(url);
              setProgres(null);
              setPatdoc(null)
              cookie.remove("booking")
            });
          });
        }
      );
    } else {
      setImageurl(null);
      setProgres(null);
      setPatdoc(null)
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    setLoader(true);
    var dat = cookie.load("user");
    setLuser(dat);
    if (!dat) {
      history("/Login");
    }
    axios({
      method: "GET",
      url: "http://localhost:8081/api/documents/user/" + dat.id,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.data);
      setDoclis(res.data);
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
      console.log(temp)
    });
    axios({
      method: "GET",
      url: "http://localhost:8081/api/bookings",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setPatlist(res.data);
    });
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
        <Grid item xs={11}>
          <Grid container justifyContent="center" spacing={1}>
            {/* <Grid item xs={8}>
              <Paper style={{ padding: 20 }}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    style={{
                      backgroundColor: "#ccc",
                      padding: 10,
                      marginBottom: 40,
                      borderRadius: 5,
                    }}
                  >
                    <Typography>My Documents</Typography>
                  </Grid>
                </Grid>
                <Grid container style={{ maxHeight: 700, overflow: "scroll" }}>
                  <Grid item xs={12}>
                    {doclis && doclis.length > 0 ? (
                      doclis.map((doc) => (
                        <Paper style={{ padding: 20, marginBottom: 10 }}>
                          <Grid container>
                            <Grid item xs={1}>
                              <Button
                                style={{ color: "black" }}
                                value={doc.id}
                                onClick={(event) => {
                                  console.log(event);
                                  axios({
                                    method: "DELETE",
                                    url:
                                      "http://localhost:8081/api/documents/" +
                                      doc.id,
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                  }).then((res) => {
                                    axios({
                                      method: "GET",
                                      url:
                                        "http://localhost:8081/api/documents/user/" +
                                        luser.id,
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                    }).then((res) => {
                                      console.log(res.data);
                                      setDoclis(res.data);
                                    });
                                  });
                                }}
                              >
                                <DeleteIcon
                                  style={{ cursor: "pointer" }}
                                ></DeleteIcon>
                              </Button>
                            </Grid>
                            <Grid
                              item
                              xs={9}
                              style={{ textAlign: "center", paddingLeft: 20 }}
                            >
                              <Typography>{doc.documentname}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <a
                                href={doc.documenturl}
                                style={{ cursor: "pointer" }}
                                download
                                target="_blank"
                              >
                                <DownloadForOfflineIcon
                                  style={{
                                    cursor: "pointer",
                                    textDecoration: "none",
                                    color: "black",
                                    fontSize: 25,
                                  }}
                                ></DownloadForOfflineIcon>
                              </a>
                            </Grid>
                          </Grid>
                        </Paper>
                      ))
                    ) : (
                      <div>
                        <img src={emptydoc} style={{ height: 100 }}></img>
                        <Typography>No Documents Found</Typography>
                      </div>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Grid> */}
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={12} style={{marginBottom:20}}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Appointment</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Appointment"
                      value={patdoc}
                      onChange={(event)=>{
                        cookie.save("booking", event.target.value)
                        setPatdoc(event.target.value)
                        console.clear()
                        console.log(event.target.value)
                      }}
                    >
                      {patlist && patdictionary? patlist.map((booking)=> booking.doctorid == luser.id ? (
                        <MenuItem value={booking}>{patdictionary[booking.patientid].first_name} - {booking.bookingdate}</MenuItem>
                      ): null) :null}
                    </Select>
                  </FormControl>
                </Grid>
                {patdoc ? (<Grid item xs={12}>
                  <Paper style={{ padding: 5 }}>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {progres ? (
                        <div>
                          <CircularProgress />
                        </div>
                      ) : (
                        <p>
                          <img
                            src={filupload}
                            style={{ height: 205, cursor: "pointer" }}
                          ></img>
                        </p>
                      )}
                    </div>
                  </Paper>
                </Grid>) : null }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <AppBar
        position="fixed"
        style={{
          boxShadow: "none",
          bottom: 60,
          top: "auto",
          backgroundColor: "white",
        }}
      >
        <Toolbar>
          <div style={{ flexGrow: 0.5 }} />
          <IconButton edge="end" color="inherit"></IconButton>
          <IconButton edge="end" color="inherit">
            <Button
              variant="contained"
              style={{ backgroundColor: "white", color: "black" }}
              color="primary"
              onClick={() => {
                history("/PatientHome");
              }}
            >
              Previous
            </Button>
          </IconButton>
          <IconButton edge="end" color="inherit">
            <Button
              variant="contained"
              style={{ backgroundColor: "white", color: "black" }}
              color="primary"
              onClick={() => {
                history("/PatientProfile");
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
                history("/PatientHome");
              }}
            >
              Home
            </Button>
          </IconButton>
          <IconButton edge="end" color="inherit">
            <Button
              variant="contained"
              style={{ backgroundColor: "white", color: "black" }}
              color="primary"
              onClick={() => {
                cookie.remove("user");
                toast.info("Application exited successfully", {
                  position: "bottom-center",
                  pauseOnHover: true,
                  draggable: true,
                  autoClose: true,
                });
                history("/Login");
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
