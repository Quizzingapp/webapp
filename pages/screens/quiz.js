import Button from '@material-ui/core/Button';
import React, { useEffect, useState }from 'react';
import quizData from './quiz_data.json'
import { formatTime } from '../utils/index';
// import App from './../_app';

let interval;

const quiz = (/*{ results, time }*/) => {
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

    const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [time, setTime] = useState(0);
	// const [selected, setSelected] = useState('');
	// const [error, setError] = useState('');

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			alert("Correct");
			setScore(score + 1);
		}
		else{
			alert("Wrong");
		}

		// const nextQuestion = currentQuestion + 1;
		// if (nextQuestion < quizData.data.length) {
		// 	setCurrentQuestion(nextQuestion);
		// } else {
		// 	setShowScore(true);
		// }
	};

	const handleStartClick = () => {
		interval = setInterval(() => {
			setTime(prevTime => prevTime + 1);
		  }, 1000);
	};

	const handleNextClick = (/*e*/) => {
		// if(selected === '') {
		// 	return setError('Please select one option!');
		// }

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < quizData.data.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			clearInterval(interval);
			setShowScore(true);
		}
	};

	// const handleOptionChange = (e) => {
	// 	setSelected(e.target.value);
	// 	if(error) {
	// 	  setError('');
	// 	}
	// };

    return (
		<div className="container">
			<div className="heading">
				<h2>Quiz</h2>
			</div>

			<div className='quiz'>
				{showScore ? (
					<div className='score-section'>
						<p>You answered {score} out of {quizData.data.length} correctly</p>
						<p><strong>{Math.floor((score / quizData.data.length) * 100)}</strong>%</p>
						<p><strong>Time taken: </strong>{ formatTime(time) }</p>
					</div>
				) : (
					<>
						<div className='question-section'>
							<div className='question-count'>
								<span>Question {currentQuestion + 1}</span>/{quizData.data.length}
							</div>
							<div className='question-text'>{ quizData.data[currentQuestion].question }</div>
						</div>

						{/* <div className='answer-section'>
							{quizData.data[currentQuestion].answerOptions.map((answerOption) => (
								<Button variant="contained" color="primary" onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</Button>
							))}
						</div> */}

						<div className='answer-section'>
							{quizData.data[currentQuestion].answerOptions.map((answerOption) => (
								<Button variant="contained" color="primary" /*onChange={handleOptionChange}*/ onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</Button>
							)) }
						</div>
					</>
				)}
			</div>

			<div className="nav-buttons">
				<Button variant="contained" color="secondary" onClick={handleStartClick}>Start</Button>
				<Button variant="contained" color="primary" >Show Detailed Result</Button>
				<Button variant="contained" color="secondary" onClick={handleNextClick}>Next</Button>
			</div>
		</div>

    );
}

export default quiz;