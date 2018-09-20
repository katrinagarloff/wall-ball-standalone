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

        {!this.state.lose ?
            <Canvas
              loseGame={this.loseGame}
              winGame={this.winGame}
              wins={this.state.wins}/>
          : <ScoreBoard score={this.state.wins} />}
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
