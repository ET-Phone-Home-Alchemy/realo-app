const logoutButton = document.getElementById('logoutButton');
const logInSubmitButton = document.getElementById('logInSubmitButton');

logoutButton.addEventListener('click', () => {
  fetch('/logout', {
    method: 'get',
    credentials: 'include'
  })
    .then(() => window.location = '/');

  // window.location = '/logout';
});


logInSubmitButton.addEventListener('click', () => {
  window.location = '/filters';
});
