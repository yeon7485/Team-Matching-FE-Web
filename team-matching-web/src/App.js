import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { RecoilRoot } from 'recoil';
import './App.css';

function App() {
  const location = useLocation();
  if (location.pathname === '/join' || location.pathname === '/login')
    return (
      <RecoilRoot>
        <div className='wrapper'>
          <div className='contentWrapper'>
            <Outlet />
          </div>
          <Footer />
        </div>
      </RecoilRoot>
    );
  return (
    <RecoilRoot>
      <div className='wrapper'>
        <Navbar />
        <div className='contentWrapper'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </RecoilRoot>
  );
}

export default App;
