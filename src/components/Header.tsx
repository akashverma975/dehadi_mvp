import { UserRound, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";

interface HeaderProps {
  userRole?: UserRole;
}

const Header = ({ userRole }: HeaderProps) => {
  const { logout, user } = useAuth();
  
  const displayName = user?.name || "User";
  const role = userRole || user?.role || "Unknown";
  
  return (
    <header className="bg-white border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">Attendify</span>
            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
              {role === "admin" ? "Admin Panel" : "Manager Panel"}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-secondary p-1 rounded-full">
                <UserRound size={18} />
              </div>
              <div>
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground capitalize">{role}</p>
              </div>
            </div>
            
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
