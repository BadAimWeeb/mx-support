import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import { FaPeopleCarry } from "react-icons/fa";

import { Header, HeaderItem } from "./Header";
import CanSupport from "./CanSupport";
import HelpWanted from "./HelpWanted";

import "./MainPage.css";

export default class MainPage extends React.Component {
    state: {
        section?: React.Component<any>
    } = {
        section: undefined
    }

    render() {
        return (
            <div className="main-container">
                <Header>
                    <HeaderItem>
                        <FaPeopleCarry /> MX-Support <FaPeopleCarry />
                    </HeaderItem>
                </Header>
                <Container style={{
                    textAlign: "center",
                    borderRadius: 16,
                    backgroundColor: "white"
                }} className="hpcontainer">
                    <Row>
                        <span style={{
                            fontWeight: "bold",
                            fontSize: 20
                        }}>
                            Chào mừng bạn đã đến với ứng dụng cộng đồng - hỗ trợ người khó khăn!<br />    
                        </span><br />
                        <br />
                        <span style={{
                            fontStyle: "italic",
                            fontSize: 18
                        }}>Bạn cần gì?</span>
                        <br />
                        <div className="hpbutton" onClick={() => this.setState({
                            section: <HelpWanted />
                        })}><Button variant="success">Tôi cần được giúp đỡ</Button></div><br />
                        <div className="hpbutton" onClick={() => this.setState({
                            section: <CanSupport />
                        })}><Button variant="success">Tôi muốn giúp đỡ người khác</Button></div><br />
                    </Row>
                    <Row>
                        {this.state.section}
                    </Row>
                </Container>
            </div>
        );
    }
}
