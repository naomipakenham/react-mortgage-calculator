import React, { Component } from 'react';
import Graph from './Graph.js'

class Graphs extends Component {


  render() {
    const {data, result} = this.props;
    return (
      <div className="Graphs">
      {result}
      <Graph data={data}/>
      </div>
    );
  }
}

export default Graphs;
