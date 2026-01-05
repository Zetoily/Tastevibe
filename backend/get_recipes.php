<?php
require 'recipedb.php'; // подключение к SQLite

header('Content-Type: application/json');

$title = isset($_GET['title']) ? trim($_GET['title']) : '';
$category = isset($_GET['category']) ? trim($_GET['category']) : '';
$prep_time = isset($_GET['prep_time']) ? (int)$_GET['prep_time'] : 0;

$sql = "SELECT * FROM recipes WHERE 1=1";
$params = [];

if ($title !== '') {
    $sql .= " AND title LIKE :title";
    $params[':title'] = "%$title%";
}

if ($category !== '' && $category !== 'All') {
    $sql .= " AND category = :category";
    $params[':category'] = $category;
}

if ($prep_time > 0) {
    if ($prep_time === 1000) {
        // match recipes with more than 30 minutes; extract numeric minutes from `time` string
        $sql .= " AND CAST(substr(time, 1, instr(time, ' ') - 1) AS INTEGER) > 30";
    } else {
        // compare numeric minutes extracted from `time` (e.g. '20 min')
        $sql .= " AND CAST(substr(time, 1, instr(time, ' ') - 1) AS INTEGER) <= :prep_time";
        $params[':prep_time'] = $prep_time;
    }
}

$stmt = $db->prepare($sql);
$stmt->execute($params);
$recipes = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($recipes);
