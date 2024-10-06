import React, { useContext } from "react";
import { Cart, Heart } from "../../../public/assets";
import Link from "next/link";
import { DataContext } from "@/store/GlobalState";
import { useRouter } from "next/router";

type Props = {
  title: string;
  subtitle: string;
  goback?: boolean;
};

const Topbar = (props: Props) => {
  const { state } = useContext(DataContext);
  const router = useRouter();
  //

  return (
    <div className="top-sections">
      <div className="d-flex gap-2">
        <i
          style={{ cursor: "pointer" }}
          className="bi bi-arrow-left cursor-pointer"
          onClick={() => router.back()}
        ></i>
        <div>
          <h1>{props?.title}</h1>
          <p>{props?.subtitle}</p>
        </div>
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
