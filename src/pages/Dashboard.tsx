import { BookText, MessageSquare, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("promptpal_name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {name || "PromptPal User"}!
      </h1>
      <p className="text-gray-600 mb-8">
        Here's an overview of your PromptPal account.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center mb-2">
            <BookText className="mr-2 h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Templates Used</h2>
          </div>
          <p className="text-2xl font-bold text-promptpal-purple">23</p>
          <p className="text-sm text-gray-500">
            Templates used this month
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center mb-2">
            <MessageSquare className="mr-2 h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Community Prompts</h2>
          </div>
          <p className="text-2xl font-bold text-promptpal-purple">15</p>
          <p className="text-sm text-gray-500">
            Prompts shared with the community
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center mb-2">
            <BarChart3 className="mr-2 h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Generated Prompts</h2>
          </div>
          <p className="text-2xl font-bold text-promptpal-purple">125</p>
          <p className="text-sm text-gray-500">Total prompts generated</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-md">
          <ul className="divide-y divide-gray-200">
            <li className="p-4">
              <p className="font-medium">Generated a prompt for blog post</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </li>
            <li className="p-4">
              <p className="font-medium">Used "Social Media Ad" template</p>
              <p className="text-sm text-gray-500">Yesterday</p>
            </li>
            <li className="p-4">
              <p className="font-medium">Shared a prompt in the community</p>
              <p className="text-sm text-gray-500">3 days ago</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
