import * as React from "react";
import "./Map.css";

export interface IMap {
  src: string;
}

class Map extends React.Component<IMap> {
  public render() {
    const { src } = this.props;
    return (
      <div className="Map">
        <img src={src} className="Map-img" alt="Map" />
      </div>
    );
  }
}

export default Map;
