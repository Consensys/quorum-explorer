
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Validators from "./Routes/Validators";
import Explorer from "./Routes/Explorer";
import Contracts from "./Routes/Contracts";
import Nodes from "./Routes/Nodes";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import { QuorumConfig } from "./Types/QuorumConfig";

interface IProps {
  config: QuorumConfig;
}

export default function Router ({ config } : IProps) {
  
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route 
          path="/" 
          element={<Nodes config={config} />}
        />
        <Route 
          path="/validators"
          element={<Validators config={config} />}
        />
        <Route
          path="/explorer"
          element={<Explorer config={config} />}
        />
        <Route
          path="/contracts"
          element={<Contracts config={config} />}
        />
        <Route
          path="/nodes" 
          element={<Nodes config={config} />} 
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

