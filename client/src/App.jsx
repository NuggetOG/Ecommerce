import './App.css';
import {Header} from "./components/Header"
import { Route,Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Wishlist } from './pages/Wishlist';
import { Store } from './pages/Store';
import { Cart } from './pages/Cart';
import {Profile} from './pages/Profile'
import {All} from "./components/All";
import {Men} from "./components/Men";
import {Women} from "./components/Women";
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { currentUserContext } from './context/authContext';
import { cartContext } from './context/cartContext';
import { useState } from 'react';
function App() {
  const [cart,setCart] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
return(<>
<cartContext.Provider value ={{
  cart, setCart
}}>
<currentUserContext.Provider value= {{
  currentUser, setCurrentUser
}}>
 <Header />
    <Routes>
      <Route path="/" element= {<Home />} />
      <Route path="/wishlist" element= {<Wishlist/>} />
      <Route path="/store" element= {<Store />}>
      <Route index element={<All />}/>
      <Route path="all" element={<All></All>} />
      <Route path="Men" element={<Men></Men>} />
      <Route path="women" element={<Women></Women>} />
      </Route>
      <Route path="/cart" element= {<Cart />} />
      <Route path="/signup" element= {<Signup />} />
      <Route path="/login" element= {<Login />} />
      <Route path="/profile" element = {<Profile />} />
    </Routes>
</currentUserContext.Provider>
</cartContext.Provider>

</>)
}

export default App
