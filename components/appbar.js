import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Link from "next/link"
import { useUser } from "../context/userContext"
import firebase from "../firebase/clientApp"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontWeight: 600,
        letterSpacing: 2,
    },
}))

export default function ButtonAppBar() {
    const classes = useStyles()
    const { user } = useUser()

    const handleClick = () => {
        firebase.auth().signOut()
    }

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
        </div>
    )
}
