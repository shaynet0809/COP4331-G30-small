<?php

	$inData = getRequestInfo();

	$ID = $inData["contactId"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "Group30", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError(0, $conn->connect_error );
	}
	else
	{
		// Initial query to check if the user exist.
		$query = 'SELECT * FROM Contacts WHERE ID = ? AND UserID = ?;';

		$stmt = $conn->prepare($query);
		$stmt->bind_param("ss", $ID, $userId);
		$stmt->execute();

		$result = $stmt->get_result();

		// If statement checks if the contact exists.
		if (mysqli_num_rows($result) > 0)
		{
			// New query to delete desired contact.
			$newQuery = 'DELETE FROM Contacts WHERE ID = ? AND UserID = ?;';

			$stmt = $conn->prepare($newQuery);
			$stmt->bind_param("ss", $ID, $userId);
			$stmt->execute();

			returnWithInfo($ID, "Successfully deleted.");
		}
		// Reaches here then contact does not exist.
		else
		{
			returnWithError(0, "Does not exist");
		}

		$stmt->close();
		$conn->close();
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
