<?php

	$inData = getRequestInfo();

	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$login = $inData["login"];
	$password = $inData["password"];

	$conn = new mysqli("localhost", "Group30", "WeLoveCOP4331", "COP4331");

	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		/*	
		*	Username and Field verification is finished and returns with 200. 
		*	This section should be finished.
		*/
		
		// Determines if a field is incomplete
		if (fieldsAreValid($firstName, $lastName, $login, $password))
		{
			// Gets all users with a specified username
			$stmt = $conn->prepare("SELECT Login FROM Users WHERE Login=?");
			$stmt->bind_param("s", $login);
			$stmt->execute();
			$result = $stmt->get_result();

			// If a username already exists
			if (mysqli_num_rows($result) > 0)
			{
				returnWithError("Username Already Exists");
			}
			else
			{
				// Inserts unique user into database
				$stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES (?,?,?,?)");
				$stmt->bind_param("ssss", $firstName, $lastName, $login, $password);
				$stmt->execute();

				returnWithError("");
			}

			$stmt->close();
			$conn->close();
		}
		else
		{
			returnWithError("One or More Fields Incomplete");
		}
	}

	function fieldsAreValid($firstName, $lastName, $login, $password)
	{
		if (strcmp($firstName, "") == 0)
			return false;

		if (strcmp($lastName, "") == 0)
			return false;

		if (strcmp($login, "") == 0)
			return false;

		if (strcmp($password, "") == 0)
			return false;

		return true;
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

	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
