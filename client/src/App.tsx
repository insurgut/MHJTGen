import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import { useState } from "react";
import ToastMessage from "./components/ui/toast-message";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
      <ToastMessage 
        visible={toast.visible}
        message={toast.message}
        type={toast.type as "success" | "accent"}
        onClose={() => setToast({...toast, visible: false})}
      />
    </QueryClientProvider>
  );
}

export default App;
