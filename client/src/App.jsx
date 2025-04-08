import './App.css';
import {Header} from "./components/Header"
import { Route,Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Wishlist } from './pages/Wishlist';
import { Store } from './pages/Store';
import { Cart } from './pages/Cart';
import {Profile} from './pages/Profile'
function App() {
return(<>
 <Header />
    <Routes>
      <Route path="/" element= {<Home />} />
      <Route path="/wishlist" element= {<Wishlist/>} />
      <Route path="/store" element= {<Store />} />
      <Route path="/Cart" element= {<Cart />} />
      <Route path="/profile" element = {<Profile />} />
    </Routes>
</>
   
      )
}

export default App
