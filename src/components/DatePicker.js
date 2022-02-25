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
	// const currentDay = date.getDate();
	const weekdaysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
	// const monthsSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	const [year, setYear] = useState(currentYear);
	const [month, setMonth] = useState(currentMonth);
	// const [day, setDay] = useState(currentDay);

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

	const renderWeekdays = () => {
		return weekdaysList.map((day, index) => {
			return (
				<div key={index} className="weekdays__day">
					{day}
				</div>
			);
		});
	};

	const renderDaysInMonth = (year, month) => {
		const numberOfDaysinMonth = new Date(year, month + 1, 0).getDate();
		const arrayOfDays = [...Array(numberOfDaysinMonth).keys()].map((i) => i + 1);
		console.log(arrayOfDays);
		const firstWeekdayOfMonth = new Date(year, month, 1).getDay();
		console.log(new Date(year, month), firstWeekdayOfMonth);
		return arrayOfDays.map((day, index) => {
			return <div>{day}</div>;
		});
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
				<div className="datePicker__body">
					<div className="datePicker__weekdays">{renderWeekdays()}</div>
					<div>{renderDaysInMonth(year, month)}</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default DatePicker;
