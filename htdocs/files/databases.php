<?php
// Database connection parameters
$db_host = '127.0.0.1'; // Use 127.0.0.1 for network connection
$db_port = 8889;
$db_user = 'root';
$db_password = 'root';
$db_database = 'newtopics';

// Create connection
$mysqli = new mysqli(
    $db_host,
    $db_user,
    $db_password,
    $db_database,
    $db_port // Use this for network connection
);

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Function to retrieve active news topics from the database
function getNewsTopics($mysqli) {
    $sql = "SELECT * FROM newtopics";
    $result = $mysqli->query($sql);
    $topics = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $topics[] = $row;
        }
    }
    return $topics;
}

// Call the function to retrieve news topics
$newsTopics = getNewsTopics($mysqli);

// Return the news topics as JSON data
header('Content-Type: application/json');
echo json_encode($newsTopics);

// Close connection (optional since PHP automatically closes connections at the end of the script)
$mysqli->close();
?>
