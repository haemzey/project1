// Minimal demo auth using localStorage (for prototype only) 
(function(){
  function getUsers(){
    try{ return JSON.parse(localStorage.getItem('users')||'[]') }catch(e){return[]}
  }
  function saveUsers(users){ localStorage.setItem('users', JSON.stringify(users)) }

  // Signup
  var signup = document.getElementById('signup-form');
  if(signup){
    signup.addEventListener('submit', function(e){
      e.preventDefault();
      var name = signup.name.value.trim();
      var email = signup.email.value.trim().toLowerCase();
      var pw = signup.password.value;
      var conf = signup.confirm.value;
      if(pw !== conf){ alert('Passwords do not match'); return }
      var users = getUsers();
      if(users.find(u=>u.email===email)){ alert('Account already exists'); return }
      users.push({name: name, email: email, password: pw});
      saveUsers(users);
      alert('Account created — you can now sign in');
      window.location.href = 'login.html';
    });
  }

  // Login
  var login = document.getElementById('login-form');
  if(login){
    login.addEventListener('submit', function(e){
      e.preventDefault();
      var email = login.email.value.trim().toLowerCase();
      var pw = login.password.value;
      var users = getUsers();
      var u = users.find(x=>x.email===email && x.password===pw);
      if(u){
        localStorage.setItem('sessionUser', JSON.stringify({name:u.name,email:u.email}));
        alert('Signed in as ' + u.name);
        // Redirect to index or dashboard
        window.location.href = 'index.html';
      } else {
        alert('Invalid credentials');
      }
    });
  }
})();