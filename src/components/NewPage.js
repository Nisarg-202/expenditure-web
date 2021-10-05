import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';

import {logoutUser, saveExpense, editExpense, deleteExpense} from '../actions';
import Loading from './Loading';

function NewPage({
  logoutUser,
  editExpense,
  saveExpense,
  deleteExpense,
  history,
  location: {state},
}) {
  const [condition, setCondition] = useState(false);
  const [description, setDescription] = useState(state && state.description);
  const [price, setPrice] = useState(state && state.price);
  const [date, setDate] = useState(state && state.date);
  const [note, setNote] = useState(state && state.note);

  function onDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function onPriceChange(e) {
    setPrice(e.target.value);
  }

  function onDateChange(e) {
    setDate(e.target.value);
  }

  function onNoteChange(e) {
    setNote(e.target.value);
  }

  function redirectPage() {
    history.push('/dashboard');
  }

  async function onHandleChange(e) {
    e.preventDefault();
    if (!state) {
      setCondition(true);
      await saveExpense({description, price, date, note, id: uuidv4()});
      redirectPage();
    } else {
      setCondition(true);
      await editExpense({
        description,
        price,
        date,
        note,
        id: state.id,
      });
      redirectPage();
    }
  }

  async function onDeleteChange() {
    setCondition(true);
    await deleteExpense(state.id);
    redirectPage();
  }

  async function onLogout() {
    await logoutUser();
  }

  {
    return condition ? (
      <Loading />
    ) : (
      <div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger m-2" onClick={onLogout}>
            Logout
          </button>
        </div>
        <div className="jumbotron">
          <h3 className="display-4">{state ? 'Edit' : 'Add'} Expenditure</h3>
        </div>
        <div className="container mt-4">
          <form onSubmit={onHandleChange}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                required
                placeholder="Description"
                onChange={onDescriptionChange}
                value={description}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                required
                placeholder="Amount"
                onChange={onPriceChange}
                value={price}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                data-provide="datepicker"
                type="date"
                required
                placeholder="Date"
                onChange={onDateChange}
                value={date}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Add a note for your expenditure (optional)"
                onChange={onNoteChange}
                value={note}
                rows={3}
              ></textarea>
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                Save Expenditure
              </button>
              {state && (
                <Link
                  className="btn btn-secondary ml-3"
                  onClick={onDeleteChange}
                >
                  Delete
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  logoutUser,
  saveExpense,
  editExpense,
  deleteExpense,
})(NewPage);
