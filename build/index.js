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
const postsDiv = document.querySelector(".posts");
const commentsDiv = document.querySelector(".comments");
const userSearch = document.getElementById("search-type");
const userInfo = document.querySelector(".info");
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
    const selectedId = parseInt(e.target.value);
    displayUserInfo(selectedId);
});
function fetchPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("https://jsonplaceholder.typicode.com/posts");
        return res.json();
    });
}
function fetchComments() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("https://jsonplaceholder.typicode.com/comments");
        return res.json();
    });
}
// Example usage
fetchUsers(); // this will populate the select
