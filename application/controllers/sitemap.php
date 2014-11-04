<?php
/* 
 
 */
class Sitemap extends CI_Controller {
    //put your code here

    function index() {
       $queryMovie = $this->db->query("SELECT id, title, date(release_date) as release_date from genres_move");
	   $queryTv = $this->db->query("SELECT id, name from tv_detail");
       // 
       header("Content-Type: text/xml;charset=iso-8859-1");
       echo '<urlset xmlns="http://www.google.com/schemas/sitemap/0.84">';
       echo '<url>
				<loc>http://www.grimeo.com/#!/</loc>
				<lastmod>2014-10-30</lastmod>
				<changefreq>daily</changefreq>
				<priority>1</priority>
			</url>
			';
        
		foreach ($queryMovie->result() as $row)
			{
					//print_r($row);
					$id = $row->id;
					$title = $row->title;
					$slug = $id."/".url_title($title, 'dash', true);
					$url = "http://www.grimeo.com/#!/movie/";
					$date = date('Y-m-d',strtotime("-1 days"));
					echo
					'   <url>
						<loc>'.$url.$slug.'</loc>
						<lastmod>'.$date.'</lastmod>
						<changefreq>daily</changefreq>
						<priority>0.8</priority>
						</url>
					';
			}
		foreach ($queryTv->result() as $row)
			{
					//print_r($row);
					$id = $row->id;
					$title = $row->name;
					$slug = $id."/".url_title($title, 'dash', true);
					$url = "http://www.grimeo.com/#!/tv/";
					$date = date('Y-m-d',strtotime("-1 days"));
					echo
					'   <url>
						<loc>'.$url.$slug.'</loc>
						<lastmod>'.$date.'</lastmod>
						<changefreq>daily</changefreq>
						<priority>0.8</priority>
						</url>
					';
			}	
		
		echo '</urlset>';
	}
		
			
}
?>