import React, { Component } from 'react';
import CanvasJSReact from '../../assets/libs/canvasjs.react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Charts extends Component {
  componentDidMount() {
    this.props.onGetTemp();
  }

  render() {
    let options = {};

    if (this.props.temp.length > 0) {
      const data = this.props.temp[0].point_data.map(i => {
        let graphName = i.name;
        let graphData = i.graph_data.map(function(dataPoint) {
          return { x: new Date(dataPoint['x']), y: dataPoint['actual'] };
        });
        return {
          type: 'line',
          name: graphName,
          showInLegend: true,
          toolTipContent: '{y}°C',
          dataPoints: graphData
        };
      });

      options = {
        animationEnabled: true,
        theme: 'light2',
        title: {
          text: 'Temperature graph for 30 May - 31 May'
        },
        axisY: {
          title: 'Temperature',
          suffix: '°C'
        },
        axisX: {
          title: 'Time',
          interval: 2
        },
        data: data
      };
    }

    return (
      <>
        <CanvasJSChart options={options} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    temp: state.tempReducer.temp
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetTemp: () => dispatch(actions.getTemperatures())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
