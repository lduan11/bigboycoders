import React, { Component } from "react";
import { connect } from "react-redux";
import { sendMessage } from "./chat";

let messageCounter = 0;

class App extends Component {
  render() {
    const { feed, sendMessage } = this.props;
    return (
      <div className="chat-container">
        <ul>
          {feed.map(entry =>
            messageCounter++ % 2 === 0 ? (
              <li style={{ color: "rgb(0, 171, 279)" }}>{entry.text}</li>
            ) : (
              <li style={{ color: "black" }}>{entry.text}</li>
            )
          )}
        </ul>
        <input
          type="text"
          // keyCode 13 is 'Enter Key'
          onKeyDown={e =>
            e.keyCode === 13 ? sendMessage(e.target.value) : null
          }
          onKeyUp={e => (e.keyCode === 13 ? (e.target.value = "") : null)}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feed: state
});

export default connect(mapStateToProps, { sendMessage })(App);
