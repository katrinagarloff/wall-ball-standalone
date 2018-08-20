import React, { Component } from 'react';
import './App.css';
import Canvas from './component/GameLogic/Canvas';
import ScoreBoard from './component/ScoreBoard';
import Header from './component/Header';
import logo from './logo.svg';
import Footer from './component/Footer';


class App extends Component {

  state = {
    players:[],
    scores:[]
  }

  componentDidMount() {
    this.getPlayers()
    this.getScores()
  }
  //getPlayers will return an array of objects
  //push the objecting into state of players
  getPlayers(){
    fetch('http://localhost:3000/api/v1/players')
      .then(res => res.json())
      .then(players => {
        this.setState({players:players})
      })
  }
  //get players name

  getScores = () => {
     fetch('http://localhost:3000/api/v1/scores')
      .then(res => res.json())
      .then(scores => {

        this.setState({scores:scores})
      })
  }

filterData() {
  if (this.state.players.length !== 0 && this.state.scores.length !==0) {
    return <ScoreBoard data={this.state} />
  } else {
    null
  }
}




  render() {
    // console.log(this.state);
    return (
      <div className="App">
        <Header logo={logo}/>
        {this.filterData()}
        <Canvas />
        <Footer />
      </div>
    );
  }
}

export default App;
