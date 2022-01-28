<?php

	$inData = getRequestInfo();

	$searchResults = "";
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
		$query .= " FROM Contacts WHERE firstName like ? and UserID=?";
		//$stmt = $conn->prepare("SELECT firstName,lastName,email,phoneNumber,streetAddress,city,state,zip");
		$stmt = $conn->prepare($query);
		//$stmt = $conn->prepare("select firstName from Contacts where firstName like ? and UserID=?");
		$firstName = "%" . $inData["search"] . "%";
		$stmt->bind_param("ss", $firstName, $inData["userId"]);
		$stmt->execute();

		$result = $stmt->get_result();
		$resultArray = array();

		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}

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
			//$searchResults .= '"' . $row["firstName"] . '"';
		}

		if( $searchCount == 0 )
		{
			returnWithError(0, "No Records Found" );
		}
		else
		{
			returnWithArray($resultArray);
			//returnWithInfo( $searchResults );
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

	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"id":-1,"error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>
