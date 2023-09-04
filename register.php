<?php
	$user_id = $_REQUEST["user_id"];
    $user_fullname = $_REQUEST["user_fullname"];
    $user_pass = $_REQUEST["user_pass"];
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

	$sql = "SELECT id FROM users WHERE user_id='$user_id'";
	$result = mysqli_query($conn, $sql);

	if (mysqli_num_rows($result) > 0) {
	  echo "exist";
	} else {
		$sql = "INSERT INTO users (user_id, name, password, type, department) VALUES ('$user_id', '$user_fullname',md5('$user_pass'), $user_type, '$department')";

		if (mysqli_query($conn, $sql)) {
			echo "success";
		} else {
		  	echo "failure";
		}
	}

	mysqli_close($conn);

?>