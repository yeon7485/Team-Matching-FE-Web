import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

function App() {
  const location = useLocation();
  if (location.pathname === '/join')
    return (
      <>
        <Outlet />
        <Footer />
      </>
    );
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
