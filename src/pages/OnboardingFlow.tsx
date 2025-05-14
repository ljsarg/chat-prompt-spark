
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Logo from "@/components/ui/Logo";

const goals = [
  {
    id: "writing",
    label: "Content Writing",
    description: "Blog posts, articles, and creative content",
  },
  {
    id: "business",
    label: "Business & Strategy",
    description: "Business plans, marketing strategies, and analysis",
  },
  {
    id: "programming",
    label: "Programming & Development",
    description: "Code documentation, debugging, and development",
  },
  {
    id: "travel",
    label: "Travel Planning",
    description: "Trip itineraries, destination recommendations",
  },
  {
    id: "education",
    label: "Learning & Education",
    description: "Study notes, research questions, and lesson plans",
  },
  {
    id: "other",
    label: "Other",
    description: "Custom use cases and specialized prompts",
  },
];

const OnboardingFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [name, setName] = useState("");

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals((prevGoals) =>
      prevGoals.includes(goalId)
        ? prevGoals.filter((id) => id !== goalId)
        : [...prevGoals, goalId]
    );
  };

  const handleContinue = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Save user preferences and redirect
      localStorage.setItem("promptpal_goals", JSON.stringify(selectedGoals));
      localStorage.setItem("promptpal_name", name);
      localStorage.setItem("promptpal_onboarded", "true");
      navigate("/dashboard");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold mb-6">Welcome to PromptPal</h1>
            <p className="text-gray-600 mb-8">
              Let's get you started with creating better prompts for AI. First, tell us what you're looking to accomplish.
            </p>
            <h2 className="text-xl font-medium mb-6">Select your goals:</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedGoals.includes(goal.id)
                      ? "border-promptpal-purple bg-promptpal-purple/5"
                      : "hover:border-gray-400"
                  }`}
                  onClick={() => handleGoalToggle(goal.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{goal.label}</h3>
                      <p className="text-sm text-gray-500">{goal.description}</p>
                    </div>
                    {selectedGoals.includes(goal.id) && (
                      <div className="h-6 w-6 bg-promptpal-purple rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold mb-6">Personalize your experience</h1>
            <p className="text-gray-600 mb-8">
              We'll use this information to personalize your experience. Don't worry, you can always change this later.
            </p>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-promptpal-purple"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-fade-in text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-promptpal-purple/10 text-promptpal-purple mb-6">
              <Check className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold mb-6">You're all set!</h1>
            <p className="text-gray-600 mb-8">
              We've customized PromptPal based on your preferences. Ready to craft better prompts and get more from AI?
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const canContinue = () => {
    if (step === 0) return selectedGoals.length > 0;
    if (step === 1) return name.trim().length > 0;
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto flex items-center h-16 px-4">
          <Logo />
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {renderStep()}
          <div className="mt-8 flex justify-between">
            {step > 0 ? (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}
            <Button
              onClick={handleContinue}
              disabled={!canContinue()}
              className="ml-auto"
            >
              {step === 2 ? "Go to Dashboard" : "Continue"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
