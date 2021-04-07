fetch("https://spring21-427e.restdb.io/rest/posts", {
  "method": "GET",
  "headers": {
    "x-apikey": "6034a7eb5ad3610fb5bb6548"
  }
})
.then (res => res.json())
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});