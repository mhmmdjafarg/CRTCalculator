import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";

export function showResult(datas, classes) {
  let result;
  if (datas == null || isNaN(datas.x)) {
    result = (
      <div>
        <p>Cannot be solved</p>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="button"
        >
          Clear
        </Button>
      </div>
    );
  } else {
    result = (
      <div className="result">
        <p>X = {datas.x} + {datas.m}k</p>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="button"
        >
          Clear
        </Button>
      </div>
    );
  }
  ReactDOM.render(result, document.getElementById("result"));
}
