const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('post');

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
  document.querySelector('.username').textContent = data.username;
  document.querySelector('.post-content').textContent = data.content;
}