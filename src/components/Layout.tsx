import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { LogIn, LogOut, Users, DollarSign, Calendar, Activity, Moon, Sun } from 'lucide-react';
import { mockData } from '@/data/mockData';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout = ({ children, activeTab, onTabChange }: LayoutProps) => {
  const { user, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'finance', label: 'Keuangan', icon: DollarSign },
    { id: 'members', label: 'Kas Anggota', icon: Users },
    { id: 'activities', label: 'Kegiatan', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">{mockData.settings.organizationName}</h1>
              <p className="text-sm text-muted-foreground">
                {isAdmin ? 'Mode Administrator' : 'Mode Pengunjung'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Selamat datang, {user?.name}
              </span>
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {theme === 'light' ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </Button>
              {isAdmin ? (
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => onTabChange('login')}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login Admin
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation - Only show for Admin */}
      {isAdmin && (
        <nav className="border-b bg-card">
          <div className="container mx-auto px-4">
            <div className="flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};