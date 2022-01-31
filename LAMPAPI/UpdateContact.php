<?php

	$inData = getRequestInfo();

	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$emailAddress = $inData["emailAddress"];
	$phoneNumber = $inData["phoneNumber"];
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
		// Initial query to check if the user exist.
		$query = "SELECT * FROM Contacts WHERE ID = ?";
		$stmt = $conn->prepare($query);
		$stmt->bind_param("s", $contactId);
		$stmt->execute();

		$result = $stmt->get_result();

		// If statement checks if the contact exists.
		if (mysqli_num_rows($result) > 0)
		{
			// Get contact and update
			$query = "UPDATE Contacts SET firstName=?,lastName=?,email=?,phoneNumber=?,streetAddress=?,city=?,state=?,zip=? WHERE UserID=? AND ID=?";
			$stmt = $conn->prepare($query);
			$stmt->bind_param("ssssssssss",$firstName,$lastName,$emailAddress,$phoneNumber,$streetAddress,$city,$state,$zip,$userId,$contactId);

			$stmt->execute();

			$stmt->close();
			$conn->close();

			returnWithError(-1,"");
		}
		else
		{
			returnWithError(0,"Contact Does Not Exist");
		}
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
