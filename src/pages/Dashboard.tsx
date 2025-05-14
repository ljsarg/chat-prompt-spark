
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Edit, History, Star, TrendingUp } from "lucide-react";

const recentPrompts = [
  {
    id: "1",
    title: "Blog post about AI ethics",
    category: "Writing",
    date: "2 days ago",
  },
  {
    id: "2",
    title: "Product launch email sequence",
    category: "Business",
    date: "1 week ago",
  },
];

const recommendedTemplates = [
  {
    id: "1",
    title: "SEO-Optimized Blog Post",
    category: "Content Writing",
    rating: 4.8,
  },
  {
    id: "2",
    title: "Customer Support Response",
    category: "Business",
    rating: 4.6,
  },
  {
    id: "3",
    title: "GitHub README Generator",
    category: "Programming",
    rating: 4.9,
  },
];

const Dashboard = () => {
  const name = localStorage.getItem("promptpal_name") || "there";
  
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <section>
        <h1 className="text-3xl font-bold mb-2">👋 Hello, {name}!</h1>
        <p className="text-gray-600 mb-6">Here's an overview of your prompt crafting journey.</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Prompts</CardTitle>
              <CardDescription>All-time count</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">2</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Average Rating</CardTitle>
              <CardDescription>From your feedback</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <p className="text-3xl font-bold">4.2</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4"
                    fill={i < 4 ? "#f59e0b" : "none"}
                    stroke={i < 4 ? "#f59e0b" : "#d1d5db"}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Token Usage</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <p className="text-3xl font-bold">1.2K</p>
              <TrendingUp className="text-promptpal-success h-5 w-5" />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recent Prompts</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/editor">View All</Link>
            </Button>
          </div>
          {recentPrompts.length > 0 ? (
            <div className="space-y-4">
              {recentPrompts.map((prompt) => (
                <Card key={prompt.id} className="card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">{prompt.title}</CardTitle>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/editor/${prompt.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <CardDescription>{prompt.category}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0 text-xs text-gray-500 flex items-center gap-2">
                    <History className="h-3 w-3" />
                    {prompt.date}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed bg-muted/50">
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground mb-4">
                  You haven't created any prompts yet
                </p>
                <Button asChild>
                  <Link to="/editor">Create a Prompt</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recommended Templates</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/templates">Browse All</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {recommendedTemplates.map((template) => (
              <Card key={template.id} className="card-hover">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{template.title}</CardTitle>
                  <CardDescription>{template.category}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-0 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                    <span className="text-sm font-medium">{template.rating}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="gap-1 text-xs" asChild>
                    <Link to={`/editor/${template.id}`}>
                      Use Template
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              title: "New Prompt",
              description: "Create from scratch",
              icon: Edit,
              link: "/editor",
            },
            {
              title: "Templates",
              description: "Browse library",
              icon: BookText,
              link: "/templates",
            },
            {
              title: "Community",
              description: "Find shared prompts",
              icon: MessageSquare,
              link: "/community",
            },
            {
              title: "Analytics",
              description: "Track performance",
              icon: BarChart3,
              link: "/analytics",
            },
          ].map((action, i) => (
            <Link key={i} to={action.link}>
              <Card className="card-hover h-full">
                <CardHeader>
                  <action.icon className="h-6 w-6 text-promptpal-purple mb-2" />
                  <CardTitle className="text-base">{action.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {action.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
