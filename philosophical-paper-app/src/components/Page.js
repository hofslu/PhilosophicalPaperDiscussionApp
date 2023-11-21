// src/components/Page.js

import React from "react";
import Text from "./Text"; // Assume Text is the component for each paragraph.

const Page = ({ pageData }) => {
  // Use the page number or a unique identifier as the id.
  return (
    <div id={`page-${pageData.page}`} className="page">
      <h2>{pageData.header}</h2>
      {pageData.text.map((paragraph, index) => (
        <Text key={index} paragraph={paragraph} />
      ))}
      <h5>{pageData.page}</h5>
      {/* Continue with your existing code */}
    </div>
  );
};

export default Page;
