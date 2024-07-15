import React from "react";
import { useRouter } from "next/router";
import { BackArrow } from "../../public/assets";

const Goback = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className="d-flex align-items-center gap-2"
    >
      <BackArrow />
      Go back
    </div>
  );
};

export default Goback;
