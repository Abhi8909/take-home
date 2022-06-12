import type { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Agents from "../Agents/Agents";
import AgentEnhancedView from "../Agents/AgentEnhancedView";

const App: FC = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Agents />} />
          <Route path="/agent/:agentId" element={<AgentEnhancedView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
