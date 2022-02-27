import "./App.css";
import React from "react";
import DatePicker from "./components/DatePicker";

function App() {
	return (
		<div className="App">
			<DatePicker />
			<input type="date"></input>
		</div>
	);
}

export default App;
