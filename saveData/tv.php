#!/usr/local/bin/php 
<?php include_once "db.php";   
/****************Get tv *************/
$next = checkTvPointer();  
//mail("sanjay.vns1987@gmail.com","$next[category] and $next[page_num]"," $next[category] and $next[page_num] ");
$tvoutput  = useCurl("http://api.themoviedb.org/3/tv/".$next[category]."?api_key=ba5a09dba76b1c3875e487780468ef93&page=".$next[page_num]); 
$tvdata = json_decode($tvoutput); 
if(count($tvdata->results)){
	foreach($tvdata->results as $v){  
			$tvdetail  = useCurl("http://api.themoviedb.org/3/tv/".$v->id."?api_key=ba5a09dba76b1c3875e487780468ef93"); 
			$ddata = json_decode($tvdetail);
			$languages = "";
			foreach($ddata->languages as $lang){
				$languages .= $lang.", ";
			}
			if($languages) $languages = substr($languages,0,-2);

			$checkQry = mysql_query("select id from tv_detail where tv_id = '".$v->id."' ");
			$checkCount = mysql_num_rows($checkQry);
			if($checkCount){  
				$query = " update tv_detail set  languages = '".$languages."', popularity = '".$ddata->popularity."',   vote_average = '".$v->vote_average."', vote_count = '".$v->vote_count."',  status = '".addslashes($ddata->status)."'   where tv_id = '".$v->id."' ";
				 mysql_query($query) or die(mysql_error());
			}else{  
				
				$origin_country = "";
				foreach($ddata->origin_country as $cnt){
					$origin_country .= $cnt.", ";
				}
				if($origin_country) $origin_country = substr($origin_country,0,-2);
				$production_companies = "";
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
		} 
}
 
/***************** Fetch tv end *****************/  


 
?>
  
