import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Modal from "@material-ui/core/Modal"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Link from "next/link"
import { useUser } from "../context/userContext"
import firebase from "../firebase/clientApp"
import { Container, Icon } from "@material-ui/core"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import Collapse from "@material-ui/core/Collapse"
import ContactMailRoundedIcon from "@material-ui/icons/ContactMailRounded"
import StarRoundedIcon from "@material-ui/icons/StarRounded"
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded"
import TrendingUpRoundedIcon from "@material-ui/icons/TrendingUpRounded"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import AssignmentTurnedInRoundedIcon from "@material-ui/icons/AssignmentTurnedInRounded"
import CreateRoundedIcon from "@material-ui/icons/CreateRounded"
import BugReportRoundedIcon from "@material-ui/icons/BugReportRounded"
import HomeRoundedIcon from "@material-ui/icons/HomeRounded"
import PersonRoundedIcon from "@material-ui/icons/PersonRounded"
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded"
import HelpRoundedIcon from "@material-ui/icons/HelpRounded"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import { NavLink, useHistory, useLocation } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    active: {
        background: "#f4f4f4",
    },
    container: {
        display: "flex",
        flexDirection: "row",
        marginRight: theme.spacing(10),
    },
    root: {
        flexGrow: 1,
    },
    label: {
        // Aligns the content of the button vertically.
        flexDirection: "column",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontWeight: 600,
        letterSpacing: 2,
    },
    flexContainer: {
        display: "flex",
        flexDirection: "row",
        padding: 0,
    },
    dropDown: {
        display: "flex",
        flexDirection: "column",
        padding: 0,
    },
}))

export default function ButtonAppBar() {
    const classes = useStyles()
    const { user } = useUser()
    const [open, setOpen] = React.useState(false)
    const [activityOpen, setActivityOpen] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [anchorE2, setAnchorE2] = React.useState(null)

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
        setOpen(!open)
    }

    const handleClose = () => {
        setAnchorEl(null)
        setOpen(!open)
    }

    const handleOpen2 = (event) => {
        setAnchorE2(event.currentTarget)
        setActivityOpen(!activityOpen)
    }

    const handleClose2 = () => {
        setAnchorE2(null)
        setActivityOpen(!activityOpen)
    }

    // const handleExpand = () => {
    //     setOpen(!open);
    // };

    const handleClick = () => {
        firebase.auth().signOut()
        router.push("cmain/login")
    }

    const [issue, setIssue] = React.useState(false)
    const openWriteIssue = () => {
        setIssue(true)
    }
    const closeWriteIssue = () => {
        setIssue(false)
    }
    const initialState = { name: "", email: "", message: "" }
    const [form, setForm] = useState(initialState)
    const updateField = (e) => {
        e.preventDefault()
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const submitForm = (e) => {
        alert("Submit")
        e.preventDefault()
        firebase.collection("issueMessages").add(form),
            setForm(initialState)
                .then(() => {
                    alert("Message submitted successfully!")
                })
                .catch((error) => {
                    alert(error.message)
                })
    }

    const raiseIssueBody = (
        <form className={classes.form} noValidate onSubmit={submitForm}>
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
        <div className={classes.root}>
            <AppBar position="sticky">
                <Toolbar>
                    {/* <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h5" className={classes.title}>
                        Quizz
                    </Typography>

                    {user === null ? (
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            className={classes.flexContainer}
                        >
                            <Link href="/cmain/quiz">
                                <ListItem button>
                                    <ListItemIcon>
                                        <HomeRoundedIcon />
                                    </ListItemIcon>

                                    <ListItemText primary="Home" />
                                </ListItem>
                            </Link>

                            <ListItem button>
                                <ListItemIcon>
                                    <HelpRoundedIcon />
                                </ListItemIcon>

                                <ListItemText primary="About Us" />
                            </ListItem>

                            <Link href="./login">
                                <ListItem button>
                                    <ListItemIcon>
                                        <HomeRoundedIcon />
                                    </ListItemIcon>

                                    <ListItemText primary="Login / SignUp" />
                                </ListItem>
                            </Link>
                        </List>
                    ) : (
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            className={classes.flexContainer}
                        >
                            {/* <ListItem
                                button
                                key={navItems[0].text}
                                onClick={() => history.push(navItems[0].path)}
                                className = {location.pathname == navItems[0].path ? classes.active : null}
                            >
                                <ListItemIcon>
                                    {navItems[0].icon}
                                </ListItemIcon>

                                <ListItemText primary={navItems[0].text} />

                            </ListItem> */}

                            <Link href="/cmain/quiz">
                                {/* <NavLink to='/cmain/quiz' activeClassName="active"> */}
                                <ListItem
                                    button
                                    // className={``}
                                >
                                    <ListItemIcon>
                                        <HomeRoundedIcon />
                                    </ListItemIcon>

                                    <ListItemText primary="Home" />
                                </ListItem>
                                {/* </NavLink> */}
                            </Link>

                            <ListItem button>
                                <ListItemIcon>
                                    <HelpRoundedIcon />
                                </ListItemIcon>

                                <ListItemText primary="About Us" />
                            </ListItem>

                            <ListItem button onClick={handleOpen2}>
                                <ListItemIcon>
                                    <AssignmentRoundedIcon />
                                </ListItemIcon>

                                <ListItemText primary="Activity" />
                                {activityOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorE2}
                                keepMounted
                                open={Boolean(anchorE2)}
                                onClose={handleClose2}
                            >
                                <Link href="/cmain/quiz">
                                    <MenuItem onClick={handleClose2}>
                                        <ListItemIcon>
                                            <AssignmentTurnedInRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Attempted Quiz" />
                                    </MenuItem>
                                </Link>

                                <Link href="/cmain/quiz">
                                    <MenuItem onClick={handleClose2}>
                                        <ListItemIcon>
                                            <CreateRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Create Quiz" />
                                    </MenuItem>
                                </Link>

                                {/* <Link href="/cmain/quiz"> */}
                                <div>
                                    <MenuItem onClick={openWriteIssue}>
                                        <ListItemIcon>
                                            <BugReportRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Raise an Issue" />
                                    </MenuItem>

                                    <Dialog
                                        open={issue}
                                        onClose={closeWriteIssue}
                                        aria-labelledby="form-dialog-title"
                                    >
                                        <DialogTitle id="form-dialog-title">
                                            Raise an Issue
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Please specify the issue in the
                                                below form and click submit.
                                                {raiseIssueBody}
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button
                                                onClick={closeWriteIssue}
                                                color="primary"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                onClick={closeWriteIssue}
                                                color="primary"
                                            >
                                                Submit
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    {/* </Link> */}
                                </div>
                            </Menu>

                            <ListItem button onClick={handleOpen}>
                                <ListItemIcon>
                                    <PersonRoundedIcon />
                                </ListItemIcon>

                                <ListItemText primary="Profile" />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <Link href="/cprofile/profileView">
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <ContactMailRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="My Info" />
                                    </MenuItem>
                                </Link>

                                <Link href="/cprofile/leaderBoard">
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <TrendingUpRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Leader Board" />
                                    </MenuItem>
                                </Link>

                                <Link href="/cmain/quiz">
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <StarRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Points and Rewards" />
                                    </MenuItem>
                                </Link>

                                <Link href="/cmain/quiz">
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <SettingsRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Settings" />
                                    </MenuItem>
                                </Link>

                                <Link href="/cmain/quiz">
                                    <MenuItem
                                        // onClick={handleClose; handleClick}
                                        onClick={() => {
                                            handleClose
                                            handleClick
                                        }}
                                    >
                                        <ListItemIcon>
                                            <ExitToAppIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="LogOut" />
                                    </MenuItem>
                                </Link>
                            </Menu>
                        </List>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}
