import AdminNavbar from "@/dashboard/components/adminNav";
import Navbar from "@/dashboard/components/navbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState(null);

  //
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    setUser(user);

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
      {user?.role === "user" ? <Navbar /> : <AdminNavbar />}
      {props?.children}
    </>
  );
};

export default DashboardLayout;
