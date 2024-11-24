import { Route, Routes } from 'react-router-dom';
import HomePage from './components/js/HomePage';
import { RecipeDetails } from './components/js/RecipeDetails';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/:recipeid' element={<RecipeDetails/>} />
    </Routes>


  );
}

export default App;
