<?php

	$inData = getRequestInfo();

	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$login = $inData["login"];
	$password = $inData["password"];

	$conn = new mysqli("localhost", "Group30", "WeLoveCOP4331", "COP4331");

	if ($conn->connect_error)
	{
		returnWithError(0, $conn->connect_error );
	}
	else
	{
		/*	
		*	Username and Field verification is finished and returns with 200. 
		*	This section should be finished.
		*/
		
		// Gets all users with a specified username
		$stmt = $conn->prepare("SELECT Login FROM Users WHERE Login=?");
		$stmt->bind_param("s", $login);
		$stmt->execute();
		$result = $stmt->get_result();

		// If a username already exists
		if (mysqli_num_rows($result) > 0)
		{
			returnWithError(0, "Username Already Exists");
		}
		else
		{
			// Inserts unique user into database
			$stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES (?,?,?,?)");
			$stmt->bind_param("ssss", $firstName, $lastName, $login, $password);
			$stmt->execute();

			returnWithError(-1, "");
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

	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
