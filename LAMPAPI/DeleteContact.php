<?php

	$inData = getRequestInfo();

	$ID = $inData["ID"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "Group30", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError(0, $conn->connect_error );
	}
	else
	{
		// Sets the query for deleting a contact based on the contact id and user id
		$query = 'DELETE FROM Contacts WHERE ID = ? AND UserID = ?;';

		// The deleting magic happens
		$stmt = $conn->prepare($query);
		$stmt->bind_param("ss", $ID, $userId);
		$stmt->execute();

		$stmt->close();
		$conn->close();

		returnWithInfo($ID, "Successfully deleted.");
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

	function returnWithInfo($id, $message)
	{
		$retValue = '{"id":' . $id . ',"message":"' . $message . '"}';
		sendResultInfoAsJson($retValue);
	}
?>
