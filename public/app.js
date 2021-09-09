
//JAVASCRIPT FOR index.html LOGIN PAGE

console.log('Testing app.js 1 2 3');

/* document.getElementById('loginForm').addEventListener('click', (e) => {
    //console.log(e); submit event object
    //console.log(e.target); form#loginForm
    //console.log(e.target.guest_email.value);
    e.preventDefault();
    console.log('hello test');
    let theGuestEmail = e.target.guest_email.value;
    let theGuestPW = e.target.guest_pw.value;

    fetch('/api/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        guestEmail: theGuestEmail,
        guestPW: theGuestPW
       })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); 
         if (data.error) {
          alert(data.error)
        } else {
          //type the redirect to the guest profile page;
          
        } 
       }).catch((err) => {
        console.log(err);
      })
})  */