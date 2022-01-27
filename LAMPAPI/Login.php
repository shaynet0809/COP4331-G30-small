
<?php

	// NOTE: This file is pretty much unchanged as it seems the JS 'doLogin' method also wasn't changed

	$inData = getRequestInfo();

	$id = 0;
	$firstName = "";
	$lastName = "";

	$conn = new mysqli("localhost", "Group30", "WeLoveCOP4331", "COP4331");
	if( $conn->connect_error )
	{
		returnWithError(0, $conn->connect_error );
	}
	else
	{
		// Gets a specified user's information
		$stmt = $conn->prepare("SELECT ID,firstName,lastName FROM Users WHERE Login=? AND Password =?");
		$stmt->bind_param("ss", $inData["login"], $inData["password"]);
		$stmt->execute();
		$result = $stmt->get_result();
		
		// If the user exists in the database
		if($row = $result->fetch_assoc())
		{
			returnWithInfo($row['firstName'], $row['lastName'], $row['ID']);
		}
		else
		{
			returnWithError(0, "No Records Found");
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
		$retValue = '{"id":' . $id . ',"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
