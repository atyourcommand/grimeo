<?php  $this->load->helper('html');?>
<?php $base_url=$this->config->item('base_url'); 
$this->load->helper('category'); ?>
<?php
$pointer = category(); print_r($pointer);
?>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<title>Saving Data Here....</title>
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
<link href="css/app.css" rel="stylesheet" type="text/css">
<!--<link href="css/paging.css" media="screen" rel="stylesheet" type="text/css" />-->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
<script type="text/javascript" src="http://localhost/j/js/main.min.js"></script> 
<script type="text/javascript" src="http://localhost/j/js/jquery.async.js"></script>
</head>
<body> 
<h1>I am saving data here....</h1>
<script type="text/javascript" > 
 function savegnr(){ 
  var url = 'http://api.themoviedb.org/3/', 
	mode = 'genre/list', 
	key = '?api_key=ba5a09dba76b1c3875e487780468ef93'; 
	$.ajax({ 
	url: url + mode + key , 
	async: false,
	contentType: 'application/json',
	dataType: 'jsonp', 
	success: function (data) {  
		var list;
		 $.each(data, function(i, item) {
			if(i == "genres") { 
				da = data[i];
				$.each(da, function (j, item) { 
						gnr(item.id,item.name) 
				});
			} 
		});  
		list = list.replace("undefined", ""); 
		//alert(list);  
		}, 
	error: function (request,error) {
			//alert('Network error has occurred please try again!');
		} 
});
 }
 
 function gnr(itemid, itemname){
			var formData = {genresId:itemid,title:itemname};  
			 $.ajax({
				    url : "http://www.grimeo.com/index.php/savedata/addGenre", 
					type: "POST",
					data : formData,
					async: false,
				    success: function(data, textStatus, jqXHR){  
				    },
				    error: function (jqXHR, textStatus, errorThrown){
				 		//alert(errorThrown);
				    }
				});
 } 
   
 function getvideo($id){
	 var link;
	 var url = 'http://api.themoviedb.org/3/', 
		mode = 'movie/', 
		key = '?api_key=ba5a09dba76b1c3875e487780468ef93'; 
		$.ajax({ 
			url: url + mode + $id+'/videos'+ key , 
			async: false,
			contentType: 'application/json',
			dataType: 'jsonp', 
			success: function (data) {  
					 $.each(data, function(i, item) {
						if(i == "results") { 
							da = data[i]; 
							$.each(da, function (j, item) {  
									 saveVideoLink($id,item.key);
							});
						} 
					}); 
					 
				}, 
			error: function (request,error) {
					//alert('Network error has occurred please try again!');
				} 
		});
		 
 }
 
 function fetchmovie($id,types,page_num){ 
		var url = 'http://api.themoviedb.org/3/', 
		mode = 'movie/', 
		base_url = 'http://image.tmdb.org/t/p/w92',
		base_backdrop_url = 'http://image.tmdb.org/t/p/w780',//for images
		key = '?api_key=ba5a09dba76b1c3875e487780468ef93'; 
		$('search-output').hide();	
		$.ajax({
		  url: url + mode + $id + key,
		  dataType: 'json',
		  async: false,
		  contentType: 'application/json',
		  dataType: 'jsonp', 
		  success: function(data){
 						var list;  
						var genresid;
						if(true) {
							 $.each(data, function(i, item) {
								if(i == "genres") { 
									da = data[i];
									$.each(da, function (j, item) { 
											 genresid = item.id; 
									});
								} 
						});  
						 var actores = getactors($id); if(!actores) actores = 'NA';
						 var keywords = getkeywords($id);  if(!keywords) keywords = data.original_title;
						 
						
						  getvideo($id);
						  savemovie($id,genresid,data.original_title,data.tagline,data.overview,data.release_date,data.vote_average,data.vote_count,base_url+data.poster_path,
							base_backdrop_url+data.backdrop_path,data.popularity,types,actores,keywords,page_num);
					} else {
						alert('no record found'); 
					} 
				},
				error: function (request,error) {
				//alert('Network error has occurred please try again!');
           }
		  
		});
 
 }
 function savemovie(movid,genresid,original_title,tagline,overview,release_date,vote_average,vote_count,poster_path,backdrop_path,popularity,types,actores,keywords,page_num ){
	       
			var formData = {movid:movid,genresid:genresid,title:original_title,tagline:tagline,overview:overview,release_date:release_date,vote_average:vote_average,vote_count:vote_count,poster_path:poster_path,backdrop_path:backdrop_path,popularity:popularity,types:types,actores:actores,keywords:keywords,page_num:page_num};  
			 $.ajax({
				    url : "http://www.grimeo.com/index.php/savedata/saveMovieData", 
					type: "POST",
					data : formData,
					async: false,
				    success: function(data, textStatus, jqXHR){  //alert(data);
				    },
				    error: function (jqXHR, textStatus, errorThrown){
				 		 
				    }
				});
 }
  function saveVideoLink(movid,video){
			var formData = {movid:movid,videourl:video};  
			$.ajax({
			     url : "http://www.grimeo.com/index.php/savedata/addVideo", 
				type: "POST",
				data : formData,
				async: false,
			    success: function(data, textStatus, jqXHR){   // alert(data);
			    },
			    error: function (jqXHR, textStatus, errorThrown){
			 		//alert(errorThrown);
			    }
			});
 } 
function getdata(k,type){     
		var url = 'http://api.themoviedb.org/3/', 
		mode = 'movie/'+type, 
		key = '?api_key=ba5a09dba76b1c3875e487780468ef93&page='+k;  
		if(k==1 && type=='popular'){
			savegnr();
		}
		 $.ajax({
			url: url + mode + key, 
			async: false,
			contentType: 'application/json',
			dataType: 'jsonp', 
			success: function (data){   
					var pagenum = data.page;
					$.each(data, function(i, item) { 
						if(i == "results") { 
							da = data[i]; 
							$.each(da, function (j, item) { 
								//if(!item.id) {return false; }
								 fetchmovie(item.id,type,pagenum);  
							});
						}else{
							leaveIt(k,type);
						} 
					}); 
					
					 
			}, 
			error: function (request,error) {
				 return false;
				//alert('Network error has occurred please try again!');
			}  
		}); 
		 //return true;
	  } 
 
// GET ALL ACTORS LIST
function getactors($id){ 
			var op;
			var names = "";
			$.ajax({
				async: false,
				url: 'http://api.themoviedb.org/3/movie/'+$id+'/credits?api_key=ba5a09dba76b1c3875e487780468ef93', 
				success: function (data) {
 						$.each(data, function(i, item) {
							if(i == "cast") {
								da = data[i];
								if(da.length > 0){
									$.each(da, function (j, item) {  
										 if(item.name!="") { names += item.name+', '; }
									});
								}
							}  
						});	
						if(names.length){
							op =  names.substr(0, names.length-2);
						}
				}   
			});  
			return op.replace("undefined", "");  
 } 

 function getkeywords($id){ 
			var op;
			var names="";
			$.ajax({
				async: false,
				url: 'http://api.themoviedb.org/3/movie/'+$id+'/keywords?api_key=ba5a09dba76b1c3875e487780468ef93', 
				success: function (data) {  
						var names;
 						$.each(data, function(i, item) {
							if(i == "keywords") {
								da = data[i];
								if(da.length > 0){ 
									 $.each(da, function (j, item) {  
										 if(item.name!="") { names += item.name+', '; }
									}); 
									if(names.length){
										op =  names.substr(0, names.length-2);  
									}else{
										op = "NA";
									}
									return op.replace("undefined", "");
								}else{
									return false;
								}
							}  
						});	 
				}   
			});   
	  
 } 
function leaveIt(k,type){
	var formData = {type:type};   
		$.ajax({
		     url : "http://www.grimeo.com/index.php/savedata/leaveIt", 
			type: "POST",
			data : formData,
			async: false,
		    success: function(data, textStatus, jqXHR){   // alert(data);
		    },
		    error: function (jqXHR, textStatus, errorThrown){
		 		//alert(errorThrown);
		    }
		});
 }
 getdata('<?=$pointer[0]?>','<?=$pointer[1]?>')
</script>
</body>
</html>
