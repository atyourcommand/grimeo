<?php
class saveModel extends CI_Model {
	function addGenre($data){ 
		extract($data);
		$this->db->select('id');
		$this->db->where('genresId', $genresId);
		$query = $this->db->get('genres'); 
		if(!$query->num_rows()){
			$this->db->query("insert into  genres  set  title =  '$title',  genresId =  '$genresId.' ");
		}
		 
	} 
	function addVideo($data){ 
  		$this->db->select('id');
		$this->db->where('movid', $data['movid']);
		$query = $this->db->get('video'); 
		if(!$query->num_rows()){
			$this->db->insert('video',$data);
		} 
	}
	function escape($data){
		$cat = unserialize (CATEGORY);  
		$ca = array_keys($cat, $data[type]);
		$key  = $ca[0]+1;
		if($key>MAX_CAT) $key = 0;
		$ctype = $CATEGORY[$key]; 
		$page = 1;  
		$chek = $this->db->query("select * from check_pointer "); 
		if($chek->num_rows()){
			$this->db->query("update check_pointer set page_num = '0', type = '".$ctype."' "); 
		}else{ 
			$this->db->query(" insert into check_pointer set page_num = '0', type = '".$ctype."'  "); 
		} 
	} 
	public function SaveMovie($data) {  
		 
		$this->db->select('id');
		$this->db->where('movid', $data['movid']);
		$chek = $this->db->get('movie'); 
		if($chek->num_rows()){
			 $r = $chek->result(); 
			 $pid = $r[0]->id;
			 $this->db->where('id',$pid);
			 $this->db->update('movie', $data);
			
		}
		else { 
			$this->db->insert('movie',$data);
			$pid = $this->db->insert_id();
		}  
		$chek = $this->db->query("SELECT * FROM check_pointer"); 
		if($chek->num_rows()) { 
			$this->db->query("UPDATE check_pointer SET page_num = '".$data['page_num']."', type = '".$data['types']."'");
		}
		else{ 
			$this->db->insert(" INSERT into check_pointer SET page_num = '".$data['page_num']."', type = '".$data['types']."' ");
		}
	}
}
?>