import React, { Component } from 'react';
import './App.css';
import Card from './components/Card';
import Wrapper from './components/Wrapper';
import cards from './cards.json';

class App extends Component {
	//Setting this.state.cards to the cards json array
	state = {
		cards,
		clickedArray: [],
		topScore: 0,
		score: 0,
		message: '',
		reset: 'false'
	};

	clickPicture = id => {
		const shuffledArray = this.shuffleArray(cards);
		this.setState({ cards: shuffledArray });
		if (this.state.clickedArray.includes(id)) {
			this.setState({
				topScore: 0,
				score: 0,
				clickedArray: [],
				message: 'Incorrect!! Game Over ☹️ Click an image to play again!',
				reset: 'true'
			});
		} else {
			this.setState({
				clickedArray: this.state.clickedArray.concat([id]),
				score: this.state.score + 1,
				message: 'Correct!! 🙂',
				reset: 'false'
			});
		}
		if (this.state.score > this.state.topScore) {
			this.setState({ topScore: this.state.score });
		}
	};
	shuffleArray = picturesArray => {
		for (let i = picturesArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[picturesArray[i], picturesArray[j]] = [
				picturesArray[j],
				picturesArray[i]
			];
		}
		return picturesArray;
	};
	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<h1 className='App-title'>Welcome to React Memory Game!!</h1>
				</header>
				<h3 className='App-intro'>
					<h2 className='score'>
						<strong>
							Currect: {this.state.score} | Total Score: {this.state.topScore}
						</strong>
					</h2>
					<h4 className='message'>
						<strong>{this.state.message}</strong>
					</h4>
					<strong>
						Click each emoji once to earn point. If an emoji is clicked twice,
						the game will reset and you will lose all of your points!
					</strong>
				</h3>
				<Wrapper
					shakeWrapper={this.state.reset}
					pictures={this.state.cards.map(picture => (
						<Card
							clickPicture={this.clickPicture}
							id={picture.id}
							key={picture.id}
							image={picture.image}
						/>
					))}
				/>
				<footer className='footer'>
					<div className='container'>
						<span className='text-muted'>&copy; Memory Game - React app.</span>
					</div>
				</footer>
			</div>
		);
	}
}
export default App;
