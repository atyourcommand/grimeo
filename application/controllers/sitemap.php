<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of sitemap
 *
 * @author Mr. Upale
 */
class Sitemap extends CI_Controller {
    //put your code here

    function index() {
       $query = $this->db->query("SELECT id, title, date(release_date) as release_date from movie");
       // 
       header("Content-Type: text/xml;charset=iso-8859-1");
       echo '<urlset xmlns="http://www.google.com/schemas/sitemap/0.84">';
       
        foreach ($query->result() as $row)
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
		
				echo '</urlset>';
			}
}
?>