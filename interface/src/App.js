import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blocks from './pages/Blocks';
import Home from './pages/Home';
import Search from './pages/Search';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="flex flex-col bg-black w-screen h-screen fixed">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/blocks' exact element={<Blocks/>}/>
          <Route path='/blocks/:page' exact element={<Blocks/>}/>
          <Route path='/search' exact element={<Search/>}/>
          <Route path='/search/:id' exact element={<Search/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
