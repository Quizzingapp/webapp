import React from "react"
import { Button, Typography, makeStyles } from "@material-ui/core"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useUser } from "../context/userContext"
import firebase from "../firebase/clientApp"

const useStyles = makeStyles((theme) => ({
    main: {
        backgroundColor: "#81B1CC",
        height: "100vh",
    },
    divMain: {
        backgroundColor: "#F5F3E7",
        display: "flex",
        padding: theme.spacing(5),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
    },
}))

export default function Home() {
    const router = useRouter()
    const onButtonPress = () => {
        router.push("./cmain/quiz")
    }

    const classes = useStyles()

    return (
        <div>
            <Head>
                <title>Home|Quizzing App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={classes.main}>
                <div className={classes.divMain}>
                    <Typography
                        className={classes.a}
                        variant="h2"
                        component="h1"
                    >
                        Quizzing App
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => onButtonPress()}
                        color="primary"
                        style={{ marginTop: 20 }}
                    >
                        Get Started
                    </Button>
                </div>
            </main>

            {/* <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }
                * {
                    box-sizing: border-box;
                }
            `}</style> */}
        </div>
    )
}
