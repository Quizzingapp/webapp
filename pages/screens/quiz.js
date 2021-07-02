import React, { useEffect, useState, useRef } from "react"
import quizData from "./quiz_data.json"
import { formatTime } from "../utils/index"
import firebase from "../../firebase/clientApp"
import Link from "next/link"
import MyAppBar from "../../components/appbar"
import {
    makeStyles,
    Container,
    Typography,
    Paper,
    Grid,
    FormControlLabel,
    Button,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    LinearProgress,
    Box,
} from "@material-ui/core"

let totalTime = 30

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
    progress: {
        maxWidth: "90%",
        margin: theme.spacing(3),
    },
}))

const quiz = () => {
    const classes = useStyles()
    const [seconds, setSeconds] = useState(30)
    const [changeTime, setChangeTime] = useState(true)
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        const db = firebase.firestore()
        db.collection("questions")
            .where("tags", "array-contains", "hindu")
            .get()
            .then((dataSnapshot) =>
                dataSnapshot.docs.forEach((doc) =>
                    setQuestions((prevState) => [...prevState, doc.data()])
                )
            )
    }, [])

    useEffect(() => {
        if (seconds > 0 && changeTime) {
            setTimeout(() => setSeconds(seconds - 1), 1000)
        } else {
            setShowScore(true)
        }
    })
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(0)

    const handleNextClick = (e) => {
        setValue(null)
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion)
        } else {
            setChangeTime(false)
            setShowScore(true)
        }
    }

    const [value, setValue] = useState(null)

    const handleChangeOption = (e) => {
        setValue(e.target.value)
    }

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1)
        }
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
                        {!showScore && (
                            <Box className={classes.progress}>
                                {" "}
                                <LinearProgress
                                    variant="determinate"
                                    value={(seconds * 10) / 3}
                                />{" "}
                            </Box>
                        )}

                        <Container>
                            {showScore ? (
                                <div className="score-section">
                                    {showScore && (
                                        <Typography
                                            align="center"
                                            variant="h4"
                                            component="h1"
                                        >
                                            Quiz Done!
                                        </Typography>
                                    )}

                                    <p>
                                        You answered {score} out of{" "}
                                        {quizData.data.length} correctly
                                    </p>
                                    <p>
                                        <strong>
                                            {Math.floor(
                                                (score / quizData.data.length) *
                                                    100
                                            )}
                                        </strong>
                                        %
                                    </p>
                                    <p>
                                        <strong>Time taken: </strong>{" "}
                                        {totalTime - seconds}s
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <Typography variant="body1" component="h1">
                                        Question {currentQuestion + 1}/
                                        {quizData.data.length}
                                    </Typography>
                                    <Paper className={classes.questionBox}>
                                        <Typography variant="h6" component="h1">
                                            {questions.length &&
                                                questions[currentQuestion]
                                                    .question}
                                        </Typography>
                                    </Paper>
                                    <Paper className={classes.questionBox}>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">
                                                Answers
                                            </FormLabel>
                                            <RadioGroup
                                                value={value}
                                                onChange={handleChangeOption}
                                            >
                                                {questions.length &&
                                                    questions[
                                                        currentQuestion
                                                    ].answerOptions.map(
                                                        (answerOption) => (
                                                            <FormControlLabel
                                                                value={
                                                                    answerOption.answerText
                                                                }
                                                                label={
                                                                    answerOption.answerText
                                                                }
                                                                control={
                                                                    <Radio
                                                                        onChange={() =>
                                                                            handleAnswerOptionClick(
                                                                                answerOption.isCorrect
                                                                            )
                                                                        }
                                                                    />
                                                                }
                                                            />
                                                        )
                                                    )}
                                            </RadioGroup>
                                        </FormControl>
                                    </Paper>
                                </>
                            )}
                        </Container>
                        {!showScore && (
                            <Container>
                                <div>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        className={classes.button}
                                        onClick={handleNextClick}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </Container>
                        )}
                        {showScore && (
                            <Container>
                                <div>
                                    <Link href="./result">
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            className={classes.button}
                                        >
                                            Result
                                        </Button>
                                    </Link>
                                </div>
                            </Container>
                        )}
                    </Grid>
                    <Grid item lg={3} sm={3} xs={12}>
                        <Paper className={classes.mytimer}>
                            <Typography variant="h5" component="h1">
                                Time left : {seconds}s
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

export default quiz
