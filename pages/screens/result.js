import React, { useEffect, useState } from "react"
import Button from "@material-ui/core/Button"
import quizData from "./quiz_data.json"
import { borders } from "@material-ui/system"
import MyAppBar from "../../components/appbar"
import TimerIcon from "@material-ui/icons/Timer"
import {
    makeStyles,
    Container,
    Typography,
    Paper,
    Grid,
    ButtonGroup,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core"
import { useStoreState } from "easy-peasy"

let n = quizData.data.length

const useStyles = makeStyles((theme) => ({
    questionBox: {
        height: "auto",
        maxWidth: 600,
        backgroundColor: "#f5f5f5",
        padding: 8,
        marginTop: 8,
        marginBottom: 16,
    },
    mytimer: {
        height: 150,
        backgroundColor: "#f5f5f5",
        padding: 48,
        marginTop: 16,
    },
    button: {
        margin: theme.spacing(1),
        borderRadius: "5em",
    },
}))

const calculateScore = (result) => {
    let score = 0
    result.map((item) => {
        if (item.userSelected === item.answer) {
            score += 1
        }
    })
    return score
}

const result = () => {
    const classes = useStyles()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const handleQuestionSelect = (n) => {
        console.log("Clicked")
        setCurrentQuestion(n - 1)
    }
    const [score, setScore] = useState(0)

    const result = useStoreState((state) => state.result.data)

    useEffect(() => {
        setScore(calculateScore(result))
    }, [])

    const c = (key, q) => {
        if (key === q) return "secondary"
        else return "default"
    }

    const co = (o, a, u) => {
        if (o === a) return "#9CF196"
        else if (o === u && a !== u) return "#FF8080"
        else return "#fff"
    }

    return (
        <>
            <MyAppBar />
            <Container maxWidth="xl" style={{ marginTop: 24 }}>
                <Grid container spacing={5}>
                    <Grid item lg={9} sm={6} xs={12}>
                        <Typography variant="h4" component="h1">
                            Quiz
                        </Typography>
                        <Typography variant="h3" component="h1">
                            Score : {score}
                        </Typography>
                        <Typography variant="h6" component="h1">
                            Response
                        </Typography>

                        <ButtonGroup variant="contained">
                            {result.map((item, key) => {
                                return (
                                    <Button
                                        onClick={() => setCurrentQuestion(key)}
                                        color={c(key, currentQuestion)}
                                    >
                                        {key + 1}
                                    </Button>
                                )
                            })}
                        </ButtonGroup>

                        <Typography variant="body1" component="h1">
                            Question {currentQuestion + 1}/{result.length}
                        </Typography>
                        <Paper className={classes.questionBox}>
                            <Typography variant="h6" component="h1">
                                {result.length &&
                                    result[currentQuestion].question}
                            </Typography>
                        </Paper>

                        <Paper className={classes.questionBox}>
                            <List
                                component="legend"
                                aria-label="answer options"
                            >
                                {result.length &&
                                    Object.entries(
                                        result[currentQuestion].answerOptions
                                    ).map((answerOption) => (
                                        <ListItem
                                            style={{
                                                backgroundColor: co(
                                                    answerOption[0],
                                                    result[currentQuestion]
                                                        .answer,
                                                    result[currentQuestion]
                                                        .userSelected
                                                ),
                                            }}
                                        >
                                            <ListItemText>
                                                {answerOption[1]}
                                            </ListItemText>
                                        </ListItem>
                                    ))}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item lg={3} sm={3} xs={12}>
                        <Paper className={classes.mytimer}>
                            <TimerIcon />
                            <Typography variant="h4" component="h1">
                                Timer
                            </Typography>
                        </Paper>
                        <Paper className={classes.mytimer}>
                            <Typography variant="h5" component="h1">
                                Ads
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default result
