const API = "https://blog-platform-backend-hm57.onrender.com";

async function signup() {
    await fetch(`${API}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value
        })
    });

    alert("Signup Success");
}

async function login() {
    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    });

    const data = await res.json();

    localStorage.setItem("token", data.token);

    alert("Logged in");
}

async function createPost() {
    const token = localStorage.getItem("token");

    await fetch(`${API}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify({
            title: title.value,
            content: content.value
        })
    });

    alert("Post Created");
}