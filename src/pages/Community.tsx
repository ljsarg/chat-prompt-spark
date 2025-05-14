
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Search, Star, ThumbsUp, MessageSquare, Share, ArrowRight } from "lucide-react";

const communityData = [
  {
    id: "1",
    title: "Ultimate Content Marketing Plan",
    description: "A comprehensive prompt for generating a full content marketing strategy with editorial calendar.",
    author: "marketingpro",
    category: "business",
    likes: 243,
    comments: 45,
    date: "2 days ago",
    tags: ["marketing", "content", "planning"],
  },
  {
    id: "2",
    title: "Bug Fixing Detective",
    description: "Ask questions to diagnose and fix complex programming bugs with this guided prompt.",
    author: "debugmaster",
    category: "programming",
    likes: 178,
    comments: 32,
    date: "1 week ago",
    tags: ["debugging", "code", "problem-solving"],
  },
  {
    id: "3",
    title: "Perfect Travel Day Itinerary",
    description: "Generate a detailed day-by-day travel itinerary with local insights and hidden gems.",
    author: "wanderlust",
    category: "travel",
    likes: 312,
    comments: 67,
    date: "3 days ago",
    tags: ["travel", "itinerary", "planning"],
  },
  {
    id: "4",
    title: "Learning Concept Breakdown",
    description: "Breaks down complex topics into simple, easy to understand explanations with examples.",
    author: "educator123",
    category: "education",
    likes: 156,
    comments: 24,
    date: "5 days ago",
    tags: ["education", "learning", "concepts"],
  },
  {
    id: "5",
    title: "Viral Social Media Hook Generator",
    description: "Create attention-grabbing hooks for social media posts that drive engagement.",
    author: "viralcreator",
    category: "writing",
    likes: 289,
    comments: 51,
    date: "1 day ago",
    tags: ["social-media", "marketing", "hooks"],
  },
];

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("popular");

  const filteredPrompts = communityData.filter((prompt) => 
    prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.tags.some(tag => tag.includes(searchQuery.toLowerCase()))
  );

  const sortedPrompts = [...filteredPrompts].sort((a, b) => {
    if (activeFilter === "popular") return b.likes - a.likes;
    if (activeFilter === "recent") {
      // Simple sort by "days ago" value
      const getNumDays = (str: string) => parseInt(str.split(" ")[0]);
      return getNumDays(a.date) - getNumDays(b.date);
    }
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <section>
        <h1 className="text-3xl font-bold mb-2">Community Prompts</h1>
        <p className="text-gray-600">
          Discover, remix, and share prompts from the PromptPal community.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search community prompts..."
              className="w-full pl-9 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-promptpal-purple"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={activeFilter === "popular" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("popular")}
            >
              Popular
            </Button>
            <Button
              variant={activeFilter === "recent" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("recent")}
            >
              Recent
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {sortedPrompts.length > 0 ? (
            sortedPrompts.map((prompt) => (
              <Card key={prompt.id} className="card-hover">
                <CardHeader>
                  <CardTitle>{prompt.title}</CardTitle>
                  <CardDescription>{prompt.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {prompt.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{prompt.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{prompt.comments}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      by <span className="font-medium">@{prompt.author}</span>
                    </div>
                    <div className="text-sm text-gray-500">{prompt.date}</div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button size="sm" className="flex-1 sm:flex-none" asChild>
                      <Link to={`/editor/${prompt.id}`}>
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Use
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">No prompts match your search criteria</p>
              <Button onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Community;
