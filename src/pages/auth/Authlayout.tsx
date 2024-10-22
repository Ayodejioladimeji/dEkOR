import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/product");
      return;
    }

    setLoading(false);
  }, [router]);

  //
  if (loading) return;

  return <>{props?.children}</>;
};

export default AuthLayout;
