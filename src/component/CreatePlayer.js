import React from 'react';
import Canvas from '../component/GameLogic/Canvas';


class CreatePlayer extends React.Component {
  state = { user : '',
            error: '',
            isError: false,
            gameOn:false
          }

  inputPlayer = (event) => {
    this.setState({
      user: event.target.value
    })
  }


 login = () => {
   fetch("http://localhost:3000/api/v1/login", {
     method: "POST",
     headers:{
       "Content-Type": "application/json; charset=utf-8"
     },
     body: JSON.stringify({name:this.state.user})
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

 signUp = () => {
   console.log(this.state.user); //allow it to create
   fetch("http://localhost:3000/api/v1/signup", {
     method: "POST",
     headers: {
       "Content-Type": "application/json; charset=utf-8"
     },
     body:JSON.stringify({name: this.state.user})
   })
   .then((response) => {
     response.json()
     .then((data) => {
       this.setState({
         error:'Success',
         isError : false,
         gameOn: true
       })
     })
   })
 }

  renderGame = () => {
    if (this.state.gameOn) {
      return <Canvas />
    } else {
      return (
        <div>
          <h3 style={ {color: this.state.isError ? 'red' : 'green'} }> { this.state.error } </h3>
          <label>
            Name:
            <input value={ this.state.user } onChange={ this.inputPlayer } type="text" name="name"/>
          </label>
          <button onClick={ this.login }>
            Login
          </button>
          <button onClick={ this.signUp }>Sign Up</button>
        </div>
      )
    }
  }




  render() {

    return(
      <div>
        {this.renderGame()}
      </div>
    )
  }
}
export default CreatePlayer;
