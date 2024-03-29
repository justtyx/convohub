const form = document.querySelector('form');
let today = new Date();
    
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = today.getDate();
let hour = today.getHours();
let minute = today.getMinutes();

form.addEventListener('submit', userSubmitted);

function userSubmitted(e) {
  e.preventDefault();

  const payload = {
  username: form.elements.username.value,
  title: form.elements.title.value,
  content: form.elements.content.value,
  date: `${year}-${month}-${date} ${hour}:${minute}`,
  likes: 0,
  }
    
  document.querySelector('button[type="submit"]').disabled = true;

  fetch("https://spring21-427e.restdb.io/rest/posts", {
  "method": "POST",
  "headers": {
  "x-apikey": "6034a7eb5ad3610fb5bb6548",
  "Content-Type": "application/json"
  },
  "body": JSON.stringify(payload),
  })
    
  .then(response => {
    console.log(response);
    document.querySelector('button[type="submit"]').disabled = false;
    form.elements.username.value = '';
    form.elements.title.value = '';
    form.elements.content.value = '';

  })
  .catch(err => {
    console.error(err);
  });
}