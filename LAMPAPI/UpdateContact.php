<?php

	$inData = getRequestInfo();

	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phoneNumber = $inData["phoneNumber"];
	$emailAddress = $inData["emailAddress"];
	$streetAddress = $inData["streetAddress"];
	$city = $inData["city"];
	$state = $inData["state"];
	$zip = $inData["zip"];

	$userId = $inData["userId"];
	$contactId = $inData["contactId"];

	$conn = new mysqli("localhost", "Group30", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError(0, $conn->connect_error );
	}
	else
	{
		//$query = "UPDATE Contacts SET firstName='". $firstName ."' WHERE ID='". $contactId ."'";
		// Get contact and update
		$query = "UPDATE Contacts SET firstName=?,lastName=?,phoneNumber=?,email=?,streetAddress=?,city=?,state=?,zip=? WHERE UserID=?,ID=?";
		$stmt = $conn->prepare($query);
		$stmt->bind_param("ssssssssss",$firstName,$lastName,$emailAddress,$phoneNumber,$streetAddress,$city,$state,$zip,$userId,$contactId);

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

	function returnWithError( $id,  $err )
	{
		$retValue = '{"id":' . $id . ',"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
