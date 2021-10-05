export default function (state = null, action) {
  switch (action.type) {
    case 'user_expense':
      return action.payload;
    default:
      return state;
  }
}
