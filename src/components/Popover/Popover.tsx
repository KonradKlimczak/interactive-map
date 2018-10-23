import * as React from "react";
import { assertNever } from "src/utils/assertNever";
import "./Popover.css";
import { IPopoverContentProps, PopoverContent } from "./PopoverContent";

enum PopoverKind {
  Opened = "Opened",
  Closed = "Closed"
}

export interface IPopoverState {
  popover:
    | {
        kind: PopoverKind.Closed;
      }
    | {
        kind: PopoverKind.Opened;
        x: number;
        y: number;
      };
}

export class Popover extends React.Component<{}, IPopoverState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      popover: { kind: PopoverKind.Closed }
    };
  }

  public render() {
    const popoverContent = React.Children.toArray(this.props.children).find(
      (child): child is React.ReactElement<IPopoverContentProps> =>
        React.isValidElement<IPopoverContentProps>(child) &&
        child.type === PopoverContent
    );
    const restOfChildren = React.Children.toArray(this.props.children).filter(
      child => React.isValidElement<IPopoverContentProps>(child)
    );
    return (
      <div className="PopoverWrapper" onMouseOver={this.handleMouseOver}>
        {restOfChildren}
        {this.renderPopoverContent(popoverContent)}
      </div>
    );
  }

  private renderPopoverContent(
    popoverContent?: React.ReactElement<IPopoverContentProps>
  ) {
    switch (this.state.popover.kind) {
      case PopoverKind.Opened:
        return (
          <div
            style={{
              position: "fixed",
              top: this.state.popover.x,
              left: this.state.popover.y
            }}
          >
            {popoverContent}
          </div>
        );
      case PopoverKind.Closed:
        return null;
      default:
        return assertNever(this.state.popover);
    }
  }

  private handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    this.setState({
      popover: { kind: PopoverKind.Opened, x: e.clientX, y: e.clientY }
    });
  };
}
