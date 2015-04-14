<?php 
//$DB = "bhagdwtt_crone";
//$USER = 'bhagdwtt_crone';
//$PASS = 'Tech@123';
$DB = "332057_app";
$USER = '332057_admin';
$PASS = 'fdn3Fj5eZ6';
$SERVER = 'mysql51-098.wc1.ord1.stabletransit.com';  
//$SERVER = "localhost";
$con = mysql_connect($SERVER,$USER,$PASS)or die(mysql_error()); 
mysql_select_db($DB,$con)or die(mysql_error());  
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
function checkMovPointer(){
	$checkPointer = mysql_query('select * from pointer');
	if(mysql_num_rows($checkPointer)){ 
		$lastPoint = mysql_query("SELECT mov_genresId,mov_page_num FROM pointer ");
		$rs = mysql_fetch_array($lastPoint); @extract($rs); 

		$checkGen = mysql_query("SELECT genresId,id,total_pages FROM genres where genresId= '$mov_genresId' ");
		$genDet = mysql_fetch_array($checkGen); @extract($genDet); 

		if($mov_page_num>=1000){
			$newpage = 1;
			$new = $id+1;
			$newGen = mysql_query("SELECT genresId FROM genres where id= '$new' ");
			if(!mysql_num_rows($newGen)){
				$newGen = mysql_query("SELECT genresId FROM genres order by id asc limit 0,1 ");
			} 
			$newrs = mysql_fetch_array($newGen); @extract($newrs); 
			mysql_query("update pointer set mov_genresId ='$genresId',mov_page_num='$newpage' ");
			$next[page_num] = $newpage;
			$next[genresId] = $genresId;
			return $next;
		}

		if($total_pages>$mov_page_num){
			$newpage = $mov_page_num+1;
			mysql_query("update pointer set mov_genresId ='$genresId',mov_page_num='$newpage' ");
			$next[page_num] = $newpage;
			$next[genresId] = $genresId;
			return $next;
		}
		
		if($total_pages==$mov_page_num){
			$new = $id+1;   
			$newGen = mysql_query("SELECT genresId,total_pages FROM genres where id= '$new' ");
			if(!mysql_num_rows($newGen)){
				$newGen = mysql_query("SELECT genresId FROM genres order by id asc limit 0,1 ");
			} 
		    $newrs = mysql_fetch_array($newGen); @extract($newrs); 
			if($total_pages>0){
				mysql_query("update pointer set mov_genresId ='$genresId',mov_page_num='1' ");
				$next[page_num] = 1;
				$next[genresId] = $genresId;
				return $next;
			
			}else{
				$newGen = mysql_query("SELECT genresId,total_pages FROM genres where total_pages>0 and id >'$new' order by id asc limit 1   ");
				$newrs = mysql_fetch_array($newGen); @extract($newrs); 
				mysql_query("update pointer set mov_genresId ='$genresId',mov_page_num='1' ");
				$next[page_num] = 1;
				$next[genresId] = $genresId;
				return $next;
			} 
		}  
	}else{ 
		$checkGen = mysql_query("SELECT genresId FROM genres order by id asc limit 0,1 ");
		$genDet = mysql_fetch_array($checkGen); @extract($genDet); 
		mysql_query("insert into pointer set mov_genresId ='$genresId',mov_page_num='1' ");
		$next[page_num] = 1;
		$next[genresId] = $genresId;
		return $next;
	}
	
} 
function checkTvPointer(){
	$checkPointer = mysql_query('select tv_page_num,tv_category from pointer');
	if(mysql_num_rows($checkPointer)){  
		$rs = mysql_fetch_array($checkPointer); @extract($rs);  
		if($tv_category==''|| $tv_page_num==0){
			mysql_query("update pointer set tv_category ='popular',tv_page_num='1' ");
			$next[page_num] = 1;
			$next[category] = 'popular';
			return $next;
		}
		$checkGen = mysql_query(" SELECT total_page,id  FROM tv_category where category = '$tv_category'");
		$genDet = mysql_fetch_array($checkGen); @extract($genDet);
		if($tv_page_num>=$total_page){ 
			$new = $id+1;   
			$newGen = mysql_query("SELECT total_page,category FROM tv_category where id= '$new' ");
			if(!mysql_num_rows($newGen)){
				$newGen = mysql_query("SELECT tv_page_num,tv_category FROM tv_category order by id asc limit 1 ");
			} 
			 $rst = mysql_fetch_array($newGen); @extract($rst);
			 mysql_query("update pointer set tv_category ='$category',tv_page_num='1' ");
			 $next[page_num] = 1;
			 $next[category] = $category;
			return $next;
		}
		
		if($tv_page_num>=1000){ 
			$new = $id+1;   
			$newGen = mysql_query("SELECT total_page,category FROM tv_category where id= '$new' ");
			if(!mysql_num_rows($newGen)){
				$newGen = mysql_query("SELECT tv_page_num,tv_category FROM tv_category order by id asc limit 1 ");
			} 
			 $rst = mysql_fetch_array($newGen); @extract($rst);
			 mysql_query("update pointer set tv_category ='$category',tv_page_num='1' ");
			 $next[page_num] = 1;
			 $next[category] = $category;
			return $next;
		}

		if($total_page>$tv_page_num){ 
			$newpage = $tv_page_num+1;
			mysql_query("update pointer set tv_category ='$tv_category',tv_page_num='$newpage' ");
			$next[page_num] = $newpage;
			$next[category] = $tv_category;
			return $next;
		}
		if($total_page==$tv_page_num){  
			$new = $id+1;   
			$newGen = mysql_query("SELECT total_page,category FROM tv_category where id= '$new' ");
			if(!mysql_num_rows($newGen)){
				$newGen = mysql_query("SELECT total_page,category FROM tv_category order by id asc limit 0,1 ");
			} 
		    $newrs = mysql_fetch_array($newGen); @extract($newrs); 
			if($total_page>0){
				mysql_query("update pointer set tv_category ='$category', tv_page_num='1' ");
				$next[page_num] = 1;
				$next[category] = $category;
				return $next;
			
			}else{
				$newGen = mysql_query("SELECT total_page,category FROM tv_category where total_page>0 and id >'$new' order by id asc limit 1   ");
				$newrs = mysql_fetch_array($newGen); @extract($newrs); 
				mysql_query("update pointer set tv_category ='$category',tv_page_num='1' ");
				$next[page_num] = 1;
				$next[category] = $category;
				return $next;
			} 
		} 

	}else{
		mysql_query("update pointer set tv_category ='$category', tv_page_num='1' ");
		$next[page_num] = 1;
		$next[category] = $category;
		return $next;
	}
}
?>
 