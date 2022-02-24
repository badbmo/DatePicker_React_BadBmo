import React from "react";
import "../style/datePicker.css";
import { useState } from "react";
import DoubleArrowLeft from "../assets/angles-left-solid.svg";
import DoubleArrowRight from "../assets/angles-right-solid.svg";
import ArrowLeft from "../assets/angle-left-solid.svg";
import ArrowRight from "../assets/angle-right-solid.svg";

/**
 * Date Picker Component
 * @returns {JSX} React component
 */

function DatePicker(lang = "default") {
	const date = new Date();
	const currentYear = date.getFullYear();
	const currentMonth = date.getMonth();
	const currentDay = date.getDate();
	const daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const monthsList = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const monthsSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	// const monthLong = date.toLocaleString(lang, { month: "long" });
	// const weekday = date.toLocaleString(lang, { weekday: "short" });

	// const isLeapYear = (year) => {
	// 	return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
	// };

	const [year, setYear] = useState(currentYear);
	const [month, setMonth] = useState(currentMonth);
	const [day, setDay] = useState(currentDay);

	const prevMonth = () => {
		setMonth(month - 1);
		if (month === 0) {
			setMonth(11);
			setYear(year - 1);
		}
	};

	const nextMonth = () => {
		setMonth(month + 1);
		if (month === 11) {
			setMonth(0);
			setYear(year + 1);
		}
	};

	const prevYear = () => {
		setYear(year - 1);
	};
	const nextYear = () => {
		setYear(year + 1);
	};

	return (
		<React.Fragment>
			<div className="datePicker__modal">
				<div className="datePicker__header">
					<img className="datePicker__nav" src={DoubleArrowLeft} alt="previous year" onClick={prevYear} />
					<img className="datePicker__nav" src={ArrowLeft} alt="previous month" onClick={prevMonth} />
					<h2 className="datePicker__title">
						{monthsList[month]} {year}
					</h2>
					<img className="datePicker__nav" src={ArrowRight} alt="next month" onClick={nextMonth} />
					<img className="datePicker__nav" src={DoubleArrowRight} alt="next year" onClick={nextYear} />
				</div>
			</div>
		</React.Fragment>
	);
}

export default DatePicker;
