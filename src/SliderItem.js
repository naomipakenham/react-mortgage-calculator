import React, { Component } from 'react';
import Slider from 'react-rangeslider';

class SliderItem extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: this.props.initialValue
    }
    this.timeout = null;
  }

  handleChange(value){
    const {id, onSliderChange} = this.props;
    value = parseFloat(value.toFixed(2));
    this.setState({value});
    clearTimeout(this.timeout);
    this.timeout = setTimeout(function () {
    onSliderChange(id, value)}, 500);
  }

  render() {
    const {value} = this.state;
    const {title, min, max, step} = this.props;
    const sliderValue = title.replace('{value}', value);
    return (
      <div className="Slider">
      <div className='Value'>{sliderValue}</div>
          <Slider min={min} max={max} step={step} value={value} onChange={e =>this.handleChange(e)}/>
      </div>
    );
  }
}

export default SliderItem;
