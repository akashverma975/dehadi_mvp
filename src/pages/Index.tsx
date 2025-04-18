import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRound } from "lucide-react";
import { UserRole } from "@/types";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import ManagerDashboard from "@/components/ManagerDashboard";
import Login from "@/components/Login";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const [role, setRole] = useState<UserRole | undefined>();
  const [isRoleSelected, setIsRoleSelected] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const handleRoleSubmit = () => {
    if (role) {
      setIsRoleSelected(true);
    }
  };

  if (!isRoleSelected) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-2 bg-primary text-primary-foreground rounded-full">
                <UserRound size={32} />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Welcome to Attendify</CardTitle>
            <CardDescription className="text-center">
              Please select your role to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                className="w-full" 
                onClick={handleRoleSubmit}
                disabled={!role}
              >
                Enter Application
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show login component if not authenticated
  if (!isAuthenticated) {
    return <Login role={role} />;
  }

  // Show appropriate dashboard based on role
  return (
    <div className="min-h-screen flex flex-col bg-secondary/50">
      <Header userRole={user?.role || role} />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        {(user?.role === "admin" || role === "admin") ? (
          <Dashboard />
        ) : (
          <ManagerDashboard />
        )}
      </main>
      <footer className="bg-white border-t border-border py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Attendify - Employee Attendance Tracking System
        </div>
      </footer>
    </div>
  );
};

export default Index;
