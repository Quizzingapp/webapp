import React, { useEffect, useState, useRef } from "react"
import quizData from "./quiz_data.json"
import Modal from "@material-ui/core/Modal"
import { formatTime } from "../utils/index"
import firebase from "../../firebase/clientApp"
import Link from "next/link"
import MyAppBar from "../../components/appbar"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import { green, red } from "@material-ui/core/colors"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt"
import {
    makeStyles,
    Container,
    Typography,
    Paper,
    Grid,
    FormControlLabel,
    Button,
    ButtonGroup,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    LinearProgress,
    Box,
} from "@material-ui/core"

let totalTime = 30

function rand() {
    return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
    const top = 50 + rand()
    const left = 50 + rand()

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

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
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        zIndex: 10,
    },
    progress: {
        maxWidth: "90%",
        margin: theme.spacing(3),
    },
}))

const quiz = ({ questions }) => {
    const classes = useStyles()
    const [seconds, setSeconds] = useState(30)
    const [changeTime, setChangeTime] = useState(true)
    const [modalStyle] = React.useState(getModalStyle)
    //const [questions, setQuestions] = useState([])

    // useEffect(() => {
    //     const db = firebase.firestore()
    //     db.collection("questions")
    //         .get()
    //         .then((dataSnapshot) =>
    //             dataSnapshot.docs.forEach((doc) =>
    //                 setQuestions((prevState) => [...prevState, doc.data()])
    //             )
    //         )
    // }, [])

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
    const [selected, setSelected] = useState("")
    const [ansSelected, setAnsSelected] = useState("")
    const [error, setError] = useState("")
    const [answers, setAnswers] = useState([])
    const [options, setOptions] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState("")

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1)
        }
        setSelected(isCorrect)
        setOptions([questions[currentQuestion].answerOptions])
        setCorrectAnswer(questions[currentQuestion].answer)
        if (error) {
            setError("")
        }
    }

    const handleAnswerOption = (e) => {
        setAnsSelected(e.target.value)
        // console.log(e.target.value);
        if (error) {
            setError("")
        }
    }

    const handleNextClick = (e) => {
        if (selected === "") {
            return setError("Please select an option")
        }

        // console.log("currentQuestion: "+ currentQuestion);
        // console.log(selected);
        // console.log(options);
        // console.log(ansSelected);
        setAnswers((prevState) => [
            ...prevState,
            {
                q: questions[currentQuestion].question,
                o: options,
                t: selected,
                s: ansSelected,
                a: correctAnswer,
            },
        ])
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion)
            // console.log("If lopala currentQuestion: "+ currentQuestion);
        } else {
            setChangeTime(false)
            setShowScore(true)
        }
        setSelected("")
        setValue(null)
    }

    const [value, setValue] = useState(null)

    const handleChangeOption = (e) => {
        setValue(e.target.value)
    }

    const [questionNumber, setQuestionNumber] = useState(0)
    var num = []
    for (var i = 0; i < questions.length; i++) {
        num.push(i)
    }
    const handleQuestionSelect = (n) => {
        // console.log("Clicked")
        setQuestionNumber(n)
    }
    const body = (
        <Paper className={classes.paper}>
            <Typography variant="body1" component="h1">
                Your answers
            </Typography>

            <Paper>
                <Grid item lg={9} sm={6} xs={12}>
                    <Typography variant="h4" component="h1">
                        Quiz
                    </Typography>

                    <Typography variant="h6" component="h1">
                        Response
                    </Typography>

                    <ButtonGroup>
                        {num.map((number) => (
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={() => handleQuestionSelect(number)}
                            >
                                {number + 1}
                            </Button>
                        ))}
                    </ButtonGroup>

                    <Typography variant="body1" component="h1">
                        Question {questionNumber + 1}/{questions.length}
                    </Typography>

                    <Paper className={classes.questionBox}>
                        <Typography variant="h6" component="h1">
                            {/* {console.log("xyz", answers, questionNumber, answers[questionNumber], answers[questionNumber].hasOwnProperty('q')) && (answers[questionNumber].q)} */}

                            {/* { !!answers[parseInt(questionNumber)] && (answers[parseInt(questionNumber)].q)} */}
                            {questions[questionNumber].question}
                        </Typography>
                    </Paper>

                    <Paper className={classes.questionBox}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Answers</FormLabel>
                            {/* { !!answers[parseInt(questionNumber)] && (answers[parseInt(questionNumber)].o[0].map((option) => ( */}
                            {questions[questionNumber].answerOptions.map(
                                (option) => (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                {!!answers[
                                                    parseInt(questionNumber)
                                                ] == true ? (
                                                    option.answerText ==
                                                    answers[
                                                        parseInt(questionNumber)
                                                    ].s ? (
                                                        answers[
                                                            parseInt(
                                                                questionNumber
                                                            )
                                                        ].t == true ? (
                                                            <CheckIcon
                                                                style={{
                                                                    color: green[500],
                                                                }}
                                                            />
                                                        ) : (
                                                            <ClearIcon
                                                                style={{
                                                                    color: red[500],
                                                                }}
                                                            />
                                                        )
                                                    ) : option.isCorrect ==
                                                      true ? (
                                                        <CheckIcon
                                                            style={{
                                                                color: green[500],
                                                            }}
                                                        />
                                                    ) : (
                                                        <ArrowRightAltIcon />
                                                    )
                                                ) : (
                                                    <ArrowRightAltIcon />
                                                )}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={option.answerText}
                                            secondary={
                                                !!answers[
                                                    parseInt(questionNumber)
                                                ] == true
                                                    ? option.answerText ==
                                                      answers[
                                                          parseInt(
                                                              questionNumber
                                                          )
                                                      ].s
                                                        ? "Your answer"
                                                        : ""
                                                    : ""
                                            }
                                        />
                                    </ListItem>
                                )
                            )}
                        </FormControl>
                    </Paper>
                </Grid>
            </Paper>
            {/* // <quiz /> */}
        </Paper>
    )

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
                                        {questions.length} correctly
                                    </p>
                                    <p>
                                        <strong>
                                            {Math.floor(
                                                (score / questions.length) * 100
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
                                        {questions.length}
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
                                                {questions[
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
                                                            // control={<Radio onChange={() => handleAnswerOptionClick(e, answerOption.isCorrect)}/>}
                                                            // control={<Radio onChange={handleAnswerOptionClick}/>}
                                                            control={
                                                                <Radio
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        handleAnswerOptionClick(
                                                                            answerOption.isCorrect
                                                                        )
                                                                        handleAnswerOption(
                                                                            e
                                                                        )
                                                                    }}
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
                        {error && (
                            <div>
                                <p>{error}</p>
                                <style jsx>{`
                                    p {
                                        color: red;
                                    }
                                `}</style>
                            </div>
                        )}

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
                        {showScore && (
                            <Container>
                                <div>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        className={classes.button}
                                        onClick={handleOpen}
                                    >
                                        Open modal
                                    </Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        style={modalStyle}
                                        style={{ overflow: "scroll" }}
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                    >
                                        {body}
                                    </Modal>
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

export async function getStaticProps() {
    const db = firebase.firestore()
    let questions = []
    await db
        .collection("questions")
        .get()
        .then((dataSnapshot) =>
            dataSnapshot.docs.forEach((doc) => questions.push(doc.data()))
        )
    return {
        props: { questions: questions },
    }
}
