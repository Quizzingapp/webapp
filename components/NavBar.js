import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import { Menu, MenuList, Tab, Tabs, useMediaQuery, useTheme, Drawer } from '@material-ui/core';
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { DialogTitle, MenuItem } from '@material-ui/core';
import Link from "next/link"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import ContactMailRoundedIcon from '@material-ui/icons/ContactMailRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentTurnedInRoundedIcon from '@material-ui/icons/AssignmentTurnedInRounded';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Table } from '@material-ui/core';
import BugReportRoundedIcon from '@material-ui/icons/BugReportRounded';

import { useUser } from "../context/userContext"
import firebase from "../firebase/clientApp"
import NavDrawer from './NavDrawer';
import raiseIssueDialog from '../pages/cmain/raiseIssueDialog';

const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontWeight: 600,
      letterSpacing: 2,
    },
}));

const ButtonAppBar = () => {
    const classes = useStyles()
    const { user } = useUser()

    const handleClick = () => {
      firebase.auth().signOut()
  }

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [activityOpen, setActivityOpen] = React.useState(false);
    const anchorRefAct = React.useRef(null);

    const handleOpenActivity = () => {
        setActivityOpen((prevOpen) => !prevOpen);
    };
  
    const handleCloseActivity = (event) => {
      if (anchorRefAct.current && anchorRefAct.current.contains(event.target)) {
        return;
      }
      setActivityOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setActivityOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(activityOpen);
    React.useEffect(() => {
      if (prevOpen.current === true && activityOpen === false) {
        anchorRefAct.current.focus();
      }
  
      prevOpen.current = activityOpen;
    }, [activityOpen]);

    const [profileOpen, setProfileOpen] = React.useState(false);
    const anchorRefProf = React.useRef(null);

    const handleOpenProfile = () => {
        setProfileOpen((prevOpenProf) => !prevOpenProf);
    };
  
    const handleCloseProf = (event) => {
      if (anchorRefProf.current && anchorRefProf.current.contains(event.target)) {
        return;
      }
  
      setProfileOpen(false);
    };
  
    function handleListKeyDownProf(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setProfileOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpenProf = React.useRef(profileOpen);
    React.useEffect(() => {
      if (prevOpenProf.current === true && profileOpen === false) {
        anchorRefProf.current.focus();
      }
  
      prevOpenProf.current = profileOpen;
    }, [profileOpen]);


    // Breakpoints
    const theme = useTheme();
    const isMatching = useMediaQuery(theme.breakpoints.down('sm'));

    const [issue, setIssue] = React.useState(false);
    const openWriteIssue = () => {
        setIssue(true);
    }
    const closeWriteIssue = () => {
        setIssue(false);
    }
    const initialState = { name: "", email: "", message: "" }
    const [form, setForm] = useState(initialState)
    const updateField = (e) => {
        e.preventDefault()
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const submitForm = (e) => {
        alert("Submit");
        e.preventDefault();
        firebase.collection("issueMessages").add(form),
        setForm(initialState)
        .then(() => {
            alert("Message submitted successfully!");
        })
        .catch((error) => {
            alert(error.message);
        });
    }

    const raiseIssueBody = (
        <form noValidate onSubmit={submitForm}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={form.name}
                onChange={updateField}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={form.email}
                onChange={updateField}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="issue"
                label="Type issue here"
                id="issue"
                autoComplete="issue"
                value={form.issue}
                onChange={updateField}
            />
        </form>
    )

    return (
        <>
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h5" className={classes.title}>
                    Quizz
                </Typography>

                {isMatching ? <NavDrawer /> : (
                  <>
                  {user === null ? (
                  <Tabs
                    value={value}
                    onChange={handleChange}
                >
                    <Tab icon={<HelpRoundedIcon fontSize="small" />} disableRipple label='About Us' />
                    <Tab icon={<HomeRoundedIcon fontSize="small" />} disableRipple label='Home' />

                    <Tab onClick={openWriteIssue} icon={<BugReportRoundedIcon fontSize="small" />} disableRipple label='Raise Issue' />
                      <Dialog open={issue} onClose={closeWriteIssue} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Raise an Issue</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Please specify the issue in the below form and click submit.
                                    {raiseIssueBody}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={closeWriteIssue} color="primary">
                                    Cancel
                                </Button>
                                <Button type="submit" onClick={closeWriteIssue} color="primary">
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>
                    <Tab icon={<TrendingUpRoundedIcon fontSize="small" />} disableRipple label='LeaderBoard' />
                    <Link href="./login">
                            <Button color="inherit">Login / SignUp</Button>
                        </Link>
                </Tabs>
                    ) : (
                      <Tabs
                    value={value}
                    onChange={handleChange}
                >
                    <Tab icon={<HelpRoundedIcon fontSize="small" />} disableRipple label='About Us' />
                    <Tab icon={<HomeRoundedIcon fontSize="small" />} disableRipple label='Home' />
                    <Tab icon={<TrendingUpRoundedIcon fontSize="small" />} disableRipple label='LeaderBoard' />
                    <Tab 
                        ref={anchorRefAct}
                        aria-controls={activityOpen ? 'activityMenu' : undefined}
                        aria-haspopup="true"
                        onClick={ handleOpenActivity } 
                        icon={<AssignmentRoundedIcon fontSize="small" />} 
                        disableRipple 
                        label='Activity' 
                        />
                    <Tab 
                        ref={anchorRefProf}
                        aria-controls={profileOpen ? 'profileMenu' : undefined}
                        aria-haspopup="true"
                        onClick={ handleOpenProfile } 
                        icon={<PersonRoundedIcon fontSize="small" />} 
                        disableRipple 
                        label='Profile' 
                        />  
                </Tabs>
                    )}
                  </>
                )}                
            </Toolbar>
        </AppBar>
        <Popper style={{ zIndex: '1' }} open={activityOpen} anchorEl={anchorRefAct.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseActivity}>
                  <MenuList autoFocusItem={activityOpen} id="activityMenu" onKeyDown={handleListKeyDown}>
                  <Link href="/cmain/quiz">
                        <MenuItem 
                            onClick={handleCloseActivity}
                        >
                            <ListItemIcon>
                                <CreateRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Create Quiz" />
                        </MenuItem>
                    </Link>
                    <Link href="/cmain/quiz">
                        <MenuItem 
                            onClick={openWriteIssue}
                            onClick={handleCloseActivity}
                        >
                            <ListItemIcon>
                                <BugReportRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Raise an Issue" />
                        </MenuItem>
                        
                    </Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Popper style={{ zIndex: '1' }} open={profileOpen} anchorEl={anchorRefProf.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProf}>
                  <MenuList autoFocusItem={profileOpen} id="profileMenu" onKeyDown={handleListKeyDownProf}>
                    <Link href="/cprofile/profileView">
                        <MenuItem 
                            onClick={handleCloseProf}
                        >
                            <ListItemIcon>
                                <ContactMailRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Info" />
                        </MenuItem>
                    </Link>
                    <MenuItem 
                        onClick={handleClick}
                    >
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="LogOut" />
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </>
    )
}

export default ButtonAppBar;