// src/components/PageOverview.js

import React from "react";

const PageOverview = ({ pages }) => {
  return (
    <div className="page-overview">
      {pages.map((page, index) => (
        <a key={index} href={`#page-${page.page}`}>
          Page {page.page}
        </a>
      ))}
    </div>
  );
};

export default PageOverview;
