<?php
	$req_id = $_REQUEST["req_id"];

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database ="std_req_manager";

	$conn = mysqli_connect($servername, $username, $password, $database);

	if (!$conn) {
  		die("Connection failed: " . mysqli_connect_error());
	}

	$sql = "DELETE from requests where id=$req_id";

	if (mysqli_query($conn, $sql)) {
		echo "success";
	} else {
	  	echo "failure";
	}

	mysqli_close($conn);	
?>