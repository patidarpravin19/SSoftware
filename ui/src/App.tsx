import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import DemoDynamicDataGridUse from "./components/demo-use-shared-component/DemoDynamicDataGridUse";
import DynamicDialog from "./components/shared/DynamicDialog";


const App = () => {
  return (
    <div className="container">
      <nav style={{ padding: "10px", display: "flex", gap: "1rem" }}>
      <Link to="/">Demo Dynamic Grid</Link>
      {/* <Link to="/dynamic-dialog">Dynamic Dialog</Link>  */}

      </nav>

      <Routes>
        <Route path="/" element={<DemoDynamicDataGridUse />} />
        {/* <Route path="/dynamic-dialog" element={<DynamicDialog />} /> */}
      </Routes>
    </div>
  );
};

export default App;
