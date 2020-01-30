import React from 'react';

import { Route } from 'react-router-dom';
import NewPage from "./components/NewPage";
import Home from "./components/Home";

import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isModalOpen: false,
    }
  }

  render(){
    return (
    <div className="App">
      <Route exact path="/" component={Home}/>
      <Route path="/new" component={NewPage}/>
    </div>
    );
  }
}

export default App;
