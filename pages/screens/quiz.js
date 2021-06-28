import Button from "@material-ui/core/Button"
import React, { useEffect, useState, useRef } from "react"
import quizData from "./quiz_data.json"
import { formatTime } from "../utils/index"
// import App from './../_app';
import Link from "next/link"
import MyAppBar from "../../components/appbar"
import {
    makeStyles,
    Container,
    Typography,
    Paper,
    Grid,
    FormGroup,
    FormControlLabel,
    Checkbox,
    ButtonGroup,
} from "@material-ui/core"


let interval

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
        borderRadius: "5em"
    },
}))

const quiz = (props) => {
    console.log(props.data);
    const classes = useStyles()

	const [seconds, setSeconds] = useState(150);
	useEffect(() => {
		if (seconds > 0) {
			setTimeout(() => setSeconds(seconds - 1), 1000);
		} 
		else {
			setSeconds('Time Up!');
			const nextQuestion = currentQuestion + 1
			if (nextQuestion < quizData.data.length) {
				setCurrentQuestion(nextQuestion)
			} else {
				// clearInterval(interval)
				setShowScore(true)
			}
		}
	});

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showScore, setShowScore] = useState(false)
	// const [time, setTime] = useState(0)
    const [score, setScore] = useState(0)
    // const [timeTaken, setTimeTaken] = useState(0)
    // const [selected, setSelected] = useState('');
    // const [error, setError] = useState('');

    const [isFirst, setIsFirst] = useState(false);
    const [isSecond, setIsSecond] = useState(false);
    const [isThird, setIsThird] = useState(false);
    const [isFourth, setIsFourth] = useState(false);

    const handleFirstClick = (isCorrect) => {
        if(isCorrect){
            setScore(score + 1)
        } else {
            alert("Wrong");
        }
        setIsFirst(prevState => ({
            isFirst: !prevState.isFirst,
        }));
        // setIsFirst(!isFirst);
    }

    const handleSecondClick = (isCorrect) => {
        if(isCorrect){
            setScore(score + 1)
        } else {
            alert("Wrong");
        }
        setIsSecond(prevState => ({
            isSecond: !prevState.isSecond,
        }));
        // setIsSecond(!isSecond);
    }

    const handleThirdClick = (isCorrect) => {
        if(isCorrect){
            setScore(score + 1)
        } else {
            alert("Wrong");
        }
        setIsThird(prevState => ({
            isThird: !prevState.isThird,
        }));
        // setIsThird(!isThird);
    }

    const handleFourthClick = (isCorrect) => {
        if(isCorrect){
            setScore(score + 1)
        } else {
            alert("Wrong");
        }
        setIsFourth(prevState => ({
            isFourth: !prevState.isFourth,
        }));
        // setIsFourth(!isFourth);
    }

    // const handleAnswerOptionClick = (isCorrect) => {
    //     if (isCorrect) {
    //         alert("Correct")
    //         setScore(score + 1)
    //     } else {
    //         alert("Wrong")
    //     }
	// 	// setSelected(e.target.value);
	// 	// if(error) {
	// 	// 	setError('');
	// 	// }
    //     // const nextQuestion = currentQuestion + 1;
    //     // if (nextQuestion < quizData.data.length) {
    //     // 	setCurrentQuestion(nextQuestion);
    //     // } else {
    //     // 	setShowScore(true);
    //     // }
    // }

    // const handleStartClick = () => {
    //     interval = setInterval(() => {
    //         setTime((prevTime) => prevTime + 1)
    //     }, 1000)
    // }

    const handleNextClick = (e) => {
        // if(selected === '') {
        // 	return setError('Please select one option!');
        // }
		// setSelected('');
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < quizData.data.length) {
            setCurrentQuestion(nextQuestion)
            // setChecked(false);
        } else {
            // clearInterval(interval)
            setShowScore(true)
        }
    }

    // const handleOptionChange = (e) => {
    // 	setSelected(e.target.value);
    // 	if(error) {
    // 	  setError('');
    // 	}
    // };

    return (
        <>
            <MyAppBar />
            <Container maxWidth="xl" style={{ marginTop: 24 }}>
                <Grid container spacing={5}>
                    <Grid item lg={9} sm={6} xs={12}>
                        <Typography variant="h4" component="h1">
                            Quiz
                        </Typography>

                        <Container>
                            {showScore ? (
                                <div className="score-section">
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

                                    {/* <p>
                                        <strong>Time taken: </strong>
                                        {formatTime(time)}
                                    </p> */}

                                    <p>
                                        <strong>Time taken: </strong>
                                        {formatTime(props.data)}
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
                                            {
                                                quizData.data[currentQuestion]
                                                    .question
                                            }
                                        </Typography>
                                    </Paper>
                                    {/* <div className='answer-section'>
							{quizData.data[currentQuestion].answerOptions.map((answerOption) => (
								<Button variant="contained" color="primary" onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</Button>
							))}
						</div> */}

                                    <Paper className={classes.questionBox}>
                                        <FormGroup>
                                            <FormControlLabel label={quizData.data[currentQuestion].answerOptions[0].answerText} 
                                                control={<Checkbox checked = { isFirst } onChange={() => handleFirstClick(quizData.data[currentQuestion].answerOptions[0].isCorrect)}/>}
                                            />
                                            <FormControlLabel label={quizData.data[currentQuestion].answerOptions[1].answerText} 
                                                control={<Checkbox checked = { isSecond } onChange={() => handleSecondClick(quizData.data[currentQuestion].answerOptions[1].isCorrect)}/>}
                                            />
                                            <FormControlLabel label={quizData.data[currentQuestion].answerOptions[2].answerText} 
                                                control={<Checkbox checked = { isThird } onChange={() => handleThirdClick(quizData.data[currentQuestion].answerOptions[2].isCorrect)}/>}
                                            />
                                            <FormControlLabel label={quizData.data[currentQuestion].answerOptions[3].answerText} 
                                                control={<Checkbox checked = { isFourth } onChange={() => handleFourthClick(quizData.data[currentQuestion].answerOptions[3].isCorrect)}/>}
                                            />
                                        </FormGroup>
                                        {/* <FormGroup>
                                            {quizData.data[
                                                currentQuestion
                                            ].answerOptions.map(
                                                (answerOption) => (
                                                    <FormControlLabel
                                                        label={
                                                            answerOption.answerText
                                                        }
                                                        control={<Checkbox checked = { checked } onChange={() => handleAnswerOptionClick(answerOption.isCorrect)}/>}
                                                    />
                                                    // <Button
                                                    //     variant="contained"
                                                    //     color="primary"
                                                    //     /*onChange={handleOptionChange} onClick={() =>
                                                    //         handleAnswerOptionClick(
                                                    //             answerOption.isCorrect
                                                    //         )
                                                    //     }
                                                    // >
                                                    //     {answerOption.answerText}
                                                    // </Button>
                                                )
                                            )}
                                        </FormGroup> */}
                                    </Paper>
                                </>
                            )}
                        </Container>

                        <Container>
                            <div >
                                {/* <Button color="primary" variant="contained"  className={classes.button} onClick={handleStartClick} >
                                    Start
                                </Button> */}
								<Link href="./result">
									<Button 
										color="secondary" 
										variant="contained"
										className={classes.button}
									>
										Result
									</Button>
								</Link>
								<Button color="primary" variant="contained"  className={classes.button} onClick={handleNextClick} >
                                    Next
                                </Button>
                            </div>
                        </Container>
                    </Grid>
                    <Grid item lg={3} sm={3} xs={12}>
                        <Paper className={classes.mytimer}>
							{seconds}
                            <Typography variant="h4" component="h1">
                                Timer {props.data}
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
