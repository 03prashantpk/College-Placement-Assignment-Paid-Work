<?php
// Set the URL to redirect to
$redirectUrl = "https://mobowebtechnologyassignment.onrender.com/";

// Set the number of seconds before redirection
$seconds = 5;

// Generate the HTTP "refresh" header with the redirect URL and delay
header("refresh: $seconds; url=$redirectUrl");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Redirecting...</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 4px;


        }

        body {
            background-color: #f1f1f1;
            font-family: Arial, sans-serif;
            margin-top: 5%;
            text-align: center;
        }
    </style>
</head>

<body>
    <h1>Please wait, redirecting you to the project...</h1>
    <h3>Mob Web Technology</h3>
    <p>This page will redirect automatically in <?php echo $seconds; ?> seconds.</p>
    <p>If it doesn't redirect, <a href="<?php echo $redirectUrl; ?>">click here</a>.</p>
</body>

</html>