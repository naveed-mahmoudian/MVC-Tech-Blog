const createPost = async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const text = document.getElementById("text").value;

  if (title && text) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, text }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post!");
    }
  }
};

const editPost = (e) => {
  const postId = e.target.dataset.postId;
  const postTitle = e.path[2].children[0].textContent;
  const postText = e.path[1].children[0].textContent;
  const postToEdit = document.getElementById(`post-${postId}`);

  postToEdit.innerHTML = `
  <div class="card mt-3">
        <input type="text" class="form-control" id="post-title-${postId}" placeholder="${postTitle}"></input>
    <div class="card-body">
        <form id="edit-post-${postId}">
          <textarea style="display: block" rows="3" class="form-control" id="post-text-${postId}" placeholder="${postText}"></textarea>
          <button type="submit" class="btn btn-secondary">Save</button>
          <a href="/dashboard" class="btn btn-danger">Cancel</a>
        </form>
    </div>
    </div>
  `;

  document
    .getElementById(`edit-post-${postId}`)
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const title = document.getElementById(`post-title-${postId}`).value;
      const text = document.getElementById(`post-text-${postId}`).value;

      if (title && text) {
        const response = await fetch(`api/posts/edit/${postId}`, {
          method: "PUT",
          body: JSON.stringify({ title, text }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          alert("Failed to create post!");
        }
      }
    });
};

const deletePost = async (e) => {
  const postId = e.target.dataset.postId;
  const response = await fetch(`/api/posts/delete/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete post!");
  }
};

if (document.location.pathname === "/dashboard") {
  document.getElementById("create-post").addEventListener("submit", createPost);
  if (document.getElementById("your-posts").childElementCount > 0) {
    const editBtns = document.querySelectorAll("#edit-post");
    const deleteBtns = document.querySelectorAll("#delete-post");

    editBtns.forEach((editBtn) => editBtn.addEventListener("click", editPost));
    deleteBtns.forEach((deleteBtn) =>
      deleteBtn.addEventListener("click", deletePost)
    );
  }
}
