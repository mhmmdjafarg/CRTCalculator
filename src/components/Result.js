import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";

export function showResult(datas, classes) {
  let result;
  if (datas == null || isNaN(datas.x)) {
    result = (
      <div className="result">
        <p>Cannot be solved</p>
        <p></p>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="button"
          onClick={clearBtnOnClick}
        >
          Clear
        </Button>
      </div>
    );
  } else {
    const questions = [];
    const pairwiseValue = [];
    const mValue = [];
    const MValue = [];
    const yValue = [];
    const xValue = [];

    // first step
    questions.push(<p><i>Using Chinese Remainder Theorem solve the following system of modulo equations: </i></p> );
    for(let i = 0; i < datas.remainders.length; i++){
      questions.push(<p>x mod {datas.modulos[i]} = {datas.remainders[i]}</p>);
    };

    // second step, check pairwise coprime
    pairwiseValue.push(<p>First we check too see if each modulos is pairwise coprime</p>);
    for (let i = 0; i < datas.modulos.length - 1; i++) {
      for (let j = i + 1; j < datas.modulos.length; j++) {
        pairwiseValue.push(<p>Gcd({datas.modulos[i]},{datas.modulos[j]}) = 1</p>);
      }
    }
    pairwiseValue.push(<p>Since all gcd calculation equal 1,then it is pairwise coprime, so we can use the regular formula for the CRT</p>);

    // find m
    let mString = "m = ";
    let m = 1;
    for(let i = 0; i < datas.modulos.length; i++){
      mString += `${datas.modulos[i]} `;
      if(i !== datas.modulos.length - 1){
        mString += ' . ';
      }
    }
    mString += ` = ${datas.m}`;
    mValue.push(<p>Find m value, {mString}</p>);
  
    // find M1 .. Mk
    for (let i = 0; i < datas.modulos.length; i++){
      MValue.push(<p>M<sub>{i+1}</sub> = {datas.m} / {datas.modulos[i]} = {datas.MData[i]}</p>);
    }

    // find Yi
    yValue.push( <p>Find y<sub>k</sub> where y is inverse M<sub>k</sub> in modulus m<sub>k</sub></p>);
    for (let i = 0; i < datas.modulos.length; i++){
      yValue.push(<p>Using our equation {i+1} modulus of {datas.modulos[i]} and our coefficient of {datas.MData[i]}. Calculate y<sub>{i+1}</sub> in the equation {datas.modulos[i]}x<sub>{i+1}</sub> + {datas.MData[i]}y<sub>{i+1}</sub> = 1</p>);
      yValue.push(<p>We get our y<sub>{i+1}</sub> = {datas.yData[i]}</p>);
    }

    // find X
    xValue.push(<p>Plug in all values to solve the equation X = a<sub>1</sub>M<sub>1</sub>y<sub>1</sub> + a<sub>2</sub>M<sub>2</sub>y<sub>2</sub> + ... + a<sub>k</sub>M<sub>k</sub>y<sub>k</sub></p>);
    let xString = "X = ";
    for(let j = 0; j < datas.modulos.length; j++){
      xString += `${datas.modulos[j]}.${datas.MData[j]}.${datas.yData[j]}`;
      if (j !== datas.modulos.length - 1){
        xString += " + ";
      }
    }
    xString += ` = ${datas.x}`;
    xValue.push(<p>{xString}</p>);
    xValue.push(<p>mod X by {datas.m}</p>);


    result = (
      <div className="result">
        <div className="result-item">
        {questions}
        </div>
        <div className="result-item">
        {pairwiseValue}
        </div>
        <div className="result-item">
        {mValue}
        </div>
        <div className="result-item">
        <p>Find M value</p>
        {MValue}
        </div>
        <div className="result-item">
        {yValue}
        </div>
        <div className="result-item">
        {xValue}
        </div>
        <div className="result-item final">
        <p>So the final answer is </p>
        <p>X = {datas.x % datas.m} + {datas.m}k</p>
        </div>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="button"
          onClick={clearBtnOnClick}
        >
          Clear
        </Button>
      </div>
    );
  }
  ReactDOM.render(result, document.getElementById("result"));
};


export function clearBtnOnClick() {
  const result = ( <div></div>);
  ReactDOM.render(result, document.getElementById("result"));
};