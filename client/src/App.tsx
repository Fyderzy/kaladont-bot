import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Dictionary from "@/pages/dictionary";

function Navbar() {
  return (
    <nav className="bg-secondary py-4">
      <div className="container mx-auto px-4 flex gap-6">
        <Link href="/">
          <span className="font-medium hover:text-primary transition-colors cursor-pointer">Početna</span>
        </Link>
        <Link href="/dictionary">
          <span className="font-medium hover:text-primary transition-colors cursor-pointer">Rečnik</span>
        </Link>
      </div>
    </nav>
  );
}

function Router() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dictionary" component={Dictionary} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
