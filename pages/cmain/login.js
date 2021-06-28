import React, { useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "next/link"
import { default as Hot } from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import firebase from "../../firebase/clientApp"
import { useUser } from "../../context/userContext"

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link href="#">
                <Hot color="inherit">MMOC</Hot>
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        padding: theme.spacing(3),
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

export default function Login() {
    const classes = useStyles()
    const { setUser } = useUser()
    const [form, setForm] = useState({ email: "", password: "" })
    const updateField = (e) => {
        e.preventDefault()
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const submitForm = (e) => {
        e.preventDefault()
        firebase
            .auth()
            .signInWithEmailAndPassword(form.email, form.password)
            .then((user) => setUser(user.user))
            .catch((error) => {
                var errorCode = error.code
                var errorMessage = error.message
                if (errorCode === "auth/wrong-password") {
                    alert("Wrong password.")
                } else {
                    alert(errorMessage)
                }
                console.log(error)
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={submitForm}>
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
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={form.password}
                        onChange={updateField}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="./quiz" variant="body2">
                                <Hot color="secondary">Forgot password?</Hot>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="./signup" variant="body2">
                                <Hot color="primary">
                                    Don't have an account? Sign Up
                                </Hot>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    )
}
