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

const postsDiv = document.querySelector(".posts") as HTMLElement;
const commentsDiv = document.querySelector(".comments") as HTMLElement;
const userSearch = document.getElementById("search-type") as HTMLSelectElement;
const userInfo = document.querySelector(".info") as HTMLElement;


let users: User[] = [];

async function fetchUsers(): Promise<void> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  users = await res.json()

  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.id.toString();
    option.textContent = user.name;
    userSearch?.appendChild(option);

  })
}

function displayUserInfo(userId: number) {
  const user = users.find(u => u.id === userId);
  if (!user || !userInfo) return;

  userInfo.innerHTML = '';

  const info = `
    <h1>${user.name}</h1>
    <p><strong>@</strong> ${user.username}</p>
    <p><strong></strong> <a href="https://${user.website}" target="_blank">${user.website}</a></p>
    <p><strong></strong> ${user.company.catchPhrase}</p>
    <p><strong></strong> ${user.address.city}</p>
  `;
  userInfo.innerHTML = info;
}

userSearch.addEventListener('change', (e) => {
  const selectedId = parseInt((e.target as HTMLSelectElement).value);
  displayUserInfo(selectedId);
});

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
}

async function fetchComments(): Promise<Comment[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments");
  return res.json();
}

// Example usage
fetchUsers(); // this will populate the select
