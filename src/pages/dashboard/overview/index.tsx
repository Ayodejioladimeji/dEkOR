import React from "react";
import DashboardLayout from "../DashboardLayout";

const Overview = () => {
  return (
    <DashboardLayout>
      <section className="sections">
        <div className="top-sections">
          <h1>Overview</h1>
          <p>View your dashboard metrics</p>
        </div>

        <div className="overview">
          <p>overview section below</p>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Overview;
