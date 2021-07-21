import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Link from "next/link"
import { useUser } from "../context/userContext"
import firebase from "../firebase/clientApp"

const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

const NavBar = () => {
    const classes = useStyles()
    const { user } = useUser()

    const handleClick = () => {
        firebase.auth().signOut()
    }

    return (
        // <h1>NavBar</h1>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" className={classes.title}>
                    Quizz
                </Typography>
                {user === null ? (
                    <Link href="./login">
                        <Button color="inherit">Login / SignUp</Button>
                    </Link>
                ) : (
                    <Button color="inherit" onClick={handleClick}>
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar