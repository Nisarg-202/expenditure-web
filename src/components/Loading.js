import React from 'react';

function Loading() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight}}
    >
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
