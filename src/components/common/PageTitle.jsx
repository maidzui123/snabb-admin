import React from "react";
import { Helmet } from "react-helmet";

const PageTitle = ({ title, description }) => {
  return (
    <Helmet>
      <title>
        {" "}
        {title
          ? ` ${title} | Snabb : Admin Dashboard`
          : "Snabb : Admin Dashboard"}
      </title>
      <meta
        name="description"
        content={
          description
            ? ` ${description} `
            : "Snabb : Admin Dashboard"
        }
      />
    </Helmet>
  );
};

export default PageTitle;
