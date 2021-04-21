import React, {Component} from 'react';
import {useAlert} from '../contexts/alert';

class Alert extends Component {

    cancel = (e) => {
        e.preventDefault();
        this.props.close();
        if (this.props.cancelCallback) {
            this.props.cancelCallback();
        }
    };

    submit = (e) => {
        e.preventDefault();
        this.props.close();
        if (this.props.submitCallback) {
            this.props.submitCallback();
        }
    };

    render() {
        return (
            <article id="gjAlertWrap" className={this.props.isVisible ? 'active' : ''} tabIndex="0">
                <div className="vertical-align-wrap">
                    <div className="vertical-align">
                        {
                            this.props.isVisible ?
                                <div id="gjAlert">
                                    <section>
                                        <p dangerouslySetInnerHTML={{__html: this.props.alertText}}/>
                                    </section>
                                    <section>
                                        {
                                            this.props.cancelText ?
                                                <button type="button" id="gjCancel" className={(this.props.cancelClassName ? this.props.cancelClassName : '')} style={this.props.cancelStyle} onClick={this.cancel}>
                                                    <span>{this.props.cancelText}</span>
                                                </button>
                                                : null
                                        }
                                        {
                                            this.props.submitText ?
                                                <button type="button" id="gjSubmit" className={(this.props.submitClassName ? this.props.submitClassName : '')} style={this.props.submitStyle} onClick={this.submit}>
                                                    <span>{this.props.submitText}</span>
                                                </button>
                                                : null
                                        }
                                    </section>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </article>
        );
    }
}

export default useAlert(
    ({state, actions}) => ({
        isVisible: state.isVisible,
        alertText: state.alertText,
        cancelClassName: state.cancelClassName,
        cancelText: state.cancelText,
        cancelCallback: state.cancelCallback,
        cancelStyle: state.cancelStyle,
        submitClassName: state.submitClassName,
        submitText: state.submitText,
        submitCallback: state.submitCallback,
        submitStyle: state.submitStyle,
        close: actions.close
    })
)(Alert);