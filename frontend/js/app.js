window.onload = function() {
    document.getElementById('register-form').style.display = 'block';

    document.getElementById('show-register').addEventListener('click', function() {
        document.getElementById('register-form').style.display = 'block';
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('get-user-form').style.display = 'none';
        document.getElementById('create-post-form').style.display = 'none';
        document.getElementById('logout-button').style.display = 'none';
    });

    document.getElementById('show-login').addEventListener('click', function() {
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('get-user-form').style.display = 'block';
        document.getElementById('create-post-form').style.display = 'block';
        document.getElementById('logout-button').style.display = 'block';
    });

    document.getElementById('logout-button').addEventListener('click', function() {
        logoutUser();
    });

    let userToken = ''; 

    function resetFormFields(form) {
        form.reset();
    }

    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        let formData = new FormData(event.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const passwordConfirmation = formData.get('password_confirmation');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: passwordConfirmation
                })
            });

            const data = await response.json();

            if (response.ok) {
                userToken = data.token;
                document.getElementById('register-message').innerText = 'Registration successful! Please log in.';
                resetFormFields(registerForm);
                document.getElementById('register-form').style.display = 'none';
                document.getElementById('login-form').style.display = 'block';
            }

        } catch (error) {
            console.log(error);
        }
    });

    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        let formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                userToken = data.token;
                fetchAllPosts(userToken);
                document.getElementById('token-display').innerText = `Your token: ${userToken}`; // Fixed: backticks added
                resetFormFields(loginForm);
            }

        } catch (error) {
            console.log(error);
        }
    });

    const getForm = document.getElementById('get-user-form');
    getForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const token = userToken || document.getElementById('token').value;

        try {
            const response = await fetch('http://127.0.0.1:8000/api/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Fixed: backticks added
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('user-data').innerHTML = `<p>User Email: ${data.email}<br>
                                                                    User Name: ${data.name}</p>`; // Fixed: backticks added
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
                    'Authorization': `Bearer ${userToken}`, // Fixed: backticks added
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
                                                                  <p><strong>Title:</strong> ${data.title}, <strong>Body:</strong> ${data.body}</p>`; // Fixed: backticks added
                resetFormFields(postForm);
                await fetchAllPosts(userToken);
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
                    'Authorization': `Bearer ${token}`, // Fixed: backticks added
                    'Content-Type': 'application/json'
                }
            });

            const posts = await response.json();

            if (response.ok) {
                const postsContainer = document.getElementById('user-posts');
                postsContainer.innerHTML = '';
                posts.forEach(post => {
                    postsContainer.innerHTML += 
                        `<div class="post">
                            <p>Title: ${post.title}</p>
                            <p>Body: ${post.body}</p>
                            
                            <p>--------------------------</p>
                        </div>`; // Fixed: backticks added
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    function logoutUser() {
        userToken = '';
        document.getElementById('token-display').innerText = ''; // Fixed: changed to correct element
        document.getElementById('user-data').innerHTML = '';
        document.getElementById('user-posts').innerHTML = '';
        document.getElementById('logout-button').style.display = 'none'; 
        document.getElementById('register-form').style.display = 'none'; // Fixed: changed to correct element
        document.getElementById('login-form').style.display = 'none'; // Fixed: changed to correct element
        document.getElementById('get-user-form').style.display = 'none'; // Fixed: changed to correct element
        document.getElementById('create-post-form').style.display = 'none'; // Fixed: changed to correct element
        document.getElementById('show-register').style.display = 'block';
        document.getElementById('show-login').style.display = 'block';
    }

    if (userToken) {
        fetchAllPosts(userToken);
    }
};
