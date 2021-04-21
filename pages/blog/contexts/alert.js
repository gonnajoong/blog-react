import React, {Component, createContext} from 'react';
import {createUseConsumer} from '../../../utils/context';
import CONSTANT from '../constants/constant';

const Context = createContext();

const {Provider, Consumer: AlertConsumer} = Context;

const defaultState = CONSTANT.defaultAlertState;

class AlertProvider extends Component {
    state = Object.assign({}, defaultState);
    actions = {
        init: () => {
            this.setState(Object.assign({}, defaultState));
        },
        close: () => {
            this.setState({
                isVisible: false
            });
        },
        show: (option) => {
            let temp = Object.assign(Object.assign({}, defaultState), option);
            temp.isVisible = true;
            this.setState(temp);
        },
        alertError: (status, data) => {
            let text;
            if (!text && data && data.message) {
                text = data.message;
            }
            let temp = Object.assign(Object.assign({}, defaultState), defaultState);
            temp.isVisible = true;
            temp.alertText = text;
            this.setState(temp);
        }
    };

    render() {
        const {state, actions} = this;
        const value = {state, actions};
        return (
            <Provider value={value}>
                {this.props.children}
            </Provider>
        );
    }
}

const useAlert = createUseConsumer(AlertConsumer);

export {
    AlertProvider,
    AlertConsumer,
    useAlert
};
