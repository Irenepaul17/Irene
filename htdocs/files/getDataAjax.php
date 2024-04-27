<?php
	//first connect to the database 
    require_once('../../dbconnect.php');  //replace with path and name for your connection script

    //create the sql query and send it
    $query = "select * from `customer`";
    $result = $con->query($query);
    
    //if we get data back display it using a table
    if($result != FALSE) 
    {
        while($row = $result->fetch()) 
        {
            echo $row['CustomerID'] . " " ;
            echo $row['Surname'] . " " ;
            echo $row['Givenname'] . " " ;
            echo $row['City'] . " " ;
            echo $row['Phone'] . " " ;
            echo $row['Email'] . " " ;
            echo "<br>";
        }
    }