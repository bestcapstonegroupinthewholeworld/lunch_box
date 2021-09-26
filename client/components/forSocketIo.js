import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";

export default function SocketIo() {
  const [state, setState] = useState({ message: "", name: "" });
  const [notification, setNotification] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:8080");
    socketRef.current.on("message", ({ name, message }) => {
      setNotification([...notification, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [notification]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onNotifySummit = (e) => {
    const { message, name } = state;
    socketRef.current.emit("message", { name, message });
    e.preventDefault();
    setState({ message: "", name });
  };

  const renderNotification = () => {
    return notification.map(({ name, message }, index) => {
      return (
        <div key={index}>
          <h3 style={{ position: "absolute" }}>
            {name}: <p> {message}</p>
          </h3>
        </div>
      );
    });
  };
  return (
    <div className="placeHolder">
      <form onSubmit={onNotifySummit}>
        <div className="hostName">
          <TextField
            name="name"
            onChange={(e) => onTextChange(e)}
            value={state.name}
            label="name"
          />
        </div>

        <div>
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="ontlined-multiline-static"
            variant="outlined"
            label="message"
          />
        </div>

        <button style={{ position: "absolute" }}> Button </button>

        <div className="notification">
          <h1 className="placeHolder-title">place Holder</h1>
          {renderNotification()}
        </div>
      </form>
    </div>
  );
}
