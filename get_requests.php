<?php

	$user_id = $_REQUEST["user_id"];
	$user_type = $_REQUEST["user_type"];
	$department = $_REQUEST["department"];

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database ="std_req_manager";

	$conn = mysqli_connect($servername, $username, $password, $database);

	if (!$conn) {
  		die("Connection failed: " . mysqli_connect_error());
	}

	$requests = [];

	if (!$user_type) $sql = "SELECT * FROM requests WHERE u_id=$user_id";
	if ($user_type == 1) $sql = "
		SELECT
			requests.id, 
			requests.created_at, 
			requests.`status`, 
			users.`name`, 
			users.department
		FROM
			requests
			INNER JOIN
			users
			ON 
				requests.u_id = users.id
		HAVING users.department = '$department'";
	if ($user_type == 2) $sql = "
		SELECT
			requests.id, 
			requests.created_at, 
			requests.`status`, 
			users.`name`, 
			users.department
		FROM
			requests
			INNER JOIN
			users
			ON
				requests.u_id = users.id";

	// print_r($sql);exit();
	$result = mysqli_query($conn, $sql);

	if ($result) {
	    while ($req = mysqli_fetch_assoc($result)) {
	        echo array_push($requests, $req);
	    }
	}

	echo json_encode($requests);

	mysqli_close($conn);

?>