import React from 'react';
import {connect} from 'react-redux';

import {loginUser} from '../actions';

function LoginPage({loginUser}) {
  async function onHandleChange() {
    await loginUser();
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight}}
    >
      <div className="card shadow" style={{width: '18rem'}}>
        <div className="card-body text-center">
          <h4 className="card-title">Expenditure App!</h4>
          <button className="btn btn-primary" onClick={onHandleChange}>
            Login With <i class="fab fa-google"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect(null, {loginUser})(LoginPage);
