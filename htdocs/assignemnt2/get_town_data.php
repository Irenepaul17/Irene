<?php
// Allow requests from http://localhost
header("Access-Control-Allow-Origin: http://localhost");
// Allow requests with credentials
header("Access-Control-Allow-Credentials: true");
// Specify allowed request methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Specify allowed request headers
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization");

$host = 'localhost';
$dbname = '322';
$username = 'root';
$password = 'root';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// town table is named 'town'
$query = "SELECT * FROM town";
$stmt = $pdo->query($query);
$town = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Sort towns alphabetically based on town name
usort($town, function($a, $b) {
    return strcmp($a['town_name'], $b['town_name']);
});

// Return the sorted town data as JSON response
header('Content-Type: application/json');
echo json_encode($town);
?>
