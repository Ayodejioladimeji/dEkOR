import Navbar from "@/dashboard/components/navbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    setLoading(false);
  }, [router]);

  //
  if (loading) return;

  return (
    <>
      <Navbar />
      {props?.children}
    </>
  );
};

export default DashboardLayout;
