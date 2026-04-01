import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { CustomerLayout, MasterLayout, PublicLayout } from './layouts/AppLayouts';
import {
  ChooseMasterPage,
  ContactDetailsPage,
  CreateJobPage,
  LandingPage,
  LoginPage,
  MasterDashboardPage,
  UnlockContactPage,
  UserDashboardPage,
  WalletPage,
} from './pages/TezUstaPages';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route path="/app" element={<CustomerLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<UserDashboardPage />} />
          <Route path="jobs/new" element={<CreateJobPage />} />
          <Route path="masters" element={<ChooseMasterPage />} />
          <Route path="masters/:masterId/unlock" element={<UnlockContactPage />} />
          <Route path="masters/:masterId/contact" element={<ContactDetailsPage />} />
          <Route path="wallet" element={<WalletPage />} />
        </Route>

        <Route path="/master" element={<MasterLayout />}>
          <Route index element={<Navigate to="/master/dashboard" replace />} />
          <Route path="dashboard" element={<MasterDashboardPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
