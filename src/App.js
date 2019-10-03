import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';
import {MortgageLoan, MonthlyRepayment, InterestRate, days} from './CONST';
import Graphs from './Graphs.js';

class App extends Component {

constructor(props){
  super(props);
  this.state = {
    isPaneOpen: true,
    userInputs :{
      mortgageLoan : MortgageLoan.initialValue,
      monthlyRepayment : MonthlyRepayment.initialValue,
      interestRate : InterestRate.initialValue
    }
  }
}


getInterestThisMonth(moneyLeft, month, interestRate){
 var interestThisMonth = 0;
 for(var i = 0; i < days[month%12]; i++){
  interestThisMonth += (moneyLeft * interestRate/100)/365;
 }
 return interestThisMonth;
}

makeMonthlyPayment(moneyLeft, monthlyRepayment){
 if(moneyLeft > monthlyRepayment){
  return moneyLeft - monthlyRepayment;
 } else {
  return 0;
 }
}

eachMonth(moneyLeft, compoundInterest, months, quaterlyInterest, interestRate, monthlyRepayment, graphArray){
 months++;
 var interestThisMonth = this.getInterestThisMonth(moneyLeft, months, interestRate);
 quaterlyInterest += interestThisMonth;
 moneyLeft = this.makeMonthlyPayment(moneyLeft, monthlyRepayment);

 var isQuaterOfYear = months%3 === 0;
 var isFinalMonth = !(moneyLeft > 0 && months < 420);

 if(isQuaterOfYear || isFinalMonth){
  if(moneyLeft > 0){
    moneyLeft+= quaterlyInterest;
  }
  compoundInterest += quaterlyInterest;
  quaterlyInterest = 0;
 }

 graphArray.push([months/12, moneyLeft, compoundInterest]);

 if(!isFinalMonth){
   return this.eachMonth(moneyLeft, compoundInterest, months, quaterlyInterest, interestRate, monthlyRepayment, graphArray);
 } else {
   return {moneyLeft, compoundInterest, months, graphArray};
 }
}

twoDPs(num){
 return num.toFixed(2);
}

mortgageCalculation(){
 const { userInputs: { monthlyRepayment, interestRate, mortgageLoan }} = this.state;

 console.log('borrowed money: €' + mortgageLoan);
 console.log('Interest rate: ' + interestRate + '%');
 console.log('monthly payment: €' + monthlyRepayment);

 var mortgage = this.eachMonth(mortgageLoan, 0, 0, 0, interestRate, monthlyRepayment, []);
 const { months, moneyLeft, compoundInterest, graphArray } = mortgage;
 if(moneyLeft === 0){
  console.log('time: ' +  Math.floor(months/12) + ' years ' + months%12 + ' months')
  console.log('compound interest: €' + this.twoDPs(compoundInterest));
 } else {
  console.log('Warning: With the options you chose you cannot pay off your mortgage in 35 years. You will still have €' + this.twoDPs(moneyLeft) + ' left to pay off.')
 }
 return mortgage;
}

onSliderChange(sliderName, value){
  let { userInputs } = this.state;
  userInputs[sliderName] = value;
  this.setState({userInputs});
}

iconClicked(isPanelOpen){
  this.setState({isPanelOpen});
}

  render() {
    const { months, moneyLeft, compoundInterest, graphArray} = this.mortgageCalculation();
    const {isPaneOpen} = this.state;
    let result = <div/>;
    const AppClass = isPaneOpen ? 'App' : 'App PanelClosed'
    if(moneyLeft === 0){
     result = <div className='Result'>Your mortage will be paid in <b>{(Math.floor(months/12) + ' years ' + months%12 + ' months ')}</b> acruing <b>compound interest of €{this.twoDPs(compoundInterest)}</b></div>;
    } else {
     result = <div className='Result'>Bad news, with the options you chose you <b>cannot pay off your mortgage in 35 years</b> (generally the maximum time for banks). You will still have <b>€{this.twoDPs(moneyLeft)} left to pay off</b></div>;
    }
    return (
      <div className={AppClass}>
          <Form inputs={[MortgageLoan, MonthlyRepayment, InterestRate]} onSliderChange={this.onSliderChange.bind(this)}/>
          <Graphs data={graphArray} result={result}/>
      </div>
    );
  }
}

export default App;
