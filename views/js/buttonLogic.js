const logoutButton = document.getElementById('logout-button');
const logInSubmitButton = document.getElementById('login-submit-button');

logoutButton.addEventListener('click', () => {
  fetch('/logout', {
    method: 'get',
    credentials: 'include'
  })
    .then(() => window.location = '/');
});
