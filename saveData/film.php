#!/usr/local/bin/php
<?php include_once "db.php";
//mail("sanjay.vns1987@gmail.com",'Run at'.date("H:i:s"),"Done");
function useCurl($url){
	// OK cool - then let's create a new cURL resource handle
    $ch = curl_init();
 
    // Now set some options (most are optional)
 
    // Set URL to download
    curl_setopt($ch, CURLOPT_URL, $url);
 
    // Set a referer
    curl_setopt($ch, CURLOPT_REFERER, $url);
 
    // User agent
    curl_setopt($ch, CURLOPT_USERAGENT, "MozillaXYZ/1.0");
 
    // Include header in result? (0 = yes, 1 = no)
    curl_setopt($ch, CURLOPT_HEADER, 0);
 
    // Should cURL return or print out the data? (true = return, false = print)
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
 
    // Timeout in seconds
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
 
    // Download the given URL, and return output
    $output = curl_exec($ch);
	
    // Close the cURL resource, and free system resources
    curl_close($ch);
	return $output;
}
/***************** Fetch All genre Start *****************/
$checkforgen = mysql_query('select * from genres');
$getDbgen = mysql_num_rows($checkforgen);
if($getDbgen>35 || $getDbgen==0){
	$output  = useCurl("http://api.themoviedb.org/3/genre/list?api_key=ba5a09dba76b1c3875e487780468ef93"); 
	$data = json_decode($output);
	//echo"<pre>"; print_r($data->genres);die;
	$count_genres =  count($data->genres);
	$checkforgen = mysql_query('select * from genres');

	if($count_genres!=$getDbgen){
		$i = 0;
		foreach($data->genres as $val){ 
			$checkforgen = mysql_query("select * from genres where genresId = '".$val->id."'");
			if(!mysql_num_rows($checkforgen)){
				$output2  = useCurl("http://api.themoviedb.org/3/genre/".$val->id."/movies?api_key=ba5a09dba76b1c3875e487780468ef93&page=1"); 
				$data2 = json_decode($output2);
				mysql_query("insert into genres set genresId = '".$val->id."', title =  '".$val->name."',total_results = '".$data2->total_results."', total_pages =  '".$data2->total_pages."'   ");
				$i++;
			}
			 
		}
		echo " $i record inserted!";
		/***************** Fetch All genre End *****************/
	}
}

/****************Get next page and genresId start *************/
function nextSlot($genresId,$page_num){
	$next = array();
	$checkGen = mysql_query(" SELECT total_pages,id FROM genres where genresId = '$genresId'");
	$genDet = mysql_fetch_array($checkGen); extract($genDet);
	if($page_num < $total_pages){
		$next[page_num] = $page_num+1;
		$next[genresId] = $genresId;
	}else{
		$mainId = $id+1;
		$nextgen = mysql_query(" SELECT genresId FROM genres where id = '$mainId'");
	    $data = mysql_fetch_array($nextgen);  
	    $next[page_num] = 1;
		$next[genresId] = $data[genresId];
	}
	return $next;
}
/****************Get next page and genresId end *************/

/*****************   keywords  Fetch All Movie from Gener Start *****************/




$checkforgen = mysql_query("select genresId,page_num  from genres_move order by id desc limit 0,1");
$getDbgen = mysql_num_rows($checkforgen);
if(!$getDbgen){
	$page_num = 1;
	$checkGen = mysql_query(" SELECT * FROM `genres` order by id asc limit 0,1");
	$genDet = mysql_fetch_array($checkGen);
	$output  = useCurl("http://api.themoviedb.org/3/genre/".$genDet[genresId]."/movies?api_key=ba5a09dba76b1c3875e487780468ef93&page=".$page_num); 
	$data = json_decode($output);
   //   echo"<pre>"; print_r($data->results); 

	foreach($data->results as $v){ 
		$output2  = useCurl("http://api.themoviedb.org/3/movie/".$v->id."?api_key=ba5a09dba76b1c3875e487780468ef93"); 
		$data2 = json_decode($output2);
		
		$actoresOp  = useCurl("http://api.themoviedb.org/3/movie/".$v->id."/credits?api_key=ba5a09dba76b1c3875e487780468ef93"); 
		$act = json_decode($actoresOp);
		$actors = "";
		foreach($act->cast as $actor){ 
			$actors .= $actor->name.", ";
		} 
		if($actors) $actors = substr($actors,0,-2);

		$keywOp  = useCurl("http://api.themoviedb.org/3/movie/".$v->id."/keywords?api_key=ba5a09dba76b1c3875e487780468ef93"); 
		$key = json_decode($keywOp);
	   
		$keywords = "";
		foreach($key->keywords as $k){ 
			$keywords .= $k->name.", ";
		} 
		if($keywords) $keywords = substr($keywords,0,-2);

		$videoOp  = useCurl("http://api.themoviedb.org/3/movie/".$v->id."/videos?api_key=ba5a09dba76b1c3875e487780468ef93"); 
		$vid = json_decode($videoOp);
		if(count($vid->results)){
			foreach($vid->results as $val){
				$videoQry = "insert into video set  mov_id = '".$v->id."',   videokey = '".addslashes($val->key)."', name = '".addslashes($val->name)."', site = '".addslashes($val->site)."'";
				mysql_query($videoQry) or die(mysql_error());
			}
		}
		$query = "insert into genres_move set page_num='$page_num', genresId = '".$genDet[genresId]."',  adult = '".$v->adult."', backdrop_path = '".addslashes($v->backdrop_path)."',mov_id = '".$v->id."', original_title = '".addslashes($v->original_title)."', release_date = '".$v->release_date."',  poster_path = '".addslashes($v->poster_path)."', popularity = '".$v->popularity."', title = '".addslashes($v->title)."', vote_average = '".$v->vote_average."', vote_count = '".$v->vote_count."', overview = '".addslashes($data2->overview)."', budget = '".addslashes($data2->budget)."', status = '".addslashes($data2->status)."', tagline = '".addslashes($data2->tagline)."', actors = '".addslashes($actors)."', keywords = '".addslashes($keywords)."'
		 ";
		mysql_query($query) or die(mysql_error());
		 
	}
}else{ 
    
	$lastMov = mysql_query(" SELECT page_num,genresId  FROM genres_move order by id desc limit 0,1");
	$lastDet = mysql_fetch_array($lastMov); 
	$next = nextSlot($lastDet[genresId],$lastDet[page_num]); 
    $output  = useCurl("http://api.themoviedb.org/3/genre/".$next[genresId]."/movies?api_key=ba5a09dba76b1c3875e487780468ef93&page=".$next[page_num]); 
	$data = json_decode($output);
   //echo"<pre>"; print_r($data->results);  
	foreach($data->results as $v){ 
		$output2  = useCurl("http://api.themoviedb.org/3/movie/".$v->id."?api_key=ba5a09dba76b1c3875e487780468ef93"); 
		$data2 = json_decode($output2);
		
		$actoresOp  = useCurl("http://api.themoviedb.org/3/movie/".$v->id."/credits?api_key=ba5a09dba76b1c3875e487780468ef93"); 
		$act = json_decode($actoresOp);
		$actors = "";
		foreach($act->cast as $actor){ 
			$actors .= $actor->name.", ";
		} 
		if($actors) $actors = substr($actors,0,-2);

		$keywOp  = useCurl("http://api.themoviedb.org/3/movie/".$v->id."/keywords?api_key=ba5a09dba76b1c3875e487780468ef93"); 
		$key = json_decode($keywOp);
	   
		$keywords = "";
		foreach($key->keywords as $k){ 
			$keywords .= $k->name.", ";
		} 
		if($keywords) $keywords = substr($keywords,0,-2);

		$videoOp  = useCurl("http://api.themoviedb.org/3/movie/".$v->id."/videos?api_key=ba5a09dba76b1c3875e487780468ef93"); 
		$vid = json_decode($videoOp);
		if(count($vid->results)){
			foreach($vid->results as $val){
				$videoQry = "insert into video set  mov_id = '".$v->id."',   videokey = '".addslashes($val->key)."', name = '".addslashes($val->name)."', site = '".addslashes($val->site)."'";
				mysql_query($videoQry) or die(mysql_error());
			}
		}
		$query = "insert into genres_move set page_num ='".$next[page_num]."', genresId = '".$next[genresId]."',  adult = '".$v->adult."', backdrop_path = '".addslashes($v->backdrop_path)."',mov_id = '".$v->id."', original_title = '".addslashes($v->original_title)."', release_date = '".$v->release_date."',  poster_path = '".addslashes($v->poster_path)."', popularity = '".$v->popularity."', title = '".addslashes($v->title)."', vote_average = '".$v->vote_average."', vote_count = '".$v->vote_count."', overview = '".addslashes($data2->overview)."', budget = '".addslashes($data2->budget)."', status = '".addslashes($data2->status)."', tagline = '".addslashes($data2->tagline)."', actors = '".addslashes($actors)."', keywords = '".addslashes($keywords)."'
		 ";
		mysql_query($query) or die(mysql_error());
		 
	} 

}

 
/***************** Fetch All Movie from Gener Start *****************/ 




?>
  
