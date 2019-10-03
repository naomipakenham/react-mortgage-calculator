import React, { Component } from 'react';
import Chart from 'react-google-charts';

class Graph extends Component {


  render() {
    const {data} = this.props;
    const graphData = [[
      'Years',
      'Loan left',
      'Compound Interest',
    ]].concat(data)
    return (
      <div className="Graph">
      <Chart width={'100%'}
  height={'100%'}
  chartType="Line"
  loader={<div>Loading Chart</div>}
  data={graphData}
  options={{
      chart: {
      },
    }}
  rootProps={{ 'data-testid': '1' }}/>
      </div>
    );
  }
}

export default Graph;
