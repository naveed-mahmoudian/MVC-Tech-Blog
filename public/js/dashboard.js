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

if (document.location.pathname === "/dashboard") {
  document.getElementById("create-post").addEventListener("submit", createPost);
}
