const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// ----- SIGN UP -----
document.querySelector('.sign-up form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = this.querySelector('input[placeholder="Name"]').value;
  const email = this.querySelector('input[placeholder="Email"]').value;
  const password = this.querySelector('input[placeholder="Password"]').value;

  const res = await fetch('http://localhost:3000/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert('✅ Registration successful! Please log in.');
    document.getElementById('login').click();  // Switch to login form
  } else {
    alert('❌ ' + data.error);
  }
});


// ----- SIGN IN -----
document.querySelector('.sign-in form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = this.querySelector('input[placeholder="Email"]').value;
  const password = this.querySelector('input[placeholder="Password"]').value;

  const res = await fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert('✅ Login successful as ' + data.role);

    // Redirect based on role
    if (data.role === 'user') {
      window.location.href = '../User/user_dashboard.html';
    } else if (data.role === 'agent') {
      window.location.href = '../Agent_Dashboard/agent_dashboard.html';
    } else if (data.role === 'admin') {
      window.location.href = '../ADMINE/dashboard.html';
    }
  } else {
    alert('❌ ' + data.error);
  }
});
