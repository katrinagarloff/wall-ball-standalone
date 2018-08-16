import React, { Component } from 'react';
import UserBall from './UserBall'

export default class Canvas extends Component {
  state = {
    ballX: 0,
    ballY: 0,
    dirX: 0,
    dirY: 0
  }

  drawBall = (ctx, ballRadius, color) => {

      ctx.beginPath()
      ctx.arc(this.state.ballX, this.state.ballY, ballRadius, 0, Math.PI*2)
      ctx.fillStyle = color
      ctx.fill()
      ctx.closePath()
  }

  draw = (canvas, ctx) => {

    const ballRadius = 10

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      this.drawBall(ctx, ballRadius, "#0095DD")
      if(this.state.ballX + this.state.dirX > canvas.width-ballRadius || this.state.ballX + this.state.dirX < ballRadius) {
          this.setState(prevState => {
            return {dirX: -prevState.dirX}
          }, () => {
            this.setState(prevState => {
              return {
                ballX: prevState.ballX += this.state.dirX,
                ballY: prevState.ballY += this.state.dirY
              }
            })
            })
      }

      if(this.state.ballY + this.state.dirY > canvas.height-ballRadius || this.state.ballY + this.state.dirY < ballRadius) {
          this.setState(prevState => {
            return {dirY: -prevState.dirY}
          }, () => {
            this.setState(prevState => {
              return {
                ballX: prevState.ballX += this.state.dirX,
                ballY: prevState.ballY += this.state.dirY
              }
            })
          })
        } else {
          this.setState(prevState => {
            return {
              ballX: prevState.ballX += this.state.dirX,
              ballY: prevState.ballY += this.state.dirY
            }
          })
        }
  }

  componentDidMount(){
    const canvas = document.getElementById("myCanvas")
    const ctx = canvas.getContext("2d")

    this.setState({
        ballX: canvas.width/2,
        ballY: canvas.height-30,
        dirX: 2,
        dirY: -2
      },
      () => setInterval(() => {
      return this.draw(canvas, ctx)}, 10
    )
)




  }
  render() {
      const {width, height} = this.props
    return (
      <div>
        <canvas id="myCanvas" width={width} height={height}> </canvas>

        <UserBall canvas={document.getElementById("myCanvas")} drawBall={this.drawBall}/>
      </div>
    )
  }
}
// ballX: 0,
// ballY: 0,
// dirX: 0,
// dirY: 0
