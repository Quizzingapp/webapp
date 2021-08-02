import React, { useState } from "react"
import MyAppBar from "../../components/appbar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded"
import Card from "@material-ui/core/Card"
import { CardContent } from "@material-ui/core"
import Link from "next/link"
import firebase from "../../firebase/clientApp"
import { useRouter } from "next/router"
import { action, useStoreActions, useStoreState } from "easy-peasy"
import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise"

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        maxWidth: 400,
        backgroundColor: "#F5F5F5",
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    board: {
        height: 400,
        backgroundColor: "#f5f5f5",
        textAlign: "center",
    },
    carditem: {
        height: 200,
        textAlign: "center",
        backgroundColor: "#fdf0d5",
        paddingTop: 80,
        "&:hover": {
            backgroundColor: "#f9dcc4",
            transform: "scale3d(1.2, 1.2, 2)",
            boxShadow: "-12px 12px 64px 0 #bcc3d6",
        },
    },
}))

const quiz = () => {
    const classes = useStyles()
    const router = useRouter()
    const addName = useStoreActions((action) => action.section.addName)
    const addDescription = useStoreActions(
        (action) => action.section.addDescription
    )
    const addTopic = useStoreActions((action) => action.section.addTopic)

    const handleCardClick = (item) => {
        addName(item.title)
        //addDescription(item.description)
        //addTopic(item.topics)
        router.push(`./${item.title}`)
    }
    const shadowStyles = useSoftRiseShadowStyles()
    const gridItem = [
        { title: "True or False" },
        { title: "One Minute" },
        { title: "Quiz" },
        { title: "Brain Teaser" },
        { title: "Current Affairs" },
        { title: "Match Words" },
    ]

    return (
        <>
            <MyAppBar />
            <CssBaseline />
            <Container maxWidth="xl" style={{ marginTop: 24 }}>
                <Grid container spacing={5}>
                    <Grid item xs={12} lg={9}>
                        <Paper component="form" className={classes.root}>
                            <InputBase
                                className={classes.input}
                                placeholder="Enter code to join"
                                inputProps={{
                                    "aria-label": "enter code to join",
                                }}
                            />
                            <IconButton
                                type="submit"
                                className={classes.iconButton}
                                aria-label="next"
                            >
                                <NavigateNextRoundedIcon />
                            </IconButton>
                        </Paper>
                        <Grid container spacing={3} style={{ marginTop: 24 }}>
                            {gridItem.map((item) => (
                                <Grid item lg={4} sm={6} xs={12}>
                                    <Card
                                        className={shadowStyles.root}
                                        onClick={() => handleCardClick(item)}
                                    >
                                        <CardContent
                                            className={classes.carditem}
                                        >
                                            <Typography
                                                variant="h6"
                                                component="h1"
                                            >
                                                {item.title}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Paper className={classes.board}>
                            <Typography
                                variant="h6"
                                align="center"
                                style={{
                                    fontWeight: 600,
                                    padding: 8,
                                }}
                            >
                                Ads
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default quiz

// export async function getStaticProps() {
//     const db = firebase.firestore()
//     //const [data, setData] = useState({})
//     let data = []
//     await db
//         .collection("sections")
//         .get()
//         .then((item) => {
//             item.forEach((doc) => data.push(doc.data()))
//         })

//     return {
//         props: { data: data },
//     }
// }
