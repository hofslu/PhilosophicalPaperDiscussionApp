// src/App.js

import React, { useState } from "react";
import Page from "./components/Page";
import PageOverview from "./components/PageOverview";
import jsonData from "./data/neagl.json";
import "./App.css"; // Make sure to import your CSS file

function App() {
  const [highlights, setHighlights] = useState([]);

  const highlightText = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return false;
    const range = selection.getRangeAt(0);
    const selectedText = selection.toString();

    // Start with the common ancestor container
    let parentElement = range.commonAncestorContainer;

    // If it's a text node, ascend to the parent element
    if (parentElement.nodeType === Node.TEXT_NODE) {
      parentElement = parentElement.parentNode;
    }

    // Ascend the DOM tree until an element with an 'id' is found
    while (
      parentElement &&
      (!parentElement.id || !parentElement.id.includes("page-"))
    ) {
      parentElement = parentElement.parentNode;
    }

    if (parentElement && parentElement.id.includes("page-")) {
      // Assume the parentPage.id is in the format "page-xxx"
      const pageId = parseInt(parentElement.id.replace("page-", ""), 10);

      // Create a highlight object including page number and the selected text
      const highlight = {
        text: selectedText,
        page: pageId,
      };

      // Add the new highlight to the state, no need to sort here
      setHighlights([...highlights, highlight]);

      // Style the selection with a highlight class
      const span = document.createElement("span");
      span.className = "highlight";
      range.surroundContents(span);
      selection.removeAllRanges();
    }
  };

  const groupHighlightsByPage = (highlights) => {
    return highlights.reduce((acc, highlight) => {
      // Group initialization if it doesn't exist
      if (!acc[highlight.page]) {
        acc[highlight.page] = [];
      }
      // Push the current highlight into the group
      acc[highlight.page].push(highlight);
      return acc;
    }, {});
  };
  const sortedHighlights = highlights.sort((a, b) => a.page - b.page);

  // Use this function in your App component before the return statement
  const groupedHighlights = groupHighlightsByPage(sortedHighlights);
  // Function to sort highlights by page number

  return (
    <div className="app-container">
      <PageOverview pages={Object.values(jsonData)} />
      <div className="main-text">
        {Object.values(jsonData).map((pageData, index) => (
          <Page key={index} pageData={pageData} />
        ))}
      </div>
      <div className="highlighted-text">
        {Object.entries(groupedHighlights).map(([page, pageHighlights]) => (
          <div key={page}>
            <div className="highlight-page-number">Page {page}</div>
            {pageHighlights.map((highlight, index) => (
              <div key={index} className="highlight-snippet">
                {highlight.text}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={highlightText} className="highlight-button">
        Highlight Text
      </button>
    </div>
  );
}

export default App;
