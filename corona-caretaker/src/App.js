import React, { Component } from "react";
import { connect } from "react-redux";
import { sendMessage } from "./chat";

let messageCounter = 0;

class App extends Component {
  render() {
    const { feed, sendMessage } = this.props;
    return (
      <div className="chat-container" id="chat">
        <h2>Hello!</h2>
        <br></br>
        <ul>
          {feed.map(entry =>
            messageCounter++ % 2 === 0 ? (
              <li style={{ color: "#005E8C", fontFamily:"nunitoregular", fontSize:"20px" }}>{entry.text}</li>
            ) : (
              <li style={{ color: "black", fontFamily:"nunitoregular", fontSize:"20px" }}>{entry.text}</li>
            )
          )}
        </ul>
        <input
          type="text" placeholder="Ask me a question!"
          // keyCode 13 is 'Enter Key'
          onKeyDown={e =>
            e.keyCode === 13 && e.target.value != "" ? sendMessage(e.target.value) : null
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
