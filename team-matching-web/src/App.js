import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import TeamHeader from './components/TeamHeader/TeamHeader';

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
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    );

  if (location.pathname.indexOf('/myteam/') === 0)
    return (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <div className='wrapper'>
            <Navbar />
            <div className='teamWrapper'>
              <TeamHeader />
              <div className='teamContentWrapper'>
                <Sidebar />
                <Outlet />
              </div>
            </div>
            <Footer />
          </div>
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={true} />
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
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
