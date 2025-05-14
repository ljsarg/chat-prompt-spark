
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";

const Analytics = () => {
  const barChartData = {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    series: [
      {
        name: "Prompts Created",
        data: [3, 4, 2, 3, 5, 2, 1],
      },
    ],
  };

  const lineChartData = {
    categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
    series: [
      {
        name: "Response Rating",
        data: [3.2, 3.5, 4.0, 4.2],
      },
      {
        name: "Prompt Quality",
        data: [2.8, 3.3, 3.8, 4.1],
      },
    ],
  };

  const pieChartData = [
    { name: "Writing", value: 42 },
    { name: "Business", value: 28 },
    { name: "Programming", value: 15 },
    { name: "Travel", value: 10 },
    { name: "Education", value: 5 },
  ];

  const usageSummary = [
    { category: "Total Prompts", value: "20", change: "+5", changeType: "positive" },
    { category: "Avg. Response Rating", value: "4.2", change: "+0.3", changeType: "positive" },
    { category: "Token Savings", value: "12%", change: "+2%", changeType: "positive" },
    { category: "Completion Rate", value: "94%", change: "-2%", changeType: "negative" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <section>
        <h1 className="text-3xl font-bold mb-2">Analytics & Metrics</h1>
        <p className="text-gray-600">
          Track your prompt performance and usage patterns over time.
        </p>
      </section>

      <section>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {usageSummary.map((item, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{item.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold">{item.value}</p>
                  <p className={`text-sm ${
                    item.changeType === "positive" ? "text-green-600" : "text-red-600"
                  }`}>
                    {item.change}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Tabs defaultValue="usage">
          <TabsList>
            <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="usage">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Usage</CardTitle>
                <CardDescription>Number of prompts created per day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <BarChart 
                    data={barChartData}
                    colors={["#9b87f5"]}
                    showLegend={false}
                    showXAxis={true}
                    showYAxis={true}
                    labels={true}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Quality and rating improvements over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <LineChart 
                    data={lineChartData}
                    colors={["#9b87f5", "#6E59A5"]}
                    showLegend={true}
                    showXAxis={true}
                    showYAxis={true}
                    min={0}
                    max={5}
                    precision={1}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Prompt Categories</CardTitle>
                <CardDescription>Distribution of prompts by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PieChart 
                    data={pieChartData}
                    colors={["#9b87f5", "#7E69AB", "#6E59A5", "#8B5CF6", "#D6BCFA"]}
                    showLegend={true}
                    showLabels={true}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {[
                { action: "Created prompt", name: "Blog post outline", time: "2 hours ago", rating: 4.5 },
                { action: "Used template", name: "Customer Support Response", time: "Yesterday", rating: 4.0 },
                { action: "Improved prompt", name: "Travel Itinerary", time: "2 days ago", rating: 4.8 },
                { action: "Shared prompt", name: "Study Guide Generator", time: "3 days ago", rating: 4.2 },
              ].map((activity, i) => (
                <div key={i} className="flex justify-between items-center p-4">
                  <div>
                    <p className="font-medium">{activity.action}: <span className="text-promptpal-purple">{activity.name}</span></p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                    <span className="font-medium">{activity.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Analytics;
