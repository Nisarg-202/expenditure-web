import firebase from "firebase/app";

export const checkUser = function () {
  return async function (dispatch) {
    await firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        dispatch({ type: "check_login", payload: user.uid });
      } else {
        dispatch({ type: "check_login", payload: false });
      }
    });
  };
};

export const loginUser = function () {
  return function (dispatch) {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const user = result.user;
        if (user) {
          dispatch({ type: "check_login", payload: user.uid });
        } else {
          dispatch({ type: "check_login", payload: false });
        }
      })
      .catch(function (error) {
        dispatch({ type: "check_login", payload: false });
      });
  };
};

export const logoutUser = function () {
  return function (dispatch) {
    firebase
      .auth()
      .signOut()
      .then(function () {
        dispatch({ type: "check_login", payload: false });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const saveExpense = function (expense) {
  return async function (dispatch, getState) {
    const db = firebase.firestore();
    const expenseRef = db.collection("expense").doc(getState().Auth);
    expenseRef.get().then(function (response) {
      if (response.exists) {
        expenseRef.update({
          expenses: firebase.firestore.FieldValue.arrayUnion(expense),
        });
      } else {
        expenseRef.set({
          expenses: firebase.firestore.FieldValue.arrayUnion(expense),
        });
      }
    });
    db.collection("expense")
      .doc(getState().Auth)
      .onSnapshot(function (doc) {
        if (doc.exists) {
          dispatch({ type: "user_expense", payload: doc.data() });
        }
      });
  };
};

export const editExpense = function (expense) {
  return function (dispatch, getState) {
    const db = firebase.firestore();
    const sfDocRef = db.collection("expense").doc(getState().Auth);
    return db.runTransaction(function (transaction) {
      return transaction.get(sfDocRef).then(function (sfDoc) {
        if (sfDoc.exists) {
          const newExpense = sfDoc.data().expenses.filter(function (item) {
            return item.id !== expense.id;
          });
          newExpense.push(expense);
          transaction.update(sfDocRef, { expenses: newExpense });
          db.collection("expense")
            .doc(getState().Auth)
            .onSnapshot(function (doc) {
              if (doc.exists) {
                dispatch({ type: "user_expense", payload: doc.data() });
              }
            });
        }
      });
    });
  };
};

export const deleteExpense = function (id) {
  return function (dispatch, getState) {
    const db = firebase.firestore();
    const sfDocRef = db.collection("expense").doc(getState().Auth);
    return db.runTransaction(function (transaction) {
      return transaction.get(sfDocRef).then(function (sfDoc) {
        if (sfDoc.exists) {
          const newExpense = sfDoc.data().expenses.filter(function (item) {
            return item.id !== id;
          });
          transaction.update(sfDocRef, { expenses: newExpense });
          db.collection("expense")
            .doc(getState().Auth)
            .onSnapshot(function (doc) {
              if (doc.exists) {
                dispatch({ type: "user_expense", payload: doc.data() });
              }
            });
        }
      });
    });
  };
};

export const userExpense = function () {
  return function (dispatch, getState) {
    const db = firebase.firestore();
    const expenseRef = db.collection("expense").doc(getState().Auth);
    expenseRef.get().then(function (doc) {
      if (doc.exists) {
        dispatch({ type: "user_expense", payload: doc.data() });
      }
    });
  };
};
