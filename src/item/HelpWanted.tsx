import React from "react";
import { Form, Button } from "react-bootstrap";

import firebase from "../firebase";

export default class HelpWanted extends React.Component {
    state = {
        errorColor: "red",
        error: ""
    }

    formSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let t = e.target;

        let firestore = firebase.firestore();

        //@ts-ignore
        let name: string = t.name.value.trim(); 
        //@ts-ignore
        let phone: string = t.phone.value.trim(); 
        //@ts-ignore
        let address: string = t.address.value.trim(); 

        if (name) {
            if (phone && /^\d+$/.test(phone) && phone.startsWith("0")) {
                if (address) {
                    fetch(`https://app.geocodeapi.io/api/v1/search?text=${encodeURIComponent(address + ", Vietnam")}&apikey=96b31020-fd9f-11eb-8d77-77cc1859069e`)
                        .then(x => x.json())
                        .then(d => {
                            firestore.collection("supportList").add({
                                name,
                                phone,
                                address,
                                latitude: d?.bbox[0],
                                longitude: d?.bbox[1]
                            });
                            this.setState({
                                errorColor: "green",
                                error: "Thành công!"
                            });
                        })
                        .catch(e => {
                            console.error(e);
                            this.setState({
                                errorColor: "red",
                                error: "Có lỗi đã xảy ra, vui lòng thử lại sau."
                            });
                        });
                } else {
                    this.setState({
                        errorColor: "red",
                        error: "Vui lòng nhập đầy đủ địa chỉ."
                    });    
                }
            } else {
                this.setState({
                    errorColor: "red",
                    error: "Vui lòng nhập số điện thoại (chỉ viết số)."
                });
            }
        } else {
            this.setState({
                errorColor: "red",
                error: "Vui lòng nhập họ và tên."
            });
        }
    }

    render() {
        return (
            <div style={{
                paddingTop: 16
            }}>
                Vui lòng điền thông tin của bạn vào đây để người khác có thể hỗ trợ bạn.<br />
                <div style={{
                    width: "100%"
                }}>
                    <div style={{
                        textAlign: "left",
                        maxWidth: 400,
                        margin: "0 auto",
                        border: "1px solid black",
                        borderRadius: 16,
                        padding: 8
                    }}>
                        <Form onSubmit={e => this.formSubmit(e)}>
                            <Form.Group controlId="name">
                                <Form.Label>Họ và tên</Form.Label>
                                <Form.Control type="text" placeholder="Nhập họ và tên" />
                            </Form.Group>
                            <Form.Group controlId="phone">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control type="phone" placeholder="Nhập số điện thoại" />
                            </Form.Group>
                            <Form.Group controlId="address">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control type="text" placeholder="Nhập địa chỉ (đầy đủ, ngăn cách bằng dấu phẩy)" />
                            </Form.Group><br />
                            <div className="d-grid">
                                <Button variant="success" type="submit">
                                    Gửi!
                                </Button>
                            </div>
                        </Form>
                        <p style={{
                            textAlign: "center",
                            color: this.state.errorColor,
                            paddingTop: 8,
                            fontWeight: "bold"
                        }}>{this.state.error}</p>
                    </div>
                </div>
            </div>
        )
    }
}
