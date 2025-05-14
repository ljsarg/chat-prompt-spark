
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Edit, MessageSquare, BarChart3, BookText } from "lucide-react";
import Logo from "@/components/ui/Logo";

const features = [
  {
    icon: BookText,
    title: "Template Library",
    description:
      "Browse templates for various use cases, from writing blog posts to planning trips.",
  },
  {
    icon: Edit,
    title: "Intelligent Coach",
    description:
      "Get real-time suggestions as you write to create more effective prompts.",
  },
  {
    icon: MessageSquare,
    title: "Community Prompts",
    description:
      "Discover, share, and remix prompts from a growing community of users.",
  },
  {
    icon: BarChart3,
    title: "Performance Metrics",
    description:
      "Track your prompt effectiveness, token usage, and improvement over time.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Logo />
          <div className="flex items-center gap-4">
            <Link 
              to="/dashboard" 
              className="text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Dashboard
            </Link>
            <Button asChild>
              <Link to="/onboarding">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-promptpal-purple to-promptpal-purple-dark">
            Craft perfect prompts for AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            PromptPal helps you create effective prompts for ChatGPT and other AI tools so you get better results, every time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base">
              <Link to="/onboarding">
                Start Crafting
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link to="/templates">Explore Templates</Link>
            </Button>
          </div>

          {/* Preview Image */}
          <div className="mt-16 rounded-xl overflow-hidden shadow-xl border">
            <div className="bg-gradient-to-r from-promptpal-purple/10 to-promptpal-purple-light/20 p-3 border-b">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>
            <div className="bg-white p-6">
              <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Features to elevate your AI prompts
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border shadow-sm card-hover"
              >
                <feature.icon className="h-10 w-10 text-promptpal-purple mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="space-y-12">
            {[
              {
                title: "Define your goal",
                description:
                  "Tell us what you want to achieve with AI, whether it's writing, planning, or problem-solving.",
                number: "01",
              },
              {
                title: "Choose a template",
                description:
                  "Select from our library of proven prompt templates or start from scratch.",
                number: "02",
              },
              {
                title: "Customize your prompt",
                description:
                  "Follow our guided approach with real-time suggestions to craft the perfect prompt.",
                number: "03",
              },
              {
                title: "Get better results",
                description:
                  "Use your optimized prompt with your favorite AI tools and track improvements over time.",
                number: "04",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:items-center gap-6"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-promptpal-purple/10 flex items-center justify-center text-promptpal-purple font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-promptpal-purple to-promptpal-purple-dark text-white text-center px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">
            Ready to write better prompts?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Join PromptPal today and start getting better results from your AI conversations.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-promptpal-purple">
            <Link to="/onboarding">Get Started Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 text-center text-gray-600 text-sm px-4">
        <div className="container mx-auto">
          <Logo />
          <p className="mt-4">© {new Date().getFullYear()} PromptPal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
