import './App.css';
import MainPage from './pages/MainPage/MainPage';
import Header from './components/Header';
import Footer from './components/Footer';
import {Outlet, Routes, Route} from 'react-router-dom';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import DetailPage from './pages/DetailPage';

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
          <Route path="detail" element={<DetailPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
