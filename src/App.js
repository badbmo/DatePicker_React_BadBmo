import "./App.css";
import React from "react";
import DatePicker from "./components/lib/DatePicker";

function App() {
	return (
		<div className="App">
			<DatePicker idInput={"date"} nameOfLabel={"Date"}/>
		</div>
	);
}

export default App;
