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

	$sql = "SELECT users.name as user_name, users.user_id, requests.content, users.department, Date(created_at) as dt FROM users INNER JOIN requests ON users.id = requests.u_id WHERE requests.id = $req_id";
	// echo $sql; exit()
	$result = mysqli_query($conn, $sql);
	$request = mysqli_fetch_assoc($result);
	echo json_encode($request);
	$user_name = $request["user_name"];
	$user_id = $request["user_id"];
	$department = $request["department"];
	$text = $request["content"];
	$date = new DateTime($request["dt"]);
	$date = $date->format('d-m-Y');

	require_once(dirname(__FILE__).'/TCPDF-main/tcpdf.php');

	$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

	// Set document properties
	$pdf->SetCreator('Your Name');
	$pdf->SetAuthor('Your Author');
	$pdf->SetTitle('Your Title');
	$pdf->SetSubject('Your Subject');
	$pdf->SetKeywords('keyword1, keyword2, keyword3');

	// Add a page
	$pdf->AddPage();

	// Set font
	$pdf->SetFont('times', '', 12);
	$pdf->SetTextColor(0, 0, 0);

	// Add content to the PDF
	$content = "\n\n\nPastaza, [$date]\n\n";
	$content .= "Director(a)\n";
	$content .= "$department\n";
	$content .= "Presente\n\n\n";
	$content .= "De mi consideración:\n\n";
	$content .= "Yo, … [$user_name]……  con C.I. …[$user_id].. \n";
	$content .= "$text \n\n";
	$content .= "Atentamente.\n\n";
	$content .= "\n";

	$pdf->MultiCell(0, 10, $content);

	// Generate the PDF content
	$pdfContent = $pdf->Output('filename.pdf', 'S');

	// Set the appropriate headers for download
	header('Content-Type: application/pdf');
	header('Content-Disposition: attachment; filename="download.pdf"');

	// Output the PDF content
	echo $pdfContent;
?>