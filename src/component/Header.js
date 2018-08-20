import React from 'react';



const Header = (props) => {
  // console.log(props.leLogo);
  return (
    <div className="App-header">
      <img src={props.logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Wall-Ball</h1>
    </div>

  )
}


export default Header;
