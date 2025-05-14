
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { AlertCircle, Check, Copy, MessageSquare, Send, ThumbsDown, ThumbsUp } from "lucide-react";
import { templatesData } from "@/data/templateData";

interface CoachSuggestion {
  type: "tone" | "specificity" | "context" | "clarity";
  message: string;
}

const Editor = () => {
  const { templateId } = useParams();
  const [promptText, setPromptText] = useState("");
  const [aiResponse, setAIResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<CoachSuggestion[]>([]);
  const [activeTab, setActiveTab] = useState("edit");
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  
  useEffect(() => {
    // If we have a templateId, load the template
    if (templateId) {
      const template = templatesData.find(t => t.id === templateId);
      if (template) {
        setSelectedTemplate(template);
        setPromptText(template.samplePrompt || "");
      }
    }
  }, [templateId]);

  useEffect(() => {
    // Simple coach logic - in a real app this would be more sophisticated
    const newSuggestions: CoachSuggestion[] = [];
    
    if (promptText.length > 10) {
      const words = promptText.split(" ").length;
      
      if (words < 15) {
        newSuggestions.push({
          type: "specificity",
          message: "Your prompt is quite short. Consider adding more details for better results."
        });
      }
      
      if (!promptText.toLowerCase().includes("please") && !promptText.toLowerCase().includes("thank you")) {
        newSuggestions.push({
          type: "tone",
          message: "Adding polite phrases can improve AI response quality."
        });
      }
      
      if (!promptText.includes("?") && !promptText.includes("I want") && !promptText.includes("Create")) {
        newSuggestions.push({
          type: "clarity",
          message: "Be clear about what you're asking the AI to do."
        });
      }
    }
    
    setSuggestions(newSuggestions);
  }, [promptText]);

  const generateResponse = () => {
    setIsGenerating(true);
    setActiveTab("result");
    
    // Simulate API call
    setTimeout(() => {
      setAIResponse(`Here's a simulated response to your prompt. In a real implementation, this would be the actual response from an AI service like OpenAI's ChatGPT.

Your prompt was: "${promptText}"

This is where the AI would analyze your request and provide the information or content you asked for. The quality of this response would depend on how well your prompt was crafted, which is exactly what PromptPal helps you optimize!`);
      
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Would add a toast notification in a real implementation
  };

  const promptHasContent = promptText.trim().length > 5;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <section>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">
              {selectedTemplate ? selectedTemplate.title : "Prompt Editor"}
            </h1>
            <p className="text-gray-600">
              {selectedTemplate 
                ? selectedTemplate.description 
                : "Craft and refine your AI prompt to get the best results"}
            </p>
          </div>
          <div className="flex gap-3">
            {promptHasContent && (
              <Button 
                variant="outline" 
                onClick={() => copyToClipboard(promptText)}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy Prompt
              </Button>
            )}
            <Button 
              onClick={generateResponse} 
              disabled={!promptHasContent || isGenerating}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate Response"}
            </Button>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="edit">Edit Prompt</TabsTrigger>
              <TabsTrigger value="result" disabled={!aiResponse && !isGenerating}>
                AI Response
              </TabsTrigger>
            </TabsList>
            <TabsContent value="edit">
              <Card>
                <div className="p-4">
                  <textarea
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder="Write your prompt here. Be specific about what you want the AI to do..."
                    className="w-full h-64 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-promptpal-purple resize-none"
                  />
                </div>
                {selectedTemplate && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-500 mb-2">Template Tips:</p>
                    <ul className="list-disc text-sm text-gray-600 pl-5 space-y-1">
                      {selectedTemplate.tips && selectedTemplate.tips.map((tip: string, i: number) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            </TabsContent>
            <TabsContent value="result">
              <Card>
                <div className="p-4">
                  {isGenerating ? (
                    <div className="flex flex-col items-center justify-center h-64">
                      <div className="animate-pulse flex gap-1">
                        <div className="h-3 w-3 bg-promptpal-purple rounded-full"></div>
                        <div className="h-3 w-3 bg-promptpal-purple rounded-full animation-delay-200"></div>
                        <div className="h-3 w-3 bg-promptpal-purple rounded-full animation-delay-400"></div>
                      </div>
                      <p className="text-gray-500 mt-4">Generating response...</p>
                    </div>
                  ) : (
                    <div>
                      <div className="border-b pb-3 mb-3">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium">AI Response</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-2"
                            onClick={() => copyToClipboard(aiResponse)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="whitespace-pre-line h-64 overflow-y-auto">
                        {aiResponse}
                      </div>
                      <div className="border-t mt-4 pt-4">
                        <p className="text-sm text-gray-600 mb-2">Was this response helpful?</p>
                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" className="gap-2">
                            <ThumbsUp className="h-4 w-4" />
                            Yes
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2">
                            <ThumbsDown className="h-4 w-4" />
                            No
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <div className="p-4">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-promptpal-purple" />
                Prompt Coach
              </h3>
              
              {suggestions.length > 0 ? (
                <div className="space-y-4">
                  {suggestions.map((suggestion, i) => (
                    <div key={i} className="text-sm border rounded-md p-3">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <p>{suggestion.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : promptText.length > 10 ? (
                <div className="text-sm border rounded-md p-3 flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p>Your prompt looks good! Consider reviewing it once more before generating the response.</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Start writing your prompt to get real-time feedback and suggestions.
                </p>
              )}
            </div>
          </Card>
          
          <Card>
            <div className="p-4">
              <h3 className="font-medium mb-4">Elements of a Good Prompt</h3>
              <ul className="space-y-3 text-sm">
                {[
                  { text: "Be specific about what you want", done: promptText.length > 30 },
                  { text: "Provide context and background", done: promptText.length > 50 },
                  { text: "Specify format if needed", done: promptText.includes("format") },
                  { text: "Include examples if helpful", done: promptText.includes("example") },
                  { text: "Set clear expectations", done: promptText.length > 70 },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? "bg-promptpal-purple" : "border border-gray-300"}`}>
                      {item.done && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className={item.done ? "text-gray-900" : "text-gray-500"}>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Editor;
