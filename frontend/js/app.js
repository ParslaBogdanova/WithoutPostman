window.onload = function(){
    const getInfo = document.getElementById('get-email-info', 'get-password-info');
    getInfo.addEventListener('submit', async function(event){
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
          if (response.ok){
                let buttonClick = document.querySelector("button");
                buttonClick.addEventListener("click", () => {
                    window.location.href = "index.php";
                });
            } 
        }
    });
}


window.onload = function() {
    const getForm = document.getElementById('get-user-form');
    getForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const token = document.getElementById('token').value;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('user-data').innerHTML = `<p>User Email: ${data.email}<br>
                                                                    User Name: ${data.name}</p>`;
                await fetchAllPosts(token);
            }

        } catch (error) {
           console.log(error);
        }
    });

    const postForm = document.getElementById('create-post-form');
    postForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    body: body
                })
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('post-data').innerHTML = `<p>Post Created Successfully!</p>
                                                                  <p><strong>Title:</strong> ${data.title}, <strong>Body:</strong> ${data.body}</p>`;
                await fetchAllPosts(token);

                document.getElementById('title').value = '';
                document.getElementById('body').value = '';
            }

        } catch (error) {
            console.log(error);
        }
    });

    async function fetchAllPosts(token) {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const posts = await response.json();

            if (response.ok) {
                const postsContainer = document.getElementById('user-posts');
                postsContainer.innerHTML = '';
                posts.forEach(post => {
                    postsContainer.innerHTML += `
                        <div class="post">
                            <p>Title: ${post.title}</p>
                            <p>Body: ${post.body}</p>
                        </div>
                    `;
                });
            
            }
        } catch (error) {
            console.log(error);
        }
    }

    const token = document.getElementById('token').value;
    if (token) {
        fetchAllPosts(token);
    }
};
