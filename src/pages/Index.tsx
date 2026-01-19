import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-custom";
import { Layers, AlertTriangle, FileText, Shield } from "lucide-react";
import AppDemo from "@/components/demo/AppDemo";
import ChallengesSection from "@/components/proposal/ChallengesSection";
import ProposalSection from "@/components/proposal/ProposalSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-trust">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Secure Work Identity Platform</h1>
              <p className="text-xs text-muted-foreground">MVP Proposal by Humam Al Rubaye</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container max-w-5xl mx-auto px-4 py-8">
        <Tabs defaultValue="app" className="w-full">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="app" className="gap-2">
              <Layers className="h-4 w-4" />
              <span className="hidden sm:inline">App Demo</span>
              <span className="sm:hidden">App</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Challenges</span>
              <span className="sm:hidden">Issues</span>
            </TabsTrigger>
            <TabsTrigger value="proposal" className="gap-2">
              <FileText className="h-4 w-4" />
              <span>Proposal</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="app">
            <AppDemo />
          </TabsContent>

          <TabsContent value="challenges">
            <ChallengesSection />
          </TabsContent>

          <TabsContent value="proposal">
            <ProposalSection />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/30 mt-12">
        <div className="container max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>Built with React, TypeScript, Tailwind & shadcn/ui</p>
            <p>Ready to start within 48 hours</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
