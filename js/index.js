function getData (){
  fetch("https://spring21-427e.restdb.io/rest/posts?fetchchildren=true", {
  "method": "GET",
  "headers": {
    "x-apikey": "6034a7eb5ad3610fb5bb6548"
  }
})
.then((res) => res.json())
.then(response => {
  showPosts(response);
})
.catch(err => {
  console.error(err);
});
}

getData();

function showPosts(posts) {
  console.log(posts);

  //grab the template
  const template = document.querySelector('template').content;

  posts.forEach((post) => {
  // console.log(post);

  if (post.approved) {
  //clone it 
  const clone = template.cloneNode(true);
  //change content
  clone.querySelector('.top>h1').textContent = post.title;
  clone.querySelector('.username').textContent = post.username;
  let date = new Date(post.date);
  let formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  clone.querySelector('.date').textContent = formattedDate;
  clone.querySelector('.post-content').textContent = post.content;
  clone.querySelector('a.read-more').href = `post.html?post=${post._id}`;
  clone.querySelector('.comment-status>p').textContent = post.comments.length;
  clone.querySelector('.vote>p').textContent = post.likes;
 
  //grab parent
  const parent = document.querySelector('main');
  //append
  parent.appendChild(clone);
}
});
} 