import React, { useContext } from "react";
import { Cart, Heart } from "../../../public/assets";
import Link from "next/link";
import { DataContext } from "@/store/GlobalState";

type Props = {
  title: string;
  subtitle: string;
};

const Topbar = (props: Props) => {
  const { state } = useContext(DataContext);
  //

  return (
    <div className="top-sections">
      <div>
        <h1>{props?.title}</h1>
        <p>{props?.subtitle}</p>
      </div>

      <div>
        <Link href="/favourites" className="position-relative ">
          <Heart />
          <div className="badge">{state?.favourite?.length}</div>
        </Link>

        <Link href="/cart" className="position-relative mx-4">
          <Cart />
          <div className="badge">{state?.cart?.length}</div>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
