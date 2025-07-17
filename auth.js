const loginSection = document.getElementById('login-section');
const mainSection = document.getElementById('main-section');
const loginBtn = document.getElementById('login-btn');
const accessCodeInput = document.getElementById('access-code');
const loginError = document.getElementById('login-error');
const userGreeting = document.getElementById('user-greeting');
const userNameSpan = document.getElementById('user-name');
const logoutBtn = document.getElementById('logout-btn');

let currentUser = null;

loginBtn.addEventListener('click', () => {
  const code = accessCodeInput.value.trim();
  if (!code) {
    loginError.textContent = 'Въведете код за достъп!';
    return;
  }

  getUsers(users => {
    for (const [userCode, user] of Object.entries(users)) {
      if (userCode === code) {
        currentUser = { ...user, code: userCode };
        loginSuccess();
        return;
      }
    }
    loginError.textContent = 'Невалиден код!';
  });
});

logoutBtn.addEventListener('click', () => {
  currentUser = null;
  loginSection.style.display = 'block';
  mainSection.style.display = 'none';
  userGreeting.textContent = '';
  logoutBtn.style.display = 'none';
  accessCodeInput.value = '';
});

function loginSuccess() {
  loginSection.style.display = 'none';
  mainSection.style.display = 'block';
  userGreeting.textContent = `Влязъл: ${currentUser.name} (${currentUser.role})`;
  userNameSpan.textContent = currentUser.name;
  logoutBtn.style.display = 'inline-block';

  loadProducts();
  loadActiveUsers();
  setupChat();
  if (currentUser.role === 'admin' || currentUser.role === 'adminPlus') {
    document.getElementById('admin-section').style.display = 'block';
  } else {
    document.getElementById('admin-section').style.display = 'none';
  }
}
