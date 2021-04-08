function getData (){
  fetch("https://spring21-427e.restdb.io/rest/posts", {
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
    console.log(post);
  //clone it 
  const clone = template.cloneNode(true);
  //change content
    clone.querySelector('.top>h1').textContent = post.title;
    clone.querySelector('.username').textContent = post.username;
    // clone.querySelector('.date').textContent = post.date;
    clone.querySelector('.post-content').textContent = post.content;
    clone.querySelector('a.read-more').href = `post.html?post=${post._id}`;

    if (!post.approved) {
    clone.querySelector('article.main-post').classList.add('hide');
    }
  //grab parent
  const parent = document.querySelector('main');
  //append
  parent.appendChild(clone);
});
} 

//showPosts();