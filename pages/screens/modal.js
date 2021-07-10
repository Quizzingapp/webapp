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
                                                        parseInt(questionNumber)
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
                                                ) : option.isCorrect == true ? (
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
                                                      parseInt(questionNumber)
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

{
    /* {showScore && (
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
                        )} */
}

const [open, setOpen] = React.useState(false)
const handleOpen = () => {
    setOpen(true)
}

const handleClose = () => {
    setOpen(false)
}
