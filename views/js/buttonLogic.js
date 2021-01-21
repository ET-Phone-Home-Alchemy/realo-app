const logoutButton = document.getElementById('logoutButton');
const logInSubmitButton = document.getElementById('logInSubmitButton');

logoutButton.addEventListener('click', () => {
  window.location = '/logout';
});


logInSubmitButton.addEventListener('click', () => {
  window.location = '/filters';
});
