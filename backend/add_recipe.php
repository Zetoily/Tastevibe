<?php
require 'recipedb.php';

$title = $_POST['title'] ?? '';
$time = $_POST['time'] ?? '';
$category = $_POST['category'] ?? '';
$ingredients = $_POST['ingredients'] ?? '';
$steps = $_POST['steps'] ?? '';

$imagePath = null;

if (!empty($_FILES['image']['name'])) {
    $dir = __DIR__ . '/../uploads/recipes/';
    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }

    $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $name = uniqid() . '.' . $ext;

    move_uploaded_file($_FILES['image']['tmp_name'], $dir . $name);
    $imagePath = 'uploads/recipes/' . $name;
}

$stmt = $db->prepare("
  INSERT INTO recipes (title, image, time, category, ingredients, steps)
  VALUES (?, ?, ?, ?, ?, ?)
");

$stmt->execute([
  $title,
  $imagePath,
  $time,
  $category,
  $ingredients,
  $steps
]);

header("Location: /index.html");
exit;
