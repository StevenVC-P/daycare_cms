
async function getData(){
  console.log('FIRED');
  let url = '/api/internal';
  try {
    let res = await fetch(url);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}



const loginForm = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    getData()
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: {'Content-Type': 'application/json'},
        });
        if (response.ok) {
            document.location.replace('/api/internal');
        } else {
            alert(response.statusText);
        }
    }
};

const signupForm = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/api/internal');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginForm);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupForm);
