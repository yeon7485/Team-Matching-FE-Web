import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  if (location.pathname === '/join' || location.pathname === '/login')
    return (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <div className='wrapper'>
            <div className='contentWrapper'>
              <Outlet />
            </div>
            <Footer />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
    );
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <div className='wrapper'>
          <Navbar />
          <div className='contentWrapper'>
            <Outlet />
          </div>
          <Footer />
        </div>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
