import React from "react";
import "./Header.css";

export class Header extends React.Component {
    render() {
        return (
            <div className="header">
                {this.props.children}
            </div>
        );
    }
}

interface HeaderItemProps {
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export class HeaderItem extends React.Component<HeaderItemProps> {
    render() {
        return (
            <div className="header-item" onClick={e => this.props.onClick?.(e)}>
                {this.props.children}
            </div>
        )
    }
}
