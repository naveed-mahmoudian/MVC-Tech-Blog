const createPost = async (e) => {
  e.preventDefault();

  const title = document.getElementById("title");
  const text = document.getElementById("title");

  if (title && text) {
    const result = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, text }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (result.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to create post!");
  }
};

if (document.location.pathname === "/dashboard") {
  document.getElementById("create-post").addEventListener("submit", createPost);
}
