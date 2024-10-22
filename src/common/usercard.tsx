import Image from "next/image";
import Link from "next/link";
import React, { useContext, useLayoutEffect, useState } from "react";
import { Profile } from "../../public/assets";
import { DataContext } from "@/store/GlobalState";

const Usercard = () => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState("");
  const { state } = useContext(DataContext);

  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token") || "";
    const avatar = localStorage.getItem("avatar") || "";
    setUser(user);
    setToken(token);
    setAvatar(avatar);
    setLoading(false);
  }, [state?.callback]);

  if (loading) {
    return (
      <div
        style={{
          borderRadius: "50%",
          height: "40px",
          width: "40px",
          display: "block",
        }}
      ></div>
    );
  }
  //

  return (
    <div className="usercard">
      {!token ? (
        <Link href={"/auth/login"}>
          <Profile />
        </Link>
      ) : (
        <Link
          href={
            user?.role === "admin"
              ? "/dashboard/admin/overview"
              : "/dashboard/overview"
          }
        >
          <Image
            src={avatar || user?.avatar}
            alt=""
            width={100}
            height={100}
            style={{ borderRadius: "50%", border: "1px solid #27493e" }}
            unoptimized
          />
        </Link>
      )}
    </div>
  );
};

export default Usercard;
