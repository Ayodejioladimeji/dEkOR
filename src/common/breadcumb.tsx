import Link from "next/link";
import React from "react";

interface Props {
  title: string;
}

const Breadcumb = (props: Props) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/">Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {props?.title}
        </li>
      </ol>
    </nav>
  );
};

export default Breadcumb;
