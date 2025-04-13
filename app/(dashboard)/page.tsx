import React from "react";

const DashboardPage = () => {
  return (
    <main className="p-6">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Total Sales</h2>
            <p className="text-2xl font-bold">$12,500</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
