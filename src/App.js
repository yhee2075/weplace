import './App.css';
import MainPage from './pages/MainPage/MainPage';
import Header from './components/Header';
import Footer from './components/Footer';
import {Outlet, Routes, Route} from 'react-router-dom';
import CategoryPage from './pages/CategoryPage/CategoryPage';

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
          <Route path="category" element={<CategoryPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
