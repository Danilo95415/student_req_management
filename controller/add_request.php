<?php
	$user_id = $_REQUEST["user_id"];
    $content = $_REQUEST["content"];
    $department = $_REQUEST["department"];

    $servername = "localhost";
	$username = "root";
	$password = "";
	$database ="std_req_manager";

	$conn = mysqli_connect($servername, $username, $password, $database);

	if (!$conn) {
  		die("Connection failed: " . mysqli_connect_error());
	}

	$sql = "INSERT INTO requests (u_id, created_at, content, status, department) VALUES ($user_id, now(), '$content', 0, '$department')";

	if (mysqli_query($conn, $sql)) {
		echo "success";
	} else {
	  	echo "failure";
	}

	mysqli_close($conn);

?>