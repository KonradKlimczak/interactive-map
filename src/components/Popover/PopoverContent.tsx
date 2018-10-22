import * as React from "react";

export interface IPopoverContentProps {
  title: string;
}

export class PopoverContent extends React.Component<IPopoverContentProps> {
  public render() {
    return (
      <div className="PopoverContent">
        <div className="PopoverContent-title">{this.props.title}</div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
