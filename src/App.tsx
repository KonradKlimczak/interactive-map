import * as React from "react";
import "./App.css";
import map from "./berlin_map.png";
import Map from "./components/Map/Map";
import Point, { IPointProps } from "./components/Point/Point";
import { Popover, PopoverContent } from "./components/Popover";
import { getIncidents, IIncident } from "./service/Data/Incident";
import { RemoteData, RemoteDataKind } from "./service/Data/RemoteData";
import { assertNever } from "./utils/assertNever";

interface IAppState {
  incidents: RemoteData<IIncident[]>;
}

class App extends React.Component<{}, IAppState> {
  public state: IAppState = {
    incidents: { kind: RemoteDataKind.NotAsked }
  };

  public componentDidMount() {
    this.setState({ incidents: { kind: RemoteDataKind.Loading } }, () => {
      getIncidents()
        .then(incidents => {
          this.setState({
            incidents: { kind: RemoteDataKind.Success, data: incidents }
          });
        })
        .catch(error => {
          this.setState({ incidents: { kind: RemoteDataKind.Failure, error } });
        });
    });
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Interactive Map Alert System Refurbished v2.0.4
          </h1>
        </header>
        <main className="App-main">
          <div className="App-sidebar">
            <p className="App-alerts">Alerts</p>
            {this.renderAlerts()}
          </div>
          <div className="App-content">
            <Map src={map}>
              <React.Fragment>{this.renderPoints()}</React.Fragment>
            </Map>
          </div>
        </main>
      </div>
    );
  }

  private renderAlerts = () => {
    const { incidents } = this.state;
    switch (incidents.kind) {
      case RemoteDataKind.NotAsked:
        return "nothing";
      case RemoteDataKind.Loading:
        return "loading";
      case RemoteDataKind.Success:
        return (
          <ul>
            {incidents.data.map(incident => (
              <li>{incident.details}</li>
            ))}
          </ul>
        );
      case RemoteDataKind.Failure:
        return "Ohhhhhhhhhh SNAP @#!$!@";

      default:
        return assertNever(incidents);
    }
  };

  private renderPoints = () => {
    const { incidents } = this.state;
    if (incidents.kind === RemoteDataKind.Success) {
      return incidents.data
        .reduce(
          (
            uniqPoints: Array<{ point: IPointProps; incidents: IIncident[] }>,
            incident: IIncident
          ) => {
            const incitendsWithTheSamePoint = uniqPoints.find(
              uniqPoint =>
                uniqPoint.point.x === incident.point.x &&
                uniqPoint.point.y === incident.point.y
            );
            if (incitendsWithTheSamePoint) {
              return [
                ...uniqPoints.filter(
                  uniqPoint => uniqPoint !== incitendsWithTheSamePoint
                ),
                {
                  point: incitendsWithTheSamePoint.point,
                  incidents: [...incitendsWithTheSamePoint.incidents, incident]
                }
              ];
            }
            return [
              ...uniqPoints,
              { point: incident.point, incidents: [incident] }
            ];
          },
          []
        )
        .map((uniqPointIncidents, index) => (
          <Popover>
            <Point key={index} {...uniqPointIncidents.point} />
            <PopoverContent title="And here, that's what happened:">
              uniqPointIncidents {uniqPointIncidents.incidents.length}
            </PopoverContent>
          </Popover>
        ));
    }
    return null;
  };
}

export default App;
