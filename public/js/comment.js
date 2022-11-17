const createComment = async (e) => {
  e.preventDefault();

  const comment = document.getElementById("comment").value;

  if (comment) {
    const response = await fetch("/api/posts/comments", {
      method: "POST",
      body: JSON.stringify({ comment }),
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
