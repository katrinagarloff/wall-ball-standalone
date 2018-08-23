import React, { Component } from 'react';

export default class Canvas extends Component {
  state = {
    comp:
    [{x: 0,
      y: 0,
      dirX: 0,
      dirY: 0 }],
    userBall:
    { x: 0,
      y: 0,
      dirX: 0,
      dirY: 0 },
    goal: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
      },
    arrow:
    { up: false,
      down: false,
      left: false,
      right: false
    },
    walls: [],
    ballCollision: false,
    goalCollision: false,
    timer: 0

  }

  setWalls = (newWalls) => {
    this.setState({walls: newWalls})
  }

  getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}
  randomizeWalls = () => {
    let newAr = []
    this.getRandomInt(20, 750)
    for(let i=0; i<4; i++) {
      newAr.push({x: this.getRandomInt(20, 750), y: this.getRandomInt(20, 750), width: 150, height: 10})
    }
    for(let i=0; i<4; i++) {
      newAr.push({x: this.getRandomInt(20, 750), y: this.getRandomInt(20, 750), width: 10, height: 150})
    }
    return newAr
  }

  setIntervals = () => {
    const canvas = document.getElementById("myCanvas")
    const ctx = canvas.getContext("2d")
    const compInterval = setInterval(() => { this.draw(canvas, ctx) }, 10)
    const userInterval = setInterval(() => { this.drawUserBall(canvas, ctx) }, 10)
  }
  startGame(){
    const canvas = document.getElementById("myCanvas")
    const ctx = canvas.getContext("2d")
    this.setState((prevState) => {
      return {comp:
        { x: 200,
          y: 300,
          dirX: 3,
          dirY: -3 },
        userBall:
        { x: canvas.width/3,
          y:canvas.height-20,
          dirX: 3,
          dirY: 3 },
      goal: {
        x: canvas.width/2,
        y: canvas.height/2,
        width: 40,
        height: 40
      }
    }
    })
  }

  componentDidMount(){
    this.setWalls(this.randomizeWalls())
    this.startGame()
    this.setIntervals()
  }

  componentDidUpdate(prevProps, prevState) {
    const canvas = document.getElementById("myCanvas")
    const ctx = canvas.getContext("2d")

    this.drawGoal(canvas, ctx)
    this.drawWall(canvas, ctx)

  }

  changeArrowState = (e, bool) => {
    // refactor to case statement
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
        this.props.loseGame()
    }
  }

  checkForWall = (wall, ballState) => {
    // if multiple walls satisfy this condition - it might move both
    return (ballState.x + ballState.dirX > wall.x -  10 && //-25
      ballState.x + ballState.dirX < wall.x + (wall.width + 10) && //+ 25
      ballState.y + ballState.dirY > wall.y - 10 && //- 10
      ballState.y + ballState.dirY < wall.y + (wall.height + 10)) // +100
  }



  checkForWallType = (wall, comp) => {
    // if wall width is === 5 return true -- if its vert then change dirX
    if (wall.width > wall.height) {
      this.switchDirection("dirY")
    } else if (wall.width < wall.height) {
      // this is a vertical wall
      // if wall width is === 100 return true -- if its hoz then change dirY
      this.switchDirection("dirX")
    }
  }

  draw = (canvas, ctx) => {
    const ballRadius = 20
    const { x, y, dirX, dirY } = this.state.comp
    const { walls, comp } = this.state

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.drawBall(ctx, ballRadius, "#0095DD", comp.x, comp.y)

    // checking for collisions on outside walls
    if (x + dirX > canvas.width-ballRadius || x + dirX < ballRadius){
      this.switchDirection("dirX")
    } else if (y + dirY > canvas.height-ballRadius || y + dirY < ballRadius) {
      this.switchDirection("dirY")
    }
    walls.forEach(wall => {
      if (this.checkForWall(wall, comp)){
        this.checkForWallType(wall, comp)
      }
    })
      if (this.checkForGoal(this.state.comp, this.state.goal)) {
        this.props.winGame()
        this.setWalls(this.randomizeWalls())
        this.startGame()
      }
    this.move()
  }

  checkForGoal = (ballState, goal) => {
    return !!(ballState.x + ballState.dirX > goal.x - 10 && //-25
      ballState.x + ballState.dirX < goal.x + (goal.width + 10) && //+ 25
      ballState.y + ballState.dirY > goal.y - 10 && //- 10
      ballState.y + ballState.dirY < goal.y + (goal.height + 10))
  }

  drawBall = (ctx, ballRadius, color, x, y) => {
      ctx.beginPath()
      ctx.arc(x, y, ballRadius, 0, Math.PI*2)
      ctx.fillStyle = color
      ctx.fill()
      ctx.closePath()
  }

  checkWallBufferY(wall, dir) {
    const canvas = document.getElementById("myCanvas")
    return (wall.y -10 > 0 + 10 && wall.y + 10 < canvas.height)
  }

  drawUserBall = (canvas, ctx) => {
    const ballRadius = 10
    const { x, y } = this.state.userBall
    const { up, down, left, right } = this.state.arrow

    this.drawBall(ctx, ballRadius, '#7b48db', x, y)

    if (up && y -2 > 0 + ballRadius) {
      this.moveWallNow(this.moveWallY, -2)
      this.moveUserBall("y", -2, "dirY", "dirX")

    } else if (down && y +2 < canvas.height - ballRadius) {

      this.moveWallNow(this.moveWallY, 2)
      this.moveUserBall("y", 2, "dirY", "dirX")

    } else if (left && x -2 > 0 + ballRadius) {
      this.moveWallNow(this.moveWallX, -2)
      this.moveUserBall("x", -2, "dirX", "dirY")

    } else if (right && x +2 < canvas.width - ballRadius) {
      this.moveWallNow(this.moveWallX, 2)
      this.moveUserBall("x", 2, "dirX", "dirY")
    }


  }

drawWall = (c, ctx) => {
    this.state.walls.forEach(wall => {
      ctx.fillStyle = "#1a1d23"
      ctx.fillRect(wall.x, wall.y, wall.width, wall.height)
    })
  }

  drawGoal = (c, ctx) => {
    const { goal } = this.state
    ctx.fillStyle = "#f45c42"
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height)
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


  moveWall = (wall, buffer, xy, dir) => {

    this.setState(prevState => {
      const newAr = [ ...prevState.walls ]
      newAr[this.selectWall(newAr, wall)][xy] = newAr[this.selectWall(newAr, wall)][xy] + dir + buffer
      return {
        walls: [ ...newAr ]
      }
    })
  }


  moveWallX = (wall, dir) => {
    const canvas = document.getElementById("myCanvas")
      if(this.state.userBall.x > wall.x) {
        if(wall.x -15 > 0 + 10) {
          this.moveWall(wall, -10, "x", dir)
        }
      } else if (this.state.userBall.x < wall.x) {
        if(wall.x + wall.width < canvas.width -15) {
          this.moveWall(wall, 10, "x", dir)
        }
      }
    }

    moveWallY = (wall, dir) => {
      const canvas = document.getElementById("myCanvas")

        if(this.state.userBall.y > wall.y ) {
          if(wall.y -20 > 10) {
          this.moveWall(wall, -10, "y", dir)
        }
        } else if (this.state.userBall.y < wall.y) {
          if(wall.y + wall.height < canvas.height - 20){
          this.moveWall(wall, 10, "y", dir)
          }
        }
      }

  moveWallNow = (move, dir) => {
    this.state.walls.forEach(wall => {
      if (this.checkForWall(wall, this.state.userBall)) {
        move(wall, dir)
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

  selectWall = (newAr, wall) => {
    return newAr.findIndex(obj => obj.x === wall.x && obj.y === wall.y)
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



  render() {

    return (
      <div>
         <canvas id="myCanvas"
           width={800} height={800}
           onKeyDown={this.handleKeyDown}
           onKeyUp={this.handleKeyUp}
           tabIndex="0">
         </canvas>
         <h1>Wins: {this.props.wins} </h1>
      </div>
    )
  }
}
// { this.state.ballCollision ?
//   <div>
// <p> you lost </p>
//   </div>
// : }
