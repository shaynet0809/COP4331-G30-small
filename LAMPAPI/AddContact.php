<?php
	$inData = getRequestInfo();

	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phoneNumber = $inData["phoneNumber"];
	$emailAddress = $inData["emailAddress"];
	$streetAddress = $inData["streetAddress"];
	$city = $inData["city"];
	$state = $inData["state"];
	$zip = $inData["zipCode"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "Group30", "WeLoveCOP4331", "COP4331"); 	
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		//$query = "INSERT into Contacts (firstName,lastName,email,phoneNumber,streetAddress,city,state,zip,UserID) VALUES (?,?,?,?,?,?,?,?,?)";
		// Create query
		$query = "INSERT into Contacts";
		$query .= " (firstName,lastName,email,phoneNumber,streetAddress,city,state,zip,UserID)";
		$query .= " VALUES (?,?,?,?,?,?,?,?,?)";

		// Add contact
		$stmt = $conn->prepare($query);
		$stmt->bind_param("sssssssss", $firstName, $lastName,$emailAddress,$phoneNumber,$streetAddress,$city,$state,$zip,$userId);
		$stmt->execute();

		$stmt->close();
		$conn->close();

		returnWithError(-1,"");
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

	function returnWithError($id,  $err )
	{
		$retValue = '{"id":' . $id . ',"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
