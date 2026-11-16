import { useState } from "react";
import FoodForm from "./Components/FoodForm.jsx";
import FoodList from "./Components/FoodList.jsx";
import "./App.css";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFoodAdded = () => {
    setRefreshKey((previous) => previous + 1);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>FoodShare</h1>
        <p>Share surplus food. Make a difference.</p>
      </header>

      <main>
        <FoodForm onFoodAdded={handleFoodAdded} />
        <FoodList refreshKey={refreshKey} />
      </main>

      <footer>
        FoodShare — Reducing food waste, one meal at a time.
      </footer>
    </div>
  );
}

export default App;