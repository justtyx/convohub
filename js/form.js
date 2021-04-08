const form = document.querySelector('form');

form.addEventListener('submit', userSubmitted);

function userSubmitted(e) {
  e.preventDefault();

  // console.log(form.elements.username.value);
  // console.log(form.elements.title.value);
  // console.log(form.elements.content.value);

  const payload = {
  username: form.elements.username.value,
  title: form.elements.title.value,
  content: form.elements.content.value,
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