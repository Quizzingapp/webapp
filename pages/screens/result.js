import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import quizData from "./quiz_data.json"
import { borders } from "@material-ui/system"
import MyAppBar from "../../components/appbar"
import TimerIcon from '@material-ui/icons/Timer';
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

let n = quizData.data.length;

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

const result = () => {
    const classes = useStyles()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const handleQuestionSelect = (n) => {
        console.log("Clicked")
        setCurrentQuestion(n - 1)
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

                <Typography variant="h6" component="h1">
                    Response
                </Typography>

                <ButtonGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => handleQuestionSelect(1)}
                    >
                        1
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => handleQuestionSelect(2)}
                    >
                        2
                    </Button>

                    <Button
                        variant="contained"
                        className={classes.button}
                        color="primary"
                        onClick={() => handleQuestionSelect(3)}
                    >
                        3
                    </Button>

                    <Button
                        variant="contained"
                        className={classes.button}
                        color="primary"
                        onClick={() => handleQuestionSelect(4)}
                    >
                        4
                    </Button>

                    <Button
                        variant="contained"
                        className={classes.button}
                        color="primary"
                        onClick={() => handleQuestionSelect(5)}
                    >
                        5
                    </Button>
                </ButtonGroup>

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
                                    control={<Checkbox disabled/>}
                                />
                            )
                        )}
                    </FormGroup>
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
