// eslint-disable-next-line strict
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

require("./style/datePicker.css");

var _anglesLeftSolid = _interopRequireDefault(require("./assets/angles-left-solid.svg"));

var _anglesRightSolid = _interopRequireDefault(require("./assets/angles-right-solid.svg"));

var _angleLeftSolid = _interopRequireDefault(require("./assets/angle-left-solid.svg"));

var _angleRightSolid = _interopRequireDefault(require("./assets/angle-right-solid.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-func-assign
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

// eslint-disable-next-line no-mixed-operators
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Date Picker Component with input - select a date in a customizable calendar
 * @param {string} idInput id of input and for of label
 * @param {string} nameOfLabel name displayed in label
 * @param {function} getSelectedDate function to get the selected date value in a Date format
 * @returns {JSX} React component
 */
function DatePicker(_ref) {
  let {
    idInput,
    nameOfLabel,
    getSelectedDate
  } = _ref;
  //You can change these list items but DO NOT CHANGE THE LENGTH OF ARRAYS!
  const weekdaysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const currentDay = date.getDate();
  const currentDate = new Date(currentYear, currentMonth, currentDay);
  const [year, setYear] = (0, _react.useState)(currentYear);
  const [month, setMonth] = (0, _react.useState)(currentMonth);
  const [selectedDate, setSelectedDate] = (0, _react.useState)(currentDate);
  const [modal, setModal] = (0, _react.useState)(false);

  const handleModal = () => {
    setModal(!modal);
  };

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
  }; //chooseThisDate function - set selectedDate state to cliked date (year state, month state, day clicked) and close modal


  const chooseThisDate = day => {
    const clickedDate = new Date(year, month, day);
    setSelectedDate(clickedDate);
    handleModal();
    getSelectedDate(clickedDate);
  };
  /**
   * getClassName function - compare every day in current month to selectedDate (in state) and today.
   * Give className accordingly.
   * @param {number} day day (number)
   * @returns {string} className : selected, current or nothing
   */


  const getClassName = day => {
    const clickedDate = new Date(year, month, day);

    if (clickedDate.getTime() === selectedDate.getTime()) {
      return " allDays__day--selected";
    }

    if (clickedDate.getTime() === currentDate.getTime()) {
      return " allDays__day--current";
    }

    return "";
  };
  /**
   * renderWeekdays function - loop on weekdaysList
   * @returns {JSX} div for each day of weekdaysList
   */


  const renderWeekdays = () => {
    return weekdaysList.map((day, index) => {
      return /*#__PURE__*/_react.default.createElement("div", {
        key: index,
        className: "weekdays__day"
      }, day);
    });
  };
  /**
   * renderDaysInMonth function - render all the days in the calendar
   * @returns {JSX} Arrays of jsx: div for prev month days/ div for current month days/ div for next month days
   */


  const renderDaysInMonth = () => {
    const totalDaysinMonth = new Date(year, month + 1, 0).getDate();
    const arrayOfDays = [...Array(totalDaysinMonth).keys()].map(i => i + 1); //take number of days in prev month (ex: 31)
    //substract first Weekday of current month (ex: tuesday = 2) +i while i <= weekday number
    //give the days of previous month to be displayed (ex: 29, 30, 31)

    const firstWeekdayOfMonth = new Date(year, month, 1).getDay();
    const totalDaysinPreviousMonth = new Date(year, month, 0).getDate();
    const arrayOfPreviousDays = [];

    for (var i = 1; i <= firstWeekdayOfMonth; i++) {
      arrayOfPreviousDays.push(totalDaysinPreviousMonth - firstWeekdayOfMonth + i);
    } //DO NOT CHANGE GRID SIZE !
    //if [prev days + current days] < 42, add days next month to be displayed while i <= 42


    const gridSize = 42;
    const numberOfNextDays = gridSize - (arrayOfDays.length + arrayOfPreviousDays.length);
    const arrayOfNextDays = [...Array(numberOfNextDays).keys()].map(i => i + 1);
    return [arrayOfPreviousDays.map((day, index) => {
      return /*#__PURE__*/_react.default.createElement("div", {
        key: index,
        className: "allDays__blank"
      }, day);
    }), arrayOfDays.map((day, index) => {
      return /*#__PURE__*/_react.default.createElement("div", {
        key: index,
        className: "allDays__day" + getClassName(day),
        onClick: () => chooseThisDate(day)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "allDays__day__inner"
      }, day));
    }), arrayOfNextDays.map((day, index) => {
      return /*#__PURE__*/_react.default.createElement("div", {
        key: index,
        className: "allDays__blank"
      }, day);
    })];
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: idInput
  }, nameOfLabel), /*#__PURE__*/_react.default.createElement("input", {
    readOnly: true,
    id: idInput,
    type: "text",
    onClick: handleModal,
    value: selectedDate.toLocaleDateString()
  }), modal ? /*#__PURE__*/_react.default.createElement("div", {
    className: "datePicker__background",
    onClick: handleModal
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "datePicker__modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "datePicker__header"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "datePicker__nav",
    onClick: prevYear
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "datePicker__nav__arrow",
    src: _anglesLeftSolid.default,
    alt: "previous year"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "datePicker__nav",
    onClick: prevMonth
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "datePicker__nav__arrow",
    src: _angleLeftSolid.default,
    alt: "previous month"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "datePicker__title"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "datePicker__title__year"
  }, year), /*#__PURE__*/_react.default.createElement("div", {
    className: "datePicker__title__month"
  }, monthsList[month])), /*#__PURE__*/_react.default.createElement("div", {
    className: "datePicker__nav",
    onClick: nextMonth
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "datePicker__nav__arrow",
    src: _angleRightSolid.default,
    alt: "next month"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "datePicker__nav",
    onClick: nextYear
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "datePicker__nav__arrow",
    src: _anglesRightSolid.default,
    alt: "next year"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "datePicker__body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "datePicker__weekdays"
  }, renderWeekdays()), /*#__PURE__*/_react.default.createElement("div", {
    className: "datePicker__allDays"
  }, renderDaysInMonth())))) : "");
}

var _default = DatePicker;
exports.default = _default;