// src/components/Text.js

import React, { useState } from "react";

const Text = ({ paragraph }) => {
  const [read, setRead] = useState(false);

  const toggleRead = () => setRead(!read);

  const highlightText = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return false;
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.className = "highlight";
    range.surroundContents(span);
    selection.removeAllRanges();
  };

  return (
    <p style={{ color: read ? "gray" : "black" }}>
      {paragraph}
      <button onClick={toggleRead}>{read ? "Unread" : "Mark as Read"}</button>
    </p>
  );
};

export default Text;
