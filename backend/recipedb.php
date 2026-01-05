<?php
$db = new PDO('sqlite:' . __DIR__ . '/recipes.sqlite');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);