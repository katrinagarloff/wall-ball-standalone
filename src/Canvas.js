import React, { Component } from 'react';
import UserBall from './UserBall'

export default class Canvas extends Component {
  state = {
    comp:
    { x: 0,
      y: 0,
      dirX: 0,
      dirY: 0 },
    userBall:
    { x: 0,
      y: 0 },
    arrow:
    { up: false,
      down: false,
      left: false,
      right: false
    },
    walls: [],
    ballCollision: false,
    timer: 0

  }

  checkForCollision = () => {
    if (this.state.userBall !== 0
      && this.state.userBall.x > this.state.comp.x-25
      && this.state.userBall.x < this.state.comp.x+25
      && this.state.userBall.y > this.state.comp.y-25
      && this.state.userBall.y < this.state.comp.y+25 ) {
      this.setState(
         {
           ballCollision: true,
           comp:
              { x: 0,
                y: 0,
                dirX: 0,
                dirY: 0
              },
            userBall:
              { x: 0,
                y: 0 }
            }
      )
    }
  }

  drawBall = (ctx, ballRadius, color, x, y) => {
      ctx.beginPath()
      ctx.arc(x, y, ballRadius, 0, Math.PI*2)
      ctx.fillStyle = color
      ctx.fill()
      ctx.closePath()
  }

  switchDirection = (dir) => {
    this.setState(prevState => {
      return {
        comp: {
          ...prevState.comp,
          [dir]: -prevState.comp[dir] }
        }
      }, () => this.move()
    )
  }

  move = () => {
    this.setState(prevState => {
      return {
        comp: {
          ...prevState.comp,
        x: prevState.comp.x += this.state.comp.dirX,
        y: prevState.comp.y += this.state.comp.dirY }
      }
    }, () => this.checkForCollision())
  }

  draw = (canvas, ctx) => {
    const ballRadius = 20

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      this.drawBall(ctx, ballRadius, "#0095DD", this.state.comp.x, this.state.comp.y)

      if (this.state.comp.x + this.state.comp.dirX >  canvas.width-ballRadius || this.state.comp.x + this.state.comp.dirX < ballRadius) {

        this.switchDirection("dirX")
      }
      if (this.state.comp.y + this.state.comp.dirY > canvas.height-ballRadius || this.state.comp.y + this.state.comp.dirY < ballRadius) {

        this.switchDirection("dirY")

        } else {
          this.move()
        }
  }


  updateArrow = (dir, bool) => {
    this.setState(prevState => {
      return {
        arrow:
        { ...prevState.arrow,
          [dir]: bool }
      }
    })
  }

  changeArrowState = (e, bool) => {

    if (e.key === "ArrowUp") {
      this.updateArrow("up", bool)

    } else if (e.key === "ArrowDown") {
        this.updateArrow("down", bool)

    } else if (e.key === "ArrowLeft") {
        this.updateArrow("left", bool)

    } else if (e.key === "ArrowRight") {
        this.updateArrow("right", bool)
    }
  }

  handleKeyDown = (e) => {
    this.changeArrowState(e, true)
  }

  handleKeyUp = (e) => {
    this.changeArrowState(e, false)
  }

  moveUserBall = (xy, dir) => {
    this.setState(prevState => {
      return {
        userBall:
        { ...prevState.userBall,
          [xy]: prevState.userBall[xy] += dir }
      }
    })
  }

  drawUserBall = (canvas, ctx) => {
    const ballRadius = 10

    this.drawBall(ctx, ballRadius, '#ebf442', this.state.userBall.x, this.state.userBall.y)

    if(this.state.arrow.up && this.state.userBall.y -4 > 0 + ballRadius) {
      this.moveUserBall("y", -4)

    } else if (this.state.arrow.down && this.state.userBall.y +4 < canvas.height - ballRadius) {
      this.moveUserBall("y", 4)

    }  else if (this.state.arrow.left && this.state.userBall.x -4 > 0 + ballRadius) {
      this.moveUserBall("x", -4)

    } else if (this.state.arrow.right && this.state.userBall.x +4 < canvas.width - ballRadius) {
      this.moveUserBall("x", 4)
    }
  }

  componentDidMount(){
    const canvas = document.getElementById("myCanvas")
    const ctx = canvas.getContext("2d")

    this.setState({
        comp:
        { x: canvas.width/2,
          y: canvas.height-30,
          dirX: 3,
          dirY: -3 },
        userBall:
        { x: canvas.width/3,
          y:canvas.height-20,
          dirX: 2,
          dirY: -2 }
      },
      () => {
      setInterval(() => {
      this.draw(canvas, ctx)}, 10 )
      setInterval(() => {
      this.drawUserBall(canvas, ctx)}, 10
      )
    }
    )
  }

  render() {
    const {width, height} = this.props

    return (
      <div>
         <canvas id="myCanvas" width={800} height={800}  onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} tabIndex="0"> </canvas>
      </div>
    )
  }
}
// { this.state.ballCollision ?
//   <div>
// <p> you lost </p>
//   </div>
// : }
