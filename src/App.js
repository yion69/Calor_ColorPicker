import NavigationBar from './components/NavigationBar';
import ColorDisplay from './components/Display';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="App h-dvh">
      <NavigationBar />
      <ColorDisplay />
      <Footer className='mt-auto' />
    </div>
  );
}

export default App;
