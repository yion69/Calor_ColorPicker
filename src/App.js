import NavigationBar from './components/NavigationBar';
import ColorDisplay from './components/Display';
import Footer from './components/Footer';
import RandomPalette from './components/RandomPalette';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App h-dvh">
      <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route index element={<ColorDisplay />}></Route>
            <Route path='RandomPalette' element={<RandomPalette />}></Route>
          </Routes>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
