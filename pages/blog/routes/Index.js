import React, {Component} from 'react';
import {useAlert} from "../contexts/alert";

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.show({
            alertText: "안녕하세요 modal 테스트입니다.",
            cancelText: "취소",
            submitText: "확인"
        })
    }

    render() {
        return(
            <section id="gjIndexWrap">
                인덱스랩
            </section>
        )
    }
}

export default useAlert(
    ({actions}) => ({
        show: actions.show,
        alertError: actions.alertError
    })
)(Index);