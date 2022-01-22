<?php

	$inData = getRequestInfo();

	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$login = $inData["email"];
	$password = $inData["password"];

	$conn = new mysqli("localhost", "Group30", "WeLoveCOP4331", "COP4331");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		// Testing to see if a new user gets registered.
		// Not sure what is happening but I get a code 500 when testing this
		// API. We definitely need to debug this.

		$stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES (?,?,?,?)");
		$stmt->bind_param("ssss", $firstName, $lastName, $email, $password);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
