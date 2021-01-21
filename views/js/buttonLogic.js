const logoutButton = document.getElementById('logoutButton');
const logInButton = document.getElementById('logInButton');

logoutButton.addEventListener('click', () => {
  window.location = '/';
});


logInButton.addEventListener('click', () => {
  window.location = '/login';
});
