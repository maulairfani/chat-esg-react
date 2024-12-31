import { Switch, Route } from "wouter";
import { Loader2 } from "lucide-react";
import Chat from "@/pages/Chat";
import AuthPage from "@/pages/AuthPage";
import { useUser } from "@/hooks/use-user";

function App() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <Switch>
      <Route path="/" component={Chat} />
    </Switch>
  );
}

export default App;