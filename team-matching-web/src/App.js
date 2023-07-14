import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  const location = useLocation();
  if (location.pathname === '/join' || location.pathname === '/login')
    return (
      <div className='wrapper'>
        <div className='contentWrapper'>
          <Outlet />
        </div>
        <Footer />
      </div>
    );
  return (
    <div className='wrapper'>
      <Navbar />
      <div className='contentWrapper'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
