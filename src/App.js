import './App.css';
import MainPage from './pages/MainPage/MainPage';
import Header from './components/Header';
import Footer from './components/Footer';
import {Outlet, Routes, Route} from 'react-router-dom';
import Cartegory from './pages/Cartegory/Cartegory';

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="cartegory" element={<Cartegory />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
