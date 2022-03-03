import "./App.css";
import React from "react";
import DatePicker from "./components/lib/DatePicker";

function App() {
	const exampleOfFunction = (date) => {
		return console.log(date);
	};
	return (
		<div className="App">
			<DatePicker idInput={"date"} nameOfLabel={"Date"} getSelectedDate={exampleOfFunction} />
		</div>
	);
}

export default App;
