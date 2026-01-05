<?php
require __DIR__ . '/db.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usernameOrEmail = $_POST['username_or_email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (!$usernameOrEmail || !$password) {
        die('All fields are required');
    }

    $stmt = $db->prepare('SELECT * FROM users WHERE username = :ue OR email = :ue');
    $stmt->execute([':ue' => $usernameOrEmail]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        echo "Login successful! Welcome, " . $user['username'];
    } else {
        echo "Invalid username/email or password";
    }
}
?>
