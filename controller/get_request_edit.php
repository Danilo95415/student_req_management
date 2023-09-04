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

	$sql = "SELECT requests.id, requests.created_at, requests.`status`, users.`name`, users.department FROM requests INNER JOIN users ON requests.u_id = users.id WHERE requests.id=$req_id";
	
	$result = mysqli_query($conn, $sql);
	$request = mysqli_fetch_assoc($result);

	echo json_encode($request);

	mysqli_close($conn);

?>