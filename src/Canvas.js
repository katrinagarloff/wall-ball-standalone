import React, { Component } from 'react';
import UserBall from './UserBall'

export default class Canvas extends Component {
  state = {
    bouncingBall:
    { x: 0,
      y: 0,
      dirX: 0,
      dirY: 0 },
    userBall:
    { x: 0,
      y: 0,
      dirX: 0,
      dirY: 0 }
  }

  drawBall = (ctx, ballRadius, color, x, y) => {

      ctx.beginPath()
      ctx.arc(x, y, ballRadius, 0, Math.PI*2)
      ctx.fillStyle = color
      ctx.fill()
      ctx.closePath()
  }

  draw = (canvas, ctx) => {

    const ballRadius = 10

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      this.drawBall(ctx, ballRadius, "#0095DD", this.state.bouncingBall.x, this.state.bouncingBall.y)
      if (this.state.bouncingBall.x + this.state.bouncingBall.dirX > canvas.width-ballRadius || this.state.bouncingBall.x + this.state.bouncingBall.dirX < ballRadius) {
          this.setState(prevState => {
            return {
              bouncingBall: {
                ...prevState.bouncingBall,
                dirX: -prevState.bouncingBall.dirX }
              }
              },
            () => {
              this.setState(prevState => {
                return {
                  bouncingBall: {
                    ...prevState.bouncingBall,
                  x: prevState.bouncingBall.x += this.state.bouncingBall.dirX,
                  y: prevState.bouncingBall.y += this.state.bouncingBall.dirY }
                }
            })
            })
      }
      if(this.state.bouncingBall.y + this.state.bouncingBall.dirY > canvas.height-ballRadius || this.state.bouncingBall.y + this.state.bouncingBall.dirY < ballRadius) {
          this.setState(prevState => {
            return {
              bouncingBall:
                { ...prevState.bouncingBall,
                  dirY: -prevState.bouncingBall.dirY }
            }
          }, () => {
            this.setState(prevState => {
              return {
                bouncingBall:
                { ...prevState.bouncingBall,
                  x: prevState.bouncingBall.x += this.state.bouncingBall.dirX,
                  y: prevState.bouncingBall.y += this.state.bouncingBall.dirY }
              }
            })
          })
        } else {
          this.setState(prevState => {
            return {
              bouncingBall:
              { ...prevState.bouncingBall,
                x: prevState.bouncingBall.x += this.state.bouncingBall.dirX,
                y: prevState.bouncingBall.y += this.state.bouncingBall.dirY }
            }
          })
        }
  }

  startingPosition = (x, y) => {
    this.setState(prevState => {
      return {
        userBall:
          { ...prevState.userBall,
            x: x,
            y: y }
      }
    })
  }

  componentDidMount(){
    const canvas = document.getElementById("myCanvas")
    const ctx = canvas.getContext("2d")

    this.setState({
        bouncingBall:
        { x: canvas.width/2,
          y: canvas.height-30,
          dirX: 2,
          dirY: -2 },
        userBall:
        { x: canvas.width/3,
          y:canvas.height-20,
          dirX: 2,
          dirY: -2 }
      },
      () => setInterval(() => {
      this.draw(canvas, ctx)}, 10
    )
)


  }

  render() {
      const {width, height} = this.props

    return (
      <div>
        <canvas id="myCanvas" width={width} height={height}> </canvas>

        <UserBall canvas={document.getElementById("myCanvas")} drawBall={this.drawBall} startingPosition={this.startingPosition}/>
      </div>
    )
  }
}
// ballX: 0,
// ballY: 0,
// dirX: 0,
// dirY: 0
