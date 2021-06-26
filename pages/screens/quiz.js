import Button from "@material-ui/core/Button"
import React, { useEffect, useState } from "react"
import quizData from "./quiz_data.json"
import { formatTime } from "../utils/index"
// import App from './../_app';
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
}))

const quiz = (/*{ results, time }*/) => {
    const classes = useStyles()
    // const [correctAnswers, setCorrectAnswers] = useState(0);
    // useEffect(() => {
    // 	let correct = 0;
    // 	results.forEach((result, index) => {
    // 		if(result.a === quizData.data[index].answer) {
    // 			correct++;
    // 		}
    // 	});
    // 	setCorrectAnswers(correct);
    // }, []);
    // const data = [
    // 	{
    // 		question: 'Upnishads are books on :',
    // 		answerOptions: [
    // 			{ answerText: 'Politics', isCorrect: false },
    // 			{ answerText: 'Philosophy', isCorrect: true },
    // 			{ answerText: 'Medicine', isCorrect: false },
    // 			{ answerText: 'Social Life', isCorrect: false },
    // 		],
    // 	},
    // 	{
    // 		question: 'Who was the first Indian ruler who had territory outside India?',
    // 		answerOptions: [
    // 			{ answerText: 'Huvishka', isCorrect: false },
    // 			{ answerText: 'Kanishka', isCorrect: true },
    // 			{ answerText: 'Chandragupta Maurya', isCorrect: false },
    // 			{ answerText: 'Ashoka', isCorrect: false },
    // 		],
    // 	},
    // 	{
    // 		question: 'Harihara Raya I who ruled the Vijaynagara Empire for the period 1336-1356 belonged to which dynasty?',
    // 		answerOptions: [
    // 			{ answerText: 'Sangama Dynasty', isCorrect: true },
    // 			{ answerText: 'Saluva Dynasty', isCorrect: false },
    // 			{ answerText: 'Tuluva Dynasty', isCorrect: false },
    // 			{ answerText: 'Aravidu Dynasty', isCorrect: false },
    // 		],
    // 	},
    // 	{
    // 		question: 'Who among the following was worshipped during Early Vedic Civilization?',
    // 		answerOptions: [
    // 			{ answerText: 'Varuna', isCorrect: false },
    // 			{ answerText: 'Indra', isCorrect: false },
    // 			{ answerText: 'Surya', isCorrect: false },
    // 			{ answerText: 'All the above', isCorrect: true },
    // 		],
    // 	},
    //     {
    // 		question: 'Which one of the following was the capital of Kosala?',
    // 		answerOptions: [
    // 			{ answerText: 'Shuktimati', isCorrect: false },
    // 			{ answerText: 'Indraprastha', isCorrect: false },
    // 			{ answerText: 'Kaushambi', isCorrect: false },
    // 			{ answerText: 'Sravasti', isCorrect: true },
    // 		],
    // 	},
    // ];

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(0)
    const [time, setTime] = useState(0)
    // const [selected, setSelected] = useState('');
    // const [error, setError] = useState('');

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            alert("Correct")
            setScore(score + 1)
        } else {
            alert("Wrong")
        }

        // const nextQuestion = currentQuestion + 1;
        // if (nextQuestion < quizData.data.length) {
        // 	setCurrentQuestion(nextQuestion);
        // } else {
        // 	setShowScore(true);
        // }
    }

    const handleStartClick = () => {
        interval = setInterval(() => {
            setTime((prevTime) => prevTime + 1)
        }, 1000)
    }

    const handleNextClick = (/*e*/) => {
        // if(selected === '') {
        // 	return setError('Please select one option!');
        // }

        const nextQuestion = currentQuestion + 1
        if (nextQuestion < quizData.data.length) {
            setCurrentQuestion(nextQuestion)
        } else {
            clearInterval(interval)
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
                                    <p>
                                        <strong>Time taken: </strong>
                                        {formatTime(time)}
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
                                            {quizData.data[
                                                currentQuestion
                                            ].answerOptions.map(
                                                (answerOption) => (
                                                    <FormControlLabel
                                                        label={
                                                            answerOption.answerText
                                                        }
                                                        control={<Checkbox />}
                                                    />
                                                    // <Button
                                                    //     variant="contained"
                                                    //     color="primary"
                                                    //     /*onChange={handleOptionChange}*/ onClick={() =>
                                                    //         handleAnswerOptionClick(
                                                    //             answerOption.isCorrect
                                                    //         )
                                                    //     }
                                                    // >
                                                    //     {answerOption.answerText}
                                                    // </Button>
                                                )
                                            )}
                                        </FormGroup>
                                    </Paper>
                                </>
                            )}
                        </Container>

                        <Container>
                            <ButtonGroup color="primary" variant="contained">
                                <Button onClick={handleStartClick}>
                                    Start
                                </Button>
                                <Button color="secondary">Result</Button>
                                <Button onClick={handleNextClick}>Next</Button>
                            </ButtonGroup>
                        </Container>
                    </Grid>
                    <Grid item lg={3} sm={3} xs={12}>
                        <Paper className={classes.mytimer}>
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

export default quiz
