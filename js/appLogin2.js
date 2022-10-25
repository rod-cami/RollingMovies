let formularioLogin = document.getElementById('formularioLogin');
formularioLogin.addEventListener('submit', inicioSesion);

async function inicioSesion(e) {
  e.preventDefault();
  const emailLogin = document.getElementById('email').value
  const passwordLogin = document.getElementById('password').value

  const result = await fetch('http://localhost:3000/users')
  const users = await result.json()

  const user = users.find(user => user.email === emailLogin)
  console.log(user);

  if (!user) {
    return alert('Los datos no coinciden')
  }
  if (user.password === passwordLogin) {
    localStorage.setItem('role', user.role)
    window.location.href = "../html/pageAdmin.html"
  } else {
    alert('Los datos no coinciden')
  }
}