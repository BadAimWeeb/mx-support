import React from "react";

import firebase from "../firebase";

export default class CanSupport extends React.Component {
    state = {
        list: []
    }

    r: {
        [id: string]: any
    } = {}

    stopListening!: Function;

    componentDidMount() {
        this.stopListening = firebase.firestore().collection("supportList").onSnapshot({
            next: (d) => {
                for (let docc of d.docChanges()) {
                    switch (docc.type) {
                        case "added":
                            this.r[docc.doc.id] = this.getItem(docc.doc.data());
                            break;
                        case "removed":
                            delete this.r[docc.doc.id];
                    }
                    this.setState({
                        list: Object.values(this.r)
                    })
                }
            }
        })
    }

    componentWillUnmount() {
        this.stopListening?.();
    }

    getItem(data: any) {
        return (
            <CanSupportItem 
                name={data.name}
                phone={data.phone}
                address={data.address}
            />
        )
    }

    render() {
        return (
            <div style={{
                paddingTop: 16
            }}>
                Dưới đây là danh sách những người cần được giúp đỡ.<br /><br />
                {this.state.list}
            </div>
        )
    }
}

interface CanSupportItemProps {
    name: string,
    address: string,
    phone: string
}

class CanSupportItem extends React.Component<CanSupportItemProps> {
    render() {
        return (
            <div style={{
                border: "1px solid black",
                borderRadius: 16,
                padding: 16,
                marginTop: 8,
                marginBottom: 8
            }}>
                Họ và tên: {this.props.name}<br />
                Địa chỉ: {this.props.address}<br />
                Số điện thoại: {this.props.phone}<br />
            </div>
        )
    }
}
