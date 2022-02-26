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

function DatePicker() {
	const weekdaysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const monthsList = ["January","February","March","April","May","June","July","August","September","October","November","December",];

	const date = new Date();
	const currentYear = date.getFullYear();
	const currentMonth = date.getMonth();
	const currentDay = date.getDate();
	const currentDate = new Date(currentYear, currentMonth, currentDay);
	console.log("date du jour", currentDate);

	const [year, setYear] = useState(currentYear);
	const [month, setMonth] = useState(currentMonth);
	const [selectedDate, setSelectedDate] = useState(currentDate);
	console.log("date choisie", selectedDate);

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

	const test = (day) => {
		const clickedDate = new Date(year, month, day);
		setSelectedDate(clickedDate);
	};

	const getClassName = (day) => {
		const clickedDate = new Date(year, month, day);
		if (clickedDate.getTime() === selectedDate.getTime()) {
			return " allDays__day--selected";
		}
		if (clickedDate.getTime() === currentDate.getTime()) {
			return " allDays__day--current";
		}
		return "";
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
		const totalDaysinMonth = new Date(year, month + 1, 0).getDate();
		const arrayOfDays = [...Array(totalDaysinMonth).keys()].map((i) => i + 1);

		const firstWeekdayOfMonth = new Date(year, month, 1).getDay();
		const totalDaysinPreviousMonth = new Date(year, month, 0).getDate();
		const arrayOfPreviousDays = [];
		for (var i = 1; i <= firstWeekdayOfMonth; i++) {
			arrayOfPreviousDays.push(totalDaysinPreviousMonth - firstWeekdayOfMonth + i);
		}

		const gridSize = 42;
		const numberOfNextDays = gridSize - (arrayOfDays.length + arrayOfPreviousDays.length);
		const arrayOfNextDays = [...Array(numberOfNextDays).keys()].map((i) => i + 1);
		
		return [
			arrayOfPreviousDays.map((day, index) => {
				return (
					<div key={index} className="allDays__blank">
						{day}
					</div>
				);
			}),
			arrayOfDays.map((day, index) => {
				return (
					<div key={index} className={"allDays__day" + getClassName(day)} onClick={() => test(day)}>
						<div className={"allDays__day__inner"}>{day}</div>
					</div>
				);
			}),
			arrayOfNextDays.map((day, index) => {
				return (
					<div key={index} className="allDays__blank">
						{day}
					</div>
				);
			}),
		];
	};

	return (
		<React.Fragment>
			<div className="datePicker__modal">
				<div className="datePicker__header">
					<div className="datePicker__nav" onClick={prevYear}>
						<img className="datePicker__nav__arrow" src={DoubleArrowLeft} alt="previous year" />
					</div>
					<div className="datePicker__nav" onClick={prevMonth}>
						<img className="datePicker__nav__arrow" src={ArrowLeft} alt="previous month" />
					</div>
					<div className="datePicker__title">
						<div className="datePicker__title__year">{year}</div>
						<div className="datePicker__title__month">{monthsList[month]}</div>
					</div>
					<div className="datePicker__nav" onClick={nextMonth}>
						<img className="datePicker__nav__arrow" src={ArrowRight} alt="next month" />
					</div>
					<div className="datePicker__nav" onClick={nextYear}>
						<img className="datePicker__nav__arrow" src={DoubleArrowRight} alt="next year" />
					</div>
				</div>
				<div className="datePicker__body">
					<div className="datePicker__weekdays">{renderWeekdays()}</div>
					<div className="datePicker__allDays">{renderDaysInMonth(year, month)}</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default DatePicker;
