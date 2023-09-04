<?php

	$user_id = $_REQUEST["user_id"];
	$user_pass = md5($_REQUEST["user_pass"]);

	$servername = "localhost";
	$username = "root";
	$password = "";
	$database ="std_req_manager";

	$conn = mysqli_connect($servername, $username, $password, $database);

	if (!$conn) {
  		die("Connection failed: " . mysqli_connect_error());
	}

	$sql = "SELECT * FROM users WHERE user_id='$user_id'";
	$result = mysqli_query($conn, $sql);

	if (mysqli_num_rows($result) > 0) {
	  	// check user
		$user = mysqli_fetch_assoc($result);
		if ($user["password"] == $user_pass) {
			echo "success";
		} else {
			echo "password";
		}
	} else {
	  echo "no exist";
	}

?>