#!/usr/local/bin/php
<?php include_once "db.php";
 

/***************** Fetch All Movie genre Start *****************/
 
$output  = useCurl("http://api.themoviedb.org/3/genre/list?api_key=ba5a09dba76b1c3875e487780468ef93"); 
$data = json_decode($output);
//echo"<pre>"; print_r($data->genres);die;
 
 
	 foreach($data->genres as $val){   
				$ch  = curl_init("http://api.themoviedb.org/3/genre/".$val->id."/movies?api_key=ba5a09dba76b1c3875e487780468ef93");  
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
				$output = curl_exec($ch);
				$json=json_decode($output,true); 
				$checkforgen2 = mysql_query("select genresId from genres where genresId = '".$val->id."'");
			    if(!mysql_num_rows($checkforgen2)){ 
					mysql_query("insert into genres set genresId = '".$val->id."', title =  '".$val->name."',total_results = '".$json[total_results]."', total_pages =  '".$json[total_pages]."'   ");
			    }else{
					mysql_query("update genres total_results = '".$json[total_results]."', total_pages =  '".$json[total_pages]."' where genresId = '".$val->id."'   ");
				} 
			 
	 }
/***************** Fetch All genre End *****************/      


/***************** Update all Category TV Pages *****************/
 
  
$ch  = curl_init("http://api.themoviedb.org/3/tv/popular?api_key=ba5a09dba76b1c3875e487780468ef93");  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
$output = curl_exec($ch);
$json=json_decode($output,true);   
mysql_query("update tv_category set  total_page =  '".(int)$json[total_pages]."' where category = 'popular'");   


$ch  = curl_init("http://api.themoviedb.org/3/tv/latest?api_key=ba5a09dba76b1c3875e487780468ef93");  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
$output = curl_exec($ch);
$json=json_decode($output,true);   
mysql_query("update tv_category set  total_page =  '".(int)$json[total_pages]."' where category = 'latest'");   



$ch  = curl_init("http://api.themoviedb.org/3/tv/top_rated?api_key=ba5a09dba76b1c3875e487780468ef93");  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
$output = curl_exec($ch);
$json=json_decode($output,true);   
mysql_query("update tv_category set  total_page =  '".(int)$json[total_pages]."' where category = 'top_rated'");   


$ch  = curl_init("http://api.themoviedb.org/3/tv/airing_today?api_key=ba5a09dba76b1c3875e487780468ef93");  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
$output = curl_exec($ch);
$json=json_decode($output,true);   
mysql_query("update tv_category set  total_page =  '".(int)$json[total_pages]."' where category = 'airing_today'");   


$ch  = curl_init("http://api.themoviedb.org/3/tv/on_the_air?api_key=ba5a09dba76b1c3875e487780468ef93");  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
$output = curl_exec($ch);
$json=json_decode($output,true);   
mysql_query("update tv_category set  total_page =  '".(int)$json[total_pages]."' where category = 'on_the_air'");   



		 
 
/***************** Update all Popular TV Pages *****************/     
?>
  
