import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Header } from "./components/Header";
import { Home } from './pages/Home';
import { Wishlist } from './pages/Wishlist';
import { Store } from './pages/Store';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { All } from "./components/All";
import { Men } from "./components/Men";
import { Women } from "./components/Women";
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';

// ✅ Use the new Provider components
import { CurrentUserProvider } from './context/authContext';
import { CartProvider } from './context/cartContext';

function App() {
  return (
    <CartProvider>
      <CurrentUserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/store" element={<Store />}>
            <Route index element={<All />} />
            <Route path="all" element={<All />} />
            <Route path="Men" element={<Men />} />
            <Route path="women" element={<Women />} />
          </Route>
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </CurrentUserProvider>
    </CartProvider>
  );
}

export default App;
