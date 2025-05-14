
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Search, Star, ArrowRight } from "lucide-react";

const categoriesData = [
  { id: "all", name: "All Templates" },
  { id: "writing", name: "Content Writing" },
  { id: "business", name: "Business" },
  { id: "programming", name: "Programming" },
  { id: "travel", name: "Travel" },
  { id: "education", name: "Education" },
];

const templatesData = [
  {
    id: "1",
    title: "SEO-Optimized Blog Post",
    description: "Create blog posts optimized for search engines with proper structure.",
    category: "writing",
    rating: 4.8,
    popularity: "high",
  },
  {
    id: "2",
    title: "Customer Support Response",
    description: "Craft professional and helpful responses to customer inquiries.",
    category: "business",
    rating: 4.6,
    popularity: "medium",
  },
  {
    id: "3",
    title: "GitHub README Generator",
    description: "Create comprehensive README files for your code repositories.",
    category: "programming",
    rating: 4.9,
    popularity: "high",
  },
  {
    id: "4",
    title: "Travel Itinerary Planner",
    description: "Plan detailed day-by-day itineraries for your trips.",
    category: "travel",
    rating: 4.7,
    popularity: "medium",
  },
  {
    id: "5",
    title: "Study Notes Generator",
    description: "Create structured study notes on any topic.",
    category: "education",
    rating: 4.5,
    popularity: "low",
  },
  {
    id: "6",
    title: "Social Media Post",
    description: "Create engaging social media posts for various platforms.",
    category: "writing",
    rating: 4.4,
    popularity: "high",
  },
  {
    id: "7",
    title: "Business Plan Outline",
    description: "Generate a comprehensive business plan structure.",
    category: "business",
    rating: 4.7,
    popularity: "medium",
  },
  {
    id: "8",
    title: "Code Refactoring Advice",
    description: "Get suggestions on how to improve and refactor your code.",
    category: "programming",
    rating: 4.8,
    popularity: "medium",
  },
];

const Templates = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templatesData.filter((template) => {
    const matchesCategory = activeCategory === "all" || template.category === activeCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <section>
        <h1 className="text-3xl font-bold mb-2">Template Library</h1>
        <p className="text-gray-600">
          Browse our collection of prompt templates to get started quickly.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full pl-9 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-promptpal-purple"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categoriesData.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <Card key={template.id} className="card-hover">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                      <span className="text-sm font-medium">{template.rating}</span>
                    </div>
                  </div>
                  <CardDescription>
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <span className="text-xs text-gray-500 capitalize">
                    {categoriesData.find(c => c.id === template.category)?.name}
                  </span>
                  <Button size="sm" asChild>
                    <Link to={`/editor/${template.id}`}>Use Template</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 mb-4">No templates match your criteria</p>
              <Button onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Templates;
