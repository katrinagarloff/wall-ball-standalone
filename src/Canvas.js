import React, { Component } from 'react';

export default class Canvas extends Component {
  state = {
    ballX: 0,
    ballY: 0,
    dirX: 0,
    dirY: 0
  }
  // state = {canvas: [width, height]}

  drawBall = (ctx, ballRadius) => {
    // const canvas = document.getElementById("myCanvas")
    // const ctx = canvas.getContext("2d")
    // letthis.state.ballX = canvas.width/2
    // letthis.state.ballY = canvas.height-30
    // const ballRadius = 10

      ctx.beginPath()
      ctx.arc(this.state.ballX, this.state.ballY, ballRadius, 0, Math.PI*2)
      ctx.fillStyle = "#0095DD"
      ctx.fill()
      ctx.closePath()
  }

  draw = (canvas, ctx) => {

    const ballRadius = 10

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      this.drawBall(ctx, ballRadius)
      if(this.state.ballX + this.state.dirX > canvas.width-ballRadius || this.state.ballX + this.state.dirX < ballRadius) {
          this.setState(prevState => {
            return {dirX: -prevState.dirX}
          })
      }
      if(this.state.ballY + this.state.dirY > canvas.height-ballRadius || this.state.ballY + this.state.dirY < ballRadius) {
          this.setState(prevState => {
            return {dirY: -prevState.dirY}
          })
      }
     this.state.ballX += this.state.dirX;
     this.state.ballY += this.state.dirY;
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
      return this.draw(canvas, ctx), 10
    })
)




  }
  render() {
      const {width, height} = this.props

    return (
      <div>
        <canvas id="myCanvas" width={width} height={height}> </canvas>
      </div>
    )
  }
}
