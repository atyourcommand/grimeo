#!/usr/local/bin/php
<?php include_once "db.php";  
/****************Get next page and genresId start *************/
function nextSlot($category='popular',$page_num=0){
	$next = array();
	$checkGen = mysql_query(" SELECT total_page,id  FROM tv_category where category = '$category'");
	$genDet = mysql_fetch_array($checkGen); @extract($genDet);
	if($page_num < $total_page && $page_num < 999){
		$next[page_num] = $page_num+1;
		$next[category] = $category; 
	}else{
		$mainId = $id+1;
		$nextgen = mysql_query(" SELECT category FROM tv_category where id = '$mainId'");
	    $data = mysql_fetch_array($nextgen);  
	    $next[page_num] = 1;
		$next[category] = $data[category];
	}
	return $next;
}
/****************Get next page and genresId end *************/
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
 
	$checkLastEntry = @mysql_query("select page_num,category  from tv_detail order by id desc limit 0,1");
	if(@mysql_num_rows($checkLastEntry)){
		$genDet = mysql_fetch_array($checkLastEntry);
		$next = nextSlot($genDet[category],$genDet[page_num]);
	}else{
		$next = nextSlot(); 
	}
	 
	$tvoutput  = useCurl("http://api.themoviedb.org/3/tv/".$next[category]."?api_key=ba5a09dba76b1c3875e487780468ef93&page=".$next[page_num]); 
	$tvdata = json_decode($tvoutput); 
	foreach($tvdata->results as $v){ 
		

		$tvdetail  = useCurl("http://api.themoviedb.org/3/tv/".$v->id."?api_key=ba5a09dba76b1c3875e487780468ef93"); 
		$ddata = json_decode($tvdetail);

		// echo "<pre>";print_r($ddata); die;
		foreach($ddata->languages as $lang){
			$languages .= $lang.", ";
		}
		if($languages) $languages = substr($languages,0,-2);

		foreach($ddata->origin_country as $cnt){
			$origin_country .= $cnt.", ";
		}
		if($origin_country) $origin_country = substr($origin_country,0,-2);

		foreach($ddata->production_companies as $pr){
			$production_companies .= $pr->name.", ";
		}
		if($production_companies) $production_companies = substr($production_companies,0,-2);

		$tvActors  = useCurl("http://api.themoviedb.org/3/tv/".$v->id."/credits?api_key=ba5a09dba76b1c3875e487780468ef93"); 
		$act = json_decode($tvActors); 
		 
		$actors = "";
		foreach($act->cast as $actor){ 
			$actors .= $actor->name.", ";
		} 
		if($actors) $actors = substr($actors,0,-2);

		$keywOp  = useCurl("http://api.themoviedb.org/3/tv/".$v->id."/keywords?api_key=ba5a09dba76b1c3875e487780468ef93"); 
		$key = json_decode($keywOp);
	    //  echo "<pre>";print_r($key->results); die;
		$keywords = "";
		foreach($key->results as $k){ 
			$keywords .= $k->name.", ";
		} 
		if($keywords) $keywords = substr($keywords,0,-2); 

		$query = "insert into tv_detail set tv_id = '".$v->id."',category = '".$next[category]."', page_num='".$next[page_num]."', name = '".addslashes($v->name)."',  original_name = '".addslashes($ddata->original_name)."',   backdrop_path = '".addslashes($v->backdrop_path)."', poster_path = '".addslashes($v->poster_path)."',   languages = '".$languages."', origin_country = '$origin_country', overview = '".addslashes($ddata->overview)."',popularity = '".$ddata->popularity."', production_companies  = '$production_companies', vote_average = '".$v->vote_average."', vote_count = '".$v->vote_count."', actors = '".addslashes($actors)."', keywords = '".addslashes($keywords)."',status = '".addslashes($ddata->status)."'  
		";
	    mysql_query($query) or die(mysql_error());
		foreach($ddata->genres as $value){
			$genreQry = "insert into tv_genres set  tv_id = '".$v->id."',   name = '".addslashes($value->name)."', genresId = '".addslashes($value->id)."' ";
		    mysql_query($genreQry) or die(mysql_error());
		}


		$videoOp  = useCurl("http://api.themoviedb.org/3/tv/".$v->id."/videos?api_key=ba5a09dba76b1c3875e487780468ef93"); 
		$vid = json_decode($videoOp);
		if(count($vid->results)){
			foreach($vid->results as $val){
				$videoQry = "insert into tv_video set  tv_id = '".$v->id."',   videokey = '".addslashes($val->key)."', name = '".addslashes($val->name)."', site = '".addslashes($val->site)."'";
				 mysql_query($videoQry) or die(mysql_error());
			}
		}
		 
		 
		 
		 
	}
 




?>
  
