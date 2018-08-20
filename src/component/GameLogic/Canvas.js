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
      y: 0,
      dirX: 0,
      dirY: 0 },
    arrow:
    { up: false,
      down: false,
      left: false,
      right: false
    },
    walls: [{x: 500, y: 100, width: 5, length: 100}, {x: 100, y:600, width: 5, length: 100}, {x: 500, y: 400, width: 5, length: 100}, {x: 200, y: 100, width: 100, length: 5}],
    ballCollision: false,
    timer: 0

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
                dirY: 0 },
            userBall:
              { x: 0,
                y: 0,
                dirX: 0,
                dirY: 0 }
            }
      )
    }
  }

  checkForWall = (wall, ballState) => {
    return (ballState.x + ballState.dirX > wall.x - (wall.width + 10 ) && //-25
      ballState.x + ballState.dirX < wall.x + (wall.width + 10) && //+ 25
      ballState.y + ballState.dirY > wall.y - (wall.length + 10) && //- 10
      ballState.y + ballState.dirY < wall.y + wall.length + 10) // +100
  }

  // checkForWallForUser = (wall, ballState) => {
  //   return (ballState.x + ballState.dirX > wall.x -15 &&
  //     ballState.x + ballState.dirX < wall.x +15 &&
  //     ballState.y + ballState.dirY > wall.y -100 &&
  //     ballState.y + ballState.dirY < wall.y +100)
  // }

  selectWall = (newAr, wall) => {
    return newAr.findIndex(obj => obj.x === wall.x)
  }



  draw = (canvas, ctx) => {
    const ballRadius = 20

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      this.drawBall(ctx, ballRadius, "#0095DD", this.state.comp.x, this.state.comp.y)

      if (this.state.comp.x + this.state.comp.dirX >  canvas.width-ballRadius || this.state.comp.x + this.state.comp.dirX < ballRadius || this.state.walls.some((wall) => this.checkForWall(wall, this.state.comp))
    ) {

        this.switchDirection("dirX")
      }
      if (this.state.comp.y + this.state.comp.dirY > canvas.height-ballRadius || this.state.comp.y + this.state.comp.dirY < ballRadius) {

        this.switchDirection("dirY")

        } else {
          this.move()
        }
  }

  drawBall = (ctx, ballRadius, color, x, y) => {
      ctx.beginPath()
      ctx.arc(x, y, ballRadius, 0, Math.PI*2)
      ctx.fillStyle = color
      ctx.fill()
      ctx.closePath()
  }

  drawUserBall = (canvas, ctx) => {
    const ballRadius = 10

    this.drawBall(ctx, ballRadius, '#ebf442', this.state.userBall.x, this.state.userBall.y)

    if(this.state.arrow.up && this.state.userBall.y -2 > 0 + ballRadius) {
      this.moveWallNow(this.moveWallY)
      this.moveUserBall("y", -2, "dirY", "dirX")

    } else if (this.state.arrow.down && this.state.userBall.y +2 < canvas.height - ballRadius) {
      this.moveWallNow(this.moveWallY)
      this.moveUserBall("y", 2, "dirY", "dirX")

    }  else if (this.state.arrow.left && this.state.userBall.x -2 > 0 + ballRadius) {
      this.moveWallNow(this.moveWallX)
      this.moveUserBall("x", -2, "dirX", "dirY")

    } else if (this.state.arrow.right && this.state.userBall.x +2 < canvas.width - ballRadius) {
      this.moveWallNow(this.moveWallX)
      this.moveUserBall("x", 2, "dirX", "dirY")
    }


  }

wallPosition = () => {

}
drawWall = (c, ctx) => {
    this.state.walls.forEach(wall => {
      ctx.fillStyle = "#1a1d23"
      ctx.fillRect(wall.x, wall.y, wall.width, wall.length)
    })
  }

  handleKeyDown = (e) => {
    this.changeArrowState(e, true)
  }

  handleKeyUp = (e) => {
    this.changeArrowState(e, false)
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

  checkArrowStatus() {
    return (this.state.arrow.up || this.state.arrow.down || this.state.arrow.left || this.state.arrow.right)
  }

  moveWall = (wall, buffer, xy, dir) => {
    this.setState(prevState => {
      const newAr = [ ...prevState.walls ]
      newAr[this.selectWall(newAr, wall)][xy] = this.state.userBall[xy] + this.state.userBall[dir] + buffer
      // newAr[this.selectWall(newAr, wall)].y = this.state.userBall.y + this.state.userBall.dirY
      return {
        walls: [ ...newAr ]
      }
    })
  }
  moveWallX = (wall) => {
      if(this.state.userBall.x > wall.x) {
        this.moveWall(wall, -20, "x", "dirX")
      } else if (this.state.userBall.x < wall.x) {
        this.moveWall(wall, 20, "x", "dirX")
      }
    }

    moveWallY = (wall) => {
        if(this.state.userBall.y > wall.y ) {
          this.moveWall(wall, -110, "y", "dirY")
        } else if (this.state.userBall.y < wall.y) {
          this.moveWall(wall, 10, "y", "dirY")
        }
      }

  moveWallNow = (move) => {
    this.state.walls.forEach(wall => {
      if(this.checkForWall(wall, this.state.userBall)) {
      move(wall)
      }
    })
  }

  moveUserBall = (xy, newDir, curDir, nullDir) => {
    this.setState(prevState => {
      return {
        userBall:
        { ...prevState.userBall,
          [xy]: prevState.userBall[xy] += newDir,
          [curDir]: newDir,
          [nullDir]: 0
          }
      }
    }, () => this.setState(prevState => {
      return {
        userBall:
        { ...prevState.userBall,
          [xy]: prevState.userBall[xy] += prevState.userBall[curDir] }
        }
    }))
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

  updateArrow = (dir, bool) => {
    this.setState(prevState => {
      return {
        arrow:
        { ...prevState.arrow,
          [dir]: bool }
      }
    })
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
          dirX: 3,
          dirY: 3 }
      },
      () => {
      setInterval(() => { this.draw(canvas, ctx) }, 10)
      setInterval(() => { this.drawUserBall(canvas, ctx) }, 10)
      setInterval(() => { this.drawWall(canvas, ctx) }, 10)
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
