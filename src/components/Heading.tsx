import React from "react";

interface Props {
  title: string;
}

const Heading = (props: Props) => {
  return <h1 className="heading">{props?.title}</h1>;
};

export default Heading;
