import React from "react";
import DashboardLayout from "../DashboardLayout";

const Overview = () => {
  return (
    <DashboardLayout>
      <section className="sections">
        <div className="top-sections">
          <h1>Ratings & Reviees</h1>
          <p>Rate and review your orders</p>
        </div>

        <div className="overview">
          <p>Ratings section below</p>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Overview;
