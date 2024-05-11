import NavigationBar from './components/NavigationBar';
import ColorDisplay from './components/Display';
import RandomScheme from './components/RandomScheme.tsx';
import Footer from './components/Footer';
import RandomPalette from './components/RandomColor.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <div className="App h-dvh">
      <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route index element={<ColorDisplay />}></Route>
            <Route path='RandomColor' element={<RandomPalette />}></Route>
            <Route path='RandomScheme' element={<RandomScheme />}></Route>
          </Routes>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
