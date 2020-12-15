import React, { useState } from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import "react-dates/initialize";

import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setEndDate,
  setStartDate,
} from "../redux/actions/filters";

const ExpenseListFilters = ({
  filters,
  setTextFilter,
  sortByAmount,
  sortByDate,
  setEndDate,
  setStartDate,
}) => {
  const [focusedInput, setFocusedInput] = useState(null);

  const onInputChange = (e) => {
    setTextFilter(e.target.value);
  };

  const onSelectChange = (e) => {
    e.target.value === "date" ? sortByDate() : sortByAmount();
  };

  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const onFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput);
  };

  return (
    <div className="content-container">
      <div className="filters-group">
        <div className="filters-group__item">
          <input
            className="text-input"
            placeholder="Search expenses"
            type="text"
            value={filters.text}
            onChange={onInputChange}
          />
        </div>
        <div className="filters-group__item">
          <select
            className="select"
            onChange={onSelectChange}
            value={filters.sortBy}
          >
            <option value="amount">Amount</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div className="filters-group__item">
          <DateRangePicker
            startDate={filters.startDate ? moment(filters.startDate) : null} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={filters.endDate ? moment(filters.endDate) : null} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={onDatesChange} // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={onFocusChange} // PropTypes.func.isRequired,
            numberOfMonths={1}
            showClearDates={true}
            isOutsideRange={() => false}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  filters: state.filters,
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => {
    dispatch(setTextFilter(text));
  },
  sortByAmount: () => {
    dispatch(sortByAmount());
  },
  sortByDate: () => {
    dispatch(sortByDate());
  },
  setStartDate: (startDate) => {
    dispatch(setStartDate(startDate));
  },
  setEndDate: (endDate) => {
    dispatch(setEndDate(endDate));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
