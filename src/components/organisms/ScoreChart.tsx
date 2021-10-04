import { LineChart } from ".";

type Props = {
  scores: {
    python: any;
    javascript: any;
  };
  pythonLevel: string;
  javascriptLevel: string;
  setPythonLevel: any;
  setJavascriptLevel: any;
};

const ScoreChart = (props: Props) => {
  return (
    <section className="flex justify-around">
      <LineChart
        title={"Python"}
        scores={props.scores.python}
        label={props.pythonLevel}
        setLevel={props.setPythonLevel}
      />
      <LineChart
        title={"JavaScript"}
        scores={props.scores.javascript}
        label={props.javascriptLevel}
        setLevel={props.setJavascriptLevel}
      />
    </section>
  );
};
export default ScoreChart;
