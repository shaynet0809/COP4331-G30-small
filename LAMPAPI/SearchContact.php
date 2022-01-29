<?php

	$inData = getRequestInfo();

	$searchCount = 0;

	$conn = new mysqli("localhost", "Group30", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError(0, $conn->connect_error );
	}
	else
	{
		// This does allow for search right now. Need to modify to display not
		// just name but last name, email, etc.

		$query = "SELECT firstName,lastName,email,phoneNumber,streetAddress,city,state,zip,ID,UserID";
		$query .= " FROM Contacts WHERE ((firstName like ?) or (lastName like ?)) and UserID=?";

		$stmt = $conn->prepare($query);
		$firstName = "%" . $inData["search"] . "%";
		$lastName = "%" . $inData["search"] . "%";
		$stmt->bind_param("sss", $firstName, $lastName, $inData["userId"]);
		$stmt->execute();

		$result = $stmt->get_result();
		$resultArray = array();

		while($row = $result->fetch_assoc())
		{
			$resultArray[$searchCount] = array(
				"firstName" => $row["firstName"],
				"lastName" => $row["lastName"],
				"emailAddress" => $row["email"],
				"phoneNumber" => $row["phoneNumber"],
				"streetAddress" => $row["streetAddress"],
				"city" => $row["city"],
				"state" => $row["state"],
				"zip" => $row["zip"],
				"contactId" => $row["ID"],
				"userId" => $row["UserID"]
			);

			$searchCount++;
		}

		if( $searchCount == 0 )
		{
			returnWithError(0, "No Records Found" );
		}
		else
		{
			returnWithArray($resultArray);
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

	function returnWithError( $id,  $err )
	{
		$retValue = '{"id":' . $id . ',"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithArray( $searchResultArray )
	{
		$json = json_encode($searchResultArray, JSON_PRETTY_PRINT);
		$retValue = '{"results":' . $json . ',"id":-1,"error":""}';
		//echo ;
		sendResultInfoAsJson( $retValue );
	}
?>
