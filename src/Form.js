import React, { Component } from 'react';
import SliderItem from './SliderItem';
import 'react-rangeslider/lib/index.css';
import { faTimes, faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class Form extends Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      value: 100000,
      payment: 1000,
      interestRate: 0.01,
      isOpen: true
    }
  }

  onClickIcon(){
    const {iconClicked} = this.props;
    const {isOpen} = this.state;
    const newIsOpen = !isOpen;
    this.setState({isOpen: newIsOpen});
    iconClicked(newIsOpen);
  }

  render() {
    const {onSliderChange, inputs} = this.props;
    const {isOpen} = this.state;
    const formClass = isOpen ? 'Form Open' : 'Form Closed';
    const icon = isOpen ? faTimes : faSlidersH;
    var SliderItems = inputs.map((slider, index) => {
      return <SliderItem {...slider} key={index} onSliderChange={onSliderChange}/>;
    })
    return (
      <div className={formClass}>
        <FontAwesomeIcon className='Icon' icon={icon} onClick={() => this.onClickIcon()}/>
          {SliderItems}
      </div>
    );
  }
}

export default Form;
