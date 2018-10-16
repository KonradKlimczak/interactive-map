import * as React from "react";
import "./Point.css";

export interface IPointProps {
  x: number;
  y: number;
}

class Point extends React.Component<IPointProps> {
  public render() {
    return (
      <div
        className="Point"
        style={{ top: this.props.x, left: this.props.y }}
      />
    );
  }
}

export default Point;
