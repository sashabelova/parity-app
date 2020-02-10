import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import MessageHandler from '../../components/MessageHandler/MessageHandler';

class SendMessage extends Component {
  state = {
    message: '',
    warning: false
  };

  onInputChange = event => {
    this.setState({ message: event });
  };

  onSubmit = event => {
    event.preventDefault();
    this.textInput.focus();
    this.props.onSendMessage(this.state.message);
    this.setState({ message: '', warning: true });
    setTimeout(() => {
      this.setState({ warning: false });
    }, 1500);
  };

  render() {
    const { message, warning } = this.state;
    return (
      <div className="message-form">
        <form onSubmit={this.onSubmit} aria-label="Send a message">
          <input
            type="text"
            placeholder="Message..."
            name="send-message"
            ref={inp => {
              this.textInput = inp;
            }}
            value={message}
            onChange={event => this.onInputChange(event.target.value)}
          />
          <button type="submit" disabled={!message}>
            Submit
          </button>
        </form>
        {warning ? <MessageHandler error={this.props.error} message={this.props.message} /> : ''}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.messagesReducer.message,
    error: state.messagesReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSendMessage: val => dispatch(actions.sendMessage(val))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);
