<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>API Front</title>
</head>
<body>
    <h1>Laravel API Frontend</h1>

    <button id="show-register" class="buttons" aria-label="Show Registration Form">Register</button>
    <button id="show-login" class="buttons" aria-label="Show Login Form">Login</button>
    <button id="logout-button" class="buttons" style="display: none;" aria-label="Logout">Logout</button>

    <div class="container">
        <h2>Register</h2>
        <form id="register-form">
            <label for="register-name">Name</label>
            <input type="text" name="name" id="register-name" required>

            <label for="register-email">Email</label>
            <input type="email" name="email" id="register-email" required>

            <label for="register-password">Password</label>
            <input type="password" name="password" id="register-password" required>

            <label for="register-password_confirmation">Password Confirmation</label>
            <input type="password" name="password_confirmation" id="register-password_confirmation" required>

            <input type="submit" value="Register">
        </form>
        <div id="register-message"></div>
    </div>

    <div class="container">
        <h2>Login</h2>
        <form id="login-form">
            <label for="login-email">Email</label>
            <input type="email" name="email" id="login-email" required>

            <label for="login-password">Password</label>
            <input type="password" name="password" id="login-password" required>

            <input type="submit" value="Login">
        </form>
        <div id="login-message"></div>
    </div>

    <div class="container">
        <h2>Get User</h2>
        <form id="get-user-form">
            <label for="token" id="token-display">Token</label>
            <input type="text" name="token" id="token" required>

            <input type="submit" value="Get">
            <div id="user-data"></div>
        </form>
    </div>

    <div class="container">
        <h2>Create Post</h2>
        <form id="create-post-form">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" required>

            <label for="body">Body</label>
            <textarea name="body" id="body" required></textarea>

            <input type="submit" value="Create">
            <div id="post-data"></div>
        </form>
    </div>

    <div class="container">
        <h2>Posts</h2>
        <div id="user-posts"></div>
    </div>

    <script src="js/app.js"></script>
</body>
</html>
