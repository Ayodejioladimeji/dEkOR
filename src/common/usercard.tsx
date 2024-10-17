import Image from "next/image";
import Link from "next/link";
import React, { useLayoutEffect, useState } from "react";
import { Profile } from "../../public/assets";

const Usercard = () => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token") || "";
    setUser(user);
    setToken(token);
    setLoading(false);
  }, []);

  if (loading) return undefined;
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
          <Image src={user?.avatar} alt="" width={100} height={100} />
        </Link>
      )}
    </div>
  );
};

export default Usercard;
