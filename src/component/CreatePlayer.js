import React from 'react';
import Canvas from '../component/GameLogic/Canvas';


class CreatePlayer extends React.Component {
state={textValue: ''}


updateTextValue = (e) => {
  this.setState({textValue: e.target.value})
}
  renderGame = () => {
      return (
        <div>
          <h3 style={ {color: this.props.isError ? 'red' : 'green'} }> { this.props.error } </h3>
          <label>
            Name:
            <input className="text-box" value={ this.state.textValue } onChange={ (e) => this.updateTextValue(e) } type="text" name="name"/>
          </label>
          <button onClick={ () => this.props.login(this.state.textValue) }>
            Login
          </button>
          <button onClick={ () => this.props.signUp(this.state.textValue) }>Sign Up</button>
        </div>
      )
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
