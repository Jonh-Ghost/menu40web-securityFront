<?php
	/*$prueba = json_decode($_POST);*/
	
	$json = file_get_contents('php://input');
	$obj = json_decode($json);
    $servername = "68.183.171.110:3306";
    $database = "restaurantes_db";
    $username = "restaurant_dev";
    $password = "$Password01.";
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $database);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    echo "Connected successfully";
    mysqli_close($conn);
	
    //realiza una concsulta a MYSQ
    $query = "selec * from ADMINISTRADOR";

    $result = mysqli_query($conn, $query) or die('Consulta fallida: ' . mysql_error());

    $resultData = array("id_administrador"=>mysqli_insert_id($link));
	echo json_encode($resultData);

//	// Realizar una consulta MySQL
//	$query = "insert into usuario(nombre, apellido, email, medio, newsletter) values ('$obj->nombre', '$obj->apellido', '$obj->email','$obj->medio', '$obj->newsletter')";
//
//
//	$result = mysqli_query($link, $query) or die('Consulta fallida: ' . mysql_error());
//
//	
//	$resultData = array("id"=>mysqli_insert_id($link));
//
//	echo json_encode($resultData);
?>