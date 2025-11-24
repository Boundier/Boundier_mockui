import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { OSHome } from "@/screens/OSHome";
import { Home } from "@/screens/Home";
import { SocialFeed } from "@/screens/SocialFeed";
import { Dashboard } from "@/screens/Dashboard";
import { SettingsScreen } from "@/screens/Settings";
import { HistoryScreen } from "@/screens/History";
import { GestureNav } from "@/components/GestureNav";

function Router() {
  return (
    <Switch>
      <Route path="/" component={OSHome} />
      <Route path="/boundier" component={Home} />
      <Route path="/social" component={SocialFeed} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/settings" component={SettingsScreen} />
      <Route path="/history" component={HistoryScreen} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <GestureNav />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
