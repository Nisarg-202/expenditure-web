import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {logoutUser} from '../actions';
import ItemDetails from './ItemDetails';
import ErrorDetails from './ErrorDetails';
import './Dashboard.css';

function Dashboard({logoutUser, expense, history}) {
  let total = 0;
  const [date, setDate] = useState();
  async function onHandleChange() {
    await logoutUser();
  }

  if (expense) {
    if (expense.expenses.length > 0) {
      expense.expenses.forEach(function (item) {
        total += Number(item.price);
      });
    }
  }

  function onDateChange(e) {
    setDate(e.target.value);
  }

  function onEditChange(items) {
    history.push('/new', items);
  }

  return (
    <div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-danger m-2" onClick={onHandleChange}>
          Logout
        </button>
      </div>
      <div className="jumbotron mt-3">
        <h3 className="display-4">
          Viewing {expense ? expense.expenses.length : 0} expenditure totalling{' '}
          {total}
        </h3>
        <Link className="btn btn-primary mt-2" to="/new">
          Add Expenditure
        </Link>
      </div>
      <div className="container">
        <div className="form-group form-inline">
          <div className="input-group">
            <input
              className="form-control"
              type="date"
              onChange={onDateChange}
              value={date}
            />
            {date && (
              <div
                className="input-group-append"
                onClick={function () {
                  setDate('');
                }}
              >
                <span class="input-group-text">X</span>
              </div>
            )}
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <h4>Expenditure</h4>
          <h4>Amount</h4>
        </div>
        <hr />
        {expense ? (
          expense.expenses.length > 0 ? (
            date ? (
              expense.expenses
                .filter(function (item) {
                  return (
                    new Date(item.date).getTime() >= new Date(date).getTime()
                  );
                })
                .map(function (item) {
                  return (
                    <ItemDetails item={item} onEditChange={onEditChange} />
                  );
                })
            ) : (
              expense.expenses.map(function (item) {
                return <ItemDetails item={item} onEditChange={onEditChange} />;
              })
            )
          ) : (
            <ErrorDetails />
          )
        ) : (
          <ErrorDetails />
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {expense: state.Expense};
}

export default connect(mapStateToProps, {logoutUser})(Dashboard);
