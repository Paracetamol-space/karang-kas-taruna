import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { FinancePage } from '@/components/FinancePage';
import { MemberCashPage } from '@/components/MemberCashPage';
import { ActivitiesPage } from '@/components/ActivitiesPage';
import { LoginForm } from '@/components/LoginForm';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
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
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default Index;
