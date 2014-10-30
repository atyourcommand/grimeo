#!/usr/local/bin/php
<?php include_once "db.php";
 

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

 
/*****************   keywords  Fetch All Movie from Gener Start *****************/

$next = checkMovPointer();
//mail("sanjay.vns1987@gmail.com","$next[genresId] and $next[page_num]"," $next[genresId] and $next[page_num] ");
$output  = useCurl("http://api.themoviedb.org/3/genre/".$next[genresId]."/movies?api_key=ba5a09dba76b1c3875e487780468ef93&page=".$next[page_num]); 
$data = json_decode($output);
if(count($data->results)){
	foreach($data->results as $v){ 
		$output2  = useCurl("http://api.themoviedb.org/3/movie/".$v->id."?api_key=ba5a09dba76b1c3875e487780468ef93"); 
		$data2 = json_decode($output2);
		$checkQry = mysql_query("select id from genres_move where mov_id = '".$v->id."' ");
		$checkCount = mysql_num_rows($checkQry);
		if($checkCount){  
			$query = "update genres_move set popularity = '".$v->popularity."',  vote_average = '".$v->vote_average."', vote_count = '".$v->vote_count."', status = '".addslashes($data2->status)."'   where mov_id = '".$v->id."' ";
		     mysql_query($query) or die(mysql_error());
		}else{ 
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
}
 
  

?>
  
