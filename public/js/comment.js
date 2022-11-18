const createComment = async (e) => {
  e.preventDefault();

  const comment = document.getElementById("comment").value;
  const post_id = parseInt(document.location.href.split("/").pop(), 10);

  if (comment) {
    const response = await fetch("/api/posts/comments", {
      method: "POST",
      body: JSON.stringify({ comment, post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to post comment!");
    }
  }
};

document
  .getElementById("create-comment")
  .addEventListener("submit", createComment);
