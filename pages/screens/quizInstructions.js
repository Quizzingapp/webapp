import React, { useState } from 'react'
import Link from "next/link"
import { formatTime } from "../utils/index"
import {
    Button,
    Container,
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core"
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import quiz from './quiz';

let interval

const useStyles = makeStyles((theme) => ({
    gridItem : {
        padding: 20,
        backgroundColor: '#cfe8fc',
        fontWeight: 600,
    },
    des : {
        padding: 20,
        margin: 16, 
    },
    button: {
        margin: theme.spacing(1),
        borderRadius: "5em",
        alignSelf: "center",
    },
}))

const quizInstructions = () => {
    const classes = useStyles()
    const [time, setTime] = useState(0)

    const handleStartClick = () => {
        interval = setInterval(() => {
            // setTime((prevTime) => prevTime + 1)
            setTime(time+1);
        }, 1000)
    }
    return (
        <>
            <React.Fragment>
                <Container maxWidth="md" >
                    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
                        <Paper className={classes.gridItem}>
                            <Typography variant="h6">True/False</Typography>
                        </Paper>

                        <Paper className={classes.des}>
                            <Typography>
                                Before you start the game, please go through the instructions carefully.
                            </Typography>
                        </Paper>

                        <Paper className={classes.des}>
                            <ListItem>
                                <ListItemIcon>
                                    <ArrowRightAltIcon />
                                </ListItemIcon>
                                <ListItemText primary="The game contains of 5 questions." />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <ArrowRightAltIcon />
                                </ListItemIcon>
                                <ListItemText primary="Each question duration is 30s." />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <ArrowRightAltIcon />
                                </ListItemIcon>
                                <ListItemText primary="You can access the next question by clicking on the Next button." />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <ArrowRightAltIcon />
                                </ListItemIcon>
                                <ListItemText primary="After you complete the quiz, your score along with the time taken are displayed." />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <ArrowRightAltIcon />
                                </ListItemIcon>
                                <ListItemText primary="You can view your result analysis by clicking the Result button at the end of the quiz." />
                            </ListItem>
                        </Paper>

                        <Link href="./quiz">
                            <Button color="primary" variant="contained"  className={classes.button} onClick={handleStartClick} >
                                Start
                            </Button>
                        </Link>

                        {/* <quiz data={ this.handleStartClick } /> */}

                    </Typography>
                    
                </Container>
            </React.Fragment>
        </>
    )
}

export default quizInstructions;