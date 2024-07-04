import React from "react";
import { Oval } from "react-loader-spinner";

type LoadingProps = {
  height: string;
  width: string;
  primaryColor: string;
  secondaryColor: string;
};

const Loading = ({
  height,
  width,
  primaryColor,
  secondaryColor,
}: LoadingProps) => {
  return (
    <Oval
      height={height}
      width={width}
      color={primaryColor ? primaryColor : "#fff"}
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor={secondaryColor ? secondaryColor : "#fff"}
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default Loading;
