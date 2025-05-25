"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const userSearch = document.getElementById("search-type");
const userInfo = document.querySelector(".info");
const userPost = document.querySelector(".posts");
const userComment = document.querySelector(".comments");
let users = [];
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("https://jsonplaceholder.typicode.com/users");
        users = yield res.json();
        users.forEach((user) => {
            const option = document.createElement("option");
            option.value = user.id.toString();
            option.textContent = user.name;
            userSearch === null || userSearch === void 0 ? void 0 : userSearch.appendChild(option);
        });
    });
}
function displayUserInfo(userId) {
    const user = users.find(u => u.id === userId);
    if (!user || !userInfo)
        return;
    userInfo.innerHTML = `
    <h1>${user.name}</h1>
    <p><strong>@</strong> ${user.username}</p>
    <p><a href="https://${user.website}" target="_blank">${user.website}</a></p>
    <p>${user.company.catchPhrase}</p>
    <p>${user.address.city}</p>
  `;
}
function fetchPostsByUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        return yield res.json();
    });
}
function displayUserPost(posts) {
    userPost.innerHTML = '';
    posts.forEach(post => {
        const postBody = document.createElement('div');
        postBody.classList.add('post');
        postBody.dataset.postId = post.id.toString(); //To enable detect which post was clicked
        postBody.innerHTML = `
      <img src="/assets/xdp.jpeg" alt="Post image">
      <div class="post-content">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </div>
      `;
        userPost.appendChild(postBody);
    });
}
function fetchCommentByPost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        return yield res.json();
    });
}
function displayPostComment(comments) {
    userComment.innerHTML = '';
    comments.forEach(comment => {
        const commentBody = document.createElement('div');
        commentBody.classList.add('comment');
        commentBody.innerHTML = `
    <img src="/assets/xdp.jpeg" alt="Post image">
      <div class="comment-content">
        <h3>${comment.name}</h3>
        <p>${comment.body}</p>
      </div>

      </hr>
    `;
        userComment.appendChild(commentBody);
    });
}
userPost.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    const postElement = e.target.closest('.post');
    if (!postElement || !postElement.dataset.postId)
        return;
    const postId = parseInt(postElement.dataset.postId);
    const comments = yield fetchCommentByPost(postId);
    displayPostComment(comments);
}));
userSearch.addEventListener('change', (e) => __awaiter(void 0, void 0, void 0, function* () {
    const selectedId = parseInt(e.target.value);
    displayUserInfo(selectedId);
    const posts = yield fetchPostsByUser(selectedId);
    displayUserPost(posts);
}));
fetchUsers();
