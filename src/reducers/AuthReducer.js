export default function (state = null, action) {
  switch (action.type) {
    case 'check_login':
      return action.payload;
    default:
      return state;
  }
}
