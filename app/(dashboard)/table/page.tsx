import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const TableServicePage = () => {
  return (
    <div className="space-y-6 px-4 py-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Table 1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="h-24 w-24 rounded-full bg-gray-200">Table</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TableServicePage;
