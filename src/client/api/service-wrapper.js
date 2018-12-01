function getUrl() {
  const root = new URL(window.location.href);
  root.port = "3000";
  return root;
}

export async function authenticate(email, password) {
  return new Promise((resolve, reject) => {
    fetch(getUrl() + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        email,
        password
      }
    }).then(response => {
      if (!response.ok) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
}
