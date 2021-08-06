import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import { Drawer, IconButton, Toolbar} from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from "next/link"
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button"
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { DialogTitle, MenuItem } from '@material-ui/core';
import Typography from "@material-ui/core/Typography"
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import { useUser } from "../context/userContext"
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import BugReportRoundedIcon from '@material-ui/icons/BugReportRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import firebase from "../firebase/clientApp"
import raiseIssueDialog from './../pages/cmain/raiseIssueDialog';

const useStyles = makeStyles((theme) => ({
    // menuIconContainer: {
    //     marginLeft: 'auto',
    // },
}));

const drawerWidth = 240;

const NavDrawer = () => {
    const classes = useStyles()
    const { user } = useUser()
    const [drawOpen, setDrawOpen] = useState(false)

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
        {/* <IconButton className={classes.menuIconContainer} onClick={ () => setDrawOpen(!drawOpen) }><MenuOpenIcon /> </IconButton> */}
        <IconButton color="inherit" onClick={ () => setDrawOpen(!drawOpen) }><MenuIcon /> </IconButton>
        <Drawer anchor='right' open={ drawOpen } onClose={ () => setDrawOpen(false) } >
            {user === null ? (
                <List>
                    <IconButton color="inherit" onClick={ () => setDrawOpen(!drawOpen) }><ChevronRightIcon /> </IconButton>

                    <ListItem divider button>
                        <ListItemIcon><HelpRoundedIcon /></ListItemIcon>
                        <ListItemText primary="AboutUs" />
                    </ListItem>

                    <Link href="/cmain/quiz">
                        <ListItem divider button>
                            <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </Link>

                        <ListItem divider button
                            onClick={openWriteIssue}
                        >
                            <ListItemIcon>
                                <BugReportRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Raise an Issue" />
                            
                        </ListItem>

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

                    <Link href="/cprofile/leaderBoard">
                        <ListItem divider button>
                            <ListItemIcon><TrendingUpRoundedIcon /></ListItemIcon>
                            <ListItemText primary="LeaderBoard" />
                        </ListItem>
                    </Link>

                    <Link href="./login">
                        <ListItem divider button>
                            <ListItemText primary="Login / SignUp" />
                        </ListItem>
                    </Link>
                </List>
            ) : (
                <List>
                    <ListItem divider button>
                        <ListItemIcon><HelpRoundedIcon /></ListItemIcon>
                        <ListItemText primary="About Us" />
                    </ListItem>

                    <Link href="/cmain/quiz">
                        <ListItem divider button>
                            <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </Link>

                    <Link href="/cprofile/leaderBoard">
                        <ListItem divider button>
                            <ListItemIcon><TrendingUpRoundedIcon /></ListItemIcon>
                            <ListItemText primary="LeaderBoard" />
                        </ListItem>
                    </Link>

                    <ListItem divider button >
                        <ListItemIcon><AssignmentRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Create a Quiz" />
                    </ListItem>

                    <ListItem divider button >
                        <ListItemIcon><BugReportRoundedIcon /></ListItemIcon>
                        <ListItemText primary="Raise an Issue" />
                    </ListItem>

                    <ListItem divider button >
                        <raiseIssueDialog />
                    </ListItem>

                    <Link href="/cprofile/profileView">
                        <ListItem divider button >
                            <ListItemIcon><PersonRoundedIcon /></ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                    </Link>

                    <ListItem divider button >
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary="Log Out" />
                    </ListItem>
                </List>
            )}
        </Drawer>
        
        </>
    )
}

export default NavDrawer
