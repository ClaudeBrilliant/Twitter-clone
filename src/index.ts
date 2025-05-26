interface User {
  id: number;
  name: string;
  username: string;
  website: string;
  company: {
    catchPhrase: string;
  };
  address: {
    city: string;
  };
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  body: string;
  name: string;
  email: string;
}

const userSearch = document.getElementById("search-type") as HTMLSelectElement;
const userInfo = document.querySelector(".info") as HTMLElement;
const userPost = document.querySelector(".posts") as HTMLElement;
const userComment = document.querySelector(".comments") as HTMLElement;

let users: User[] = [];

async function fetchUsers(): Promise<void> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  users = await res.json();

  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.id.toString();
    option.textContent = user.name;
    userSearch.appendChild(option);
  });
  userSearch.value = '1';
}

function displayUserInfo(userId: number) {
  const user = users.find(u => u.id === userId);
  if (!user || !userInfo) return;

  userInfo.innerHTML = `

    <h1>${user.name}</h1>
    <p><strong>@</strong> ${user.username}</p>
    <p>${user.website}</p>
    <p>${user.company.catchPhrase}</p>
    <p>${user.address.city}</p>
  `;
}

async function fetchPostsByUser(userId: number): Promise<Post[]> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  return await res.json();
}


function displayUserPost(posts: Post[]) {
  userPost.innerHTML = ''; 

  posts.forEach(post => {
    const postBody = document.createElement('div')
     postBody.classList.add('post');
     postBody.dataset.postId = post.id.toString() //To enable detect which post was clicked

    postBody.innerHTML = `
      <img src="/assets/depe.png" alt="Post image">
      <div class="post-content">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </div>
      `
       userPost.appendChild(postBody); 
  });
}

async function fetchCommentByPost(postId : number): Promise<Comment[]>{
  const res = await fetch (`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
  return await res.json()
}

function displayPostComment(comments: Comment[]) {
  userComment.innerHTML = '';

  comments.forEach(comment => {
    const commentBody = document.createElement('div');
    commentBody.classList.add('comment');

    commentBody.innerHTML = `
      <img src="/assets/xdp.jpeg" alt="Post image">
      <div class="comment-content">
        <h3>${comment.name}</h3>
        <p>${comment.body}</p>
        <hr />
      </div>
      
    `;

    userComment.appendChild(commentBody);
  });
}


userPost.addEventListener('click', async (e) => {
  const postElement = (e.target as HTMLElement).closest('.post') as HTMLElement;
  if (!postElement || !postElement.dataset.postId) return;

  const postId = parseInt(postElement.dataset.postId);
  const comments = await fetchCommentByPost(postId);
  displayPostComment(comments);
});

userSearch.addEventListener('change', async (e) => {
  const selectedId = parseInt((e.target as HTMLSelectElement).value);
  displayUserInfo(selectedId);
  const posts = await fetchPostsByUser(selectedId);
  displayUserPost(posts);
});


fetchUsers();
