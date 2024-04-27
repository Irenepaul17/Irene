<?php
// api.php

// Database connection
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "322";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Perform SQL query to fetch town data
$sql = "SELECT * FROM town";
$result = $conn->query($sql);

// Check if query was successful
if ($result) {
    // Store the rows in an array
    $town = array();
    while ($row = $result->fetch_assoc()) {
        $towns[] = $row;
    }
    // Return town data as JSON
    echo json_encode($town);
} else {
    // Error handling for query execution
    echo "Error: " . $conn->error;
}

// Close database connection
$conn->close();
?>
