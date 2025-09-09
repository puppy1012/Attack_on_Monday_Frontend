import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import DashboardPreview from "./pages/DashboardPreview.tsx";
import WorkStatusCard from "./components/dashbord/WorkStatusCard.tsx";

const App = () => (
	<div className="bg-slate-50">
		<DashboardPreview/>
	</div>
);

export default App;