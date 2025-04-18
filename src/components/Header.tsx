
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types";
import { LogOut, UserRound, CalendarCheck } from "lucide-react";

interface HeaderProps {
  userRole: UserRole;
}

const Header = ({ userRole }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarCheck className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-primary">Attendify</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <UserRound className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Demo User</p>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.location.reload()}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Switch Role
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
