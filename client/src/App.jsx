import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MobileShell from './components/layout/MobileShell';
import BottomNav from './components/layout/BottomNav';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import PlannerPage from './pages/PlannerPage';
import GroceryPage from './pages/GroceryPage';
import PantryPage from './pages/PantryPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  return (
    <Router>
      <MobileShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/grocery" element={<GroceryPage />} />
          <Route path="/pantry" element={<PantryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <BottomNav />
      </MobileShell>
    </Router>
  );
}
