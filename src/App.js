import "./App.css";
import React from "react";
import DatePicker from "./components/DatePicker";
import { useState } from "react";

function App() {
	const [modal, setModal] = useState(false);

	const handleModal = () => {
		setModal(!modal);
	};

	return (
		<div className="App">
			<div className="datePicker__container">
				<div className="datePicker__input">
					<label htmlFor="date">Date</label>
					<input id="date" type="text" onClick={handleModal} />
				</div>
				{modal ? <DatePicker /> : ""}
			</div>
		</div>
	);
}

export default App;
