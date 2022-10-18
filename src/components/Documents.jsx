import React, { useState, useEffect, useCallback } from "react";
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
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { useDropzone } from "react-dropzone";
import filupload from "../images/fileupload.jpeg";
import emptydoc from "../images/nodocuments.png";
import firebase from "../Firebase/Firebase";
import CircularProgress from '@mui/material/CircularProgress';


export default function Home() {
  const history = useNavigate();
  const [loader, setLoader] = React.useState(true);
  const [selfile, setSelfile] = React.useState(false);
  const [progres, setProgres] = useState(null);
  const [imageurl, setImageurl] = useState(null);
  const [luser, setLuser] = React.useState(null);
  const [doclis, setDoclis] = React.useState(null);


  const onDrop = useCallback((picture) => {
    console.log(picture)
    console.log(luser)
    setSelfile(picture)
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
            console.log("file");
            console.log(url)
            axios({
              method: "POST",
              url: "http://localhost:8081/api/documents",
              headers: {
                "Content-Type": "application/json",
              },
              data: {
                "userid": cookie.load("user").id,
                "documenturl": url,
                "documentname": picture[0].name
              },
            }).then((res) => {
              console.log(res)
              axios({
                method: "GET",
                url: "http://localhost:8081/api/documents/user/"+cookie.load("user").id,
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((res) => {
                console.log(res)
                setImageurl(url);
                setProgres(null);
              });
            });
          });
        }
      );
    } else {
      setImageurl(null);
      setProgres(null);
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
      url: "http://localhost:8081/api/documents/user/"+dat.id,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res.data)
      setDoclis(res.data)
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
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Paper style={{ padding: 20 }}>
              <Grid container>
                <Grid item xs={12} style={{backgroundColor:"#ccc",padding:10, marginBottom:40,borderRadius:5}}>
                  <Typography>
                    My Documents
                  </Typography>
                </Grid>
              </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    {doclis && doclis.length > 0 ? doclis.map((doc)=>(
                      <Paper style={{ padding: 20,marginBottom:10 }}>
                      <Grid container>
                        <Grid
                          item
                          xs={10}
                          style={{ textAlign: "center", paddingLeft: 20 }}
                        >
                          <Typography>{doc.documentname}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <a href={doc.documenturl} style={{cursor:"pointer"}} download target="_blank">
                          <DownloadForOfflineIcon style={{cursor:"pointer",  textDecoration:"none", color:"black", fontSize:25}}></DownloadForOfflineIcon>
                          </a>
                        </Grid>
                      </Grid>
                    </Paper>
                    )): (
                      <div>
                      <img src={emptydoc} style={{height:100}}></img>
                      <Typography>
                        No Documents Found
                      </Typography>
                      </div>
                    )}
                    
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={12}>
                  <Paper style={{ padding: 5 }}>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {progres ? (
                        <div>
                         <CircularProgress />
                        </div>
                      ) : (
                        <p>
                          <img src={filupload} style={{height:205, cursor:"pointer"}}></img>
                        </p>
                      )}
                    </div>
                  </Paper>
                </Grid>
              </Grid>
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
