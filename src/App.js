import React, { Component } from 'react';
import './App.css';
import Canvas from './component/GameLogic/Canvas';
import ScoreBoard from './component/ScoreBoard';
import Header from './component/Header';
import logo from './logo.svg';
import Footer from './component/Footer';
import CreatePlayer from './component/CreatePlayer';

class App extends Component {
  state = {
    players:[],
    scores:[],
    user : '',
    error: '',
    lose: false,
    wins: 0
  }

  inputPlayer = (event) => {
    this.setState({
      user: event.target.value
    })
  }

  winGame = () => {
    this.setState(prevState => {return {win: prevState.wins += 1}})

  }

  loseGame = () => {
    this.setState({lose: true})
  }

  login = (text) => {
    fetch("http://localhost:3000/api/v1/login", {
       method: "POST",
       headers:{
         "Content-Type": "application/json; charset=utf-8"
       },
       body: JSON.stringify({name: text})
     })
   .then((response) => {
     if (response.ok) {
       response.json()
       .then((data) => {
         if (data.message === 'error') {
           this.setState({
              error : data.errorMessage,
              isError : true
           });
           console.log(data.errorMessage);
         } else {
           this.setState({
             user: text,
             error:'Success',
             isError : false,
             gameOn: true
           });
           console.log(data.player);
         }
       })
     }
   })
 }

 signUp = (text) => {
   console.log(text); //allow it to create
   fetch("http://localhost:3000/api/v1/signup", {
     method: "POST",
     headers: {
       "Content-Type": "application/json; charset=utf-8"
     },
     body:JSON.stringify({name: text})
   })
   .then((response) => {
     response.json()
     .then((data) => {
       this.setState({
         user: text,
         error:'Success',
         isError : false,
         gameOn: true
       })
     })
   })
 }

  //getPlayers will return an array of objects
  //push the objecting into state of players
  // getPlayers(){
  //   fetch('http://localhost:3000/api/v1/players')
  //     .then(res => res.json())
  //     .then(players => {
  //       this.setState({players:players})
  //     })
  // }
  // //get players name
  //
  // getScores = () => {
  //    fetch('http://localhost:3000/api/v1/scores')
  //     .then(res => res.json())
  //     .then(scores => {
  //
  //       this.setState({scores:scores})
  //     })
  // }
// passes only if not zero
  filterData() {
    if (this.state.players.length !== 0 && this.state.scores.length !==0) {
      return <ScoreBoard data={this.state} />
    } else {
      null
    }
  }

  render() {
    return (
      <div className="App">
        {(this.state.user.length === 0 && !this.state.lose) ?
          <CreatePlayer
            inputPlayer={this.inputPlayer}
            login={this.login}
            signUp={this.signUp}
            user={this.state.user}
            error={this.state.error}
            isError={this.state.isError}
            gameOn={this.state.gameOn}/>
        : (this.state.user.length > 0 && !this.state.lose) ?
            <Canvas
              loseGame={this.loseGame}
              winGame={this.winGame}
              wins={this.state.wins}/>
          : (this.state.lose) ?
            <ScoreBoard score={this.state.wins}/> : null}
      </div>
    )
  }
}





// <ScoreBoard />
// <Header logo={logo}/>
// <Footer />
// {this.filterData()}
// <Canvas />
export default App;
// {this.loginSignup()}
