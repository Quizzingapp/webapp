import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import quizData from './quiz_data.json'
import { borders } from '@material-ui/system';
import Box from '@material-ui/core/Box';

const result = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const handleQuestionSelect = (n) => {
        console.log("Clicked");
        setCurrentQuestion(n-1);
    };

    return(
        <div className="container">
            <div className="heading">
				<h2>Quiz</h2>
			</div>

            <div className="response">
                <h4>Response</h4>
            </div>

            <div className="nav-buttons">
                <div className="question-number">
                    <Button variant="contained" color="primary" onClick={()=> handleQuestionSelect(1)}>1</Button>
                </div>

                <div className="question-number">
                    <Button variant="contained" color="primary" onClick={()=> handleQuestionSelect(2)}>2</Button>
                </div>

                <div className="question-number">
                    <Button variant="contained" color="primary" onClick={()=> handleQuestionSelect(3)}>3</Button>
                </div>

                <div className="question-number">
                    <Button variant="contained" color="primary" onClick={()=> handleQuestionSelect(4)}>4</Button>
                </div>

                <div className="question-number">
                    <Button variant="contained" color="primary" onClick={()=> handleQuestionSelect(5)}>5</Button>
                </div>
            </div>

            <div className='question-section'>
                <div className='question-count'>
                    <span>Question {currentQuestion + 1}</span>/{quizData.data.length}
                </div>
                <div className='question-text'>{ quizData.data[currentQuestion].question }</div>
            </div>

            <div className='answer-section'>
                {quizData.data[currentQuestion].answerOptions.map((answerOption) => (
                    <Button variant="contained" color="primary">{answerOption.answerText}</Button>
                ))}
            </div>

        </div>
    )
}

export default result;