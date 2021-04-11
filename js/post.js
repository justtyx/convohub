const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('post');

let today = new Date();
    
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = today.getDate();
let hour = today.getHours();
let minute = today.getMinutes();

fetch(`https://spring21-427e.restdb.io/rest/posts/${postId}?fetchchildren=true`, {
  "method": "GET",
  "headers": {
    "x-apikey": "6034a7eb5ad3610fb5bb6548"
  }
})
.then((res) => res.json())
.then(response => {
  showPost(response);
})
.catch(err => {
  console.error(err);
});

function showPost(data) {
  console.log(data);
  document.querySelector('.top>h1').textContent = data.title;
  document.querySelector('.post-user').textContent = data.username;
  document.querySelector('.post-content').textContent = data.content;
  let date = new Date(data.date);
  let formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  document.querySelector('.post-date').textContent = formattedDate;
  document.querySelector('.comment-status>p').textContent = data.comments.length;
  document.querySelector('.post-vote>p').textContent = data.likes;


  //comment template
  const template = document.querySelector('.comment-template').content;

  data.comments.forEach(comment => {
  //clone
  const clone = template.cloneNode(true);

  //loop through comments
    clone.querySelector('.comm-user').textContent = comment.username;
    clone.querySelector('.comment-content').textContent = comment.content;

    const parent = document.querySelector('section.comment-section');
    parent.appendChild(clone);
  });

  if (data.comments.length === 0) {
    document.querySelector('.no-comments').classList.remove('hide');
  }

}

const form = document.querySelector('form');

form.addEventListener('submit', userSubmitted);

function userSubmitted(e) {
  e.preventDefault();

  const payload = {
  username: form.elements.username.value,
  email: form.elements.email.value,
  content: form.elements.content.value,
  date: `${year}-${month}-${date} ${hour}:${minute}`,
  }
    
  document.querySelector('button[type="submit"]').disabled = true;

  fetch(`https://spring21-427e.restdb.io/rest/posts/${postId}/comments`, {
  "method": "POST",
  "headers": {
  "x-apikey": "6034a7eb5ad3610fb5bb6548",
  "Content-Type": "application/json"
  },
  "body": JSON.stringify(payload),
  })
  
  .then ((res) => res.json())
  .then((response) => {
    document.querySelector('button[type="submit"]').disabled = false;
    form.elements.username.value = '';
    form.elements.email.value = '';
    form.elements.content.value = '';

    const template = document.querySelector('.comment-template').content;
    const clone = template.cloneNode(true);
    clone.querySelector('.comm-user').textContent = response.username;
    clone.querySelector('.comm-user').textContent = response.username;
    clone.querySelector('.comment-content').textContent = response.content;

    const parent = document.querySelector('section.comment-section');
    parent.appendChild(clone);
    document.querySelector('.no-comments').classList.add('hide');


  })
  .catch(err => {
    console.error(err);
  });
}