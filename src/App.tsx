import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdvertiserMap from './pages/AdvertiserMap';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/advertiserMap" element={<AdvertiserMap />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
