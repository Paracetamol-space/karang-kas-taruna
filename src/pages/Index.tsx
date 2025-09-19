import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { FinancePage } from '@/components/FinancePage';
import { MemberCashPage } from '@/components/MemberCashPage';
import { ActivitiesPage } from '@/components/ActivitiesPage';
import { LoginForm } from '@/components/LoginForm';
import { GuestDashboard } from '@/components/GuestDashboard';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isAdmin } = useAuth();

  const renderContent = () => {
    // For guests, always show the comprehensive dashboard
    if (!isAdmin && activeTab !== 'login') {
      return <GuestDashboard />;
    }

    // For admin, show the requested tab
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'finance':
        return <FinancePage />;
      case 'members':
        return <MemberCashPage />;
      case 'activities':
        return <ActivitiesPage />;
      case 'login':
        return <LoginForm onLoginSuccess={() => setActiveTab('dashboard')} />;
      default:
        return isAdmin ? <Dashboard /> : <GuestDashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default Index;
