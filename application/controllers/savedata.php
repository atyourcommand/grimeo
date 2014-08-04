<?php
class SaveData extends CI_Controller {
	public function __construct() {
		parent::__construct();
		$this->load->model('savemodel'); 
		//$this->load->helper('category'); 
	}
	public function index(){
		
		 $this->load->view('crone');
		 
	}
	public function addVideo(){
					$data = array(
					'movid'	=> $this->input->post('movid'),
					'videourl' => $this->input->post('videourl') 
			);
		    $this->savemodel->addVideo($data);
	}
	public function addGenre(){
					$data = array(
					'title'	=> $this->input->post('title'),
					'genresId' => $this->input->post('genresId') 
			);
		    $this->savemodel->addGenre($data);
	}
	public function leaveIt(){
					$data = array(
					'type'	=> $this->input->post('type') 
			);
		    $this->savemodel->escape($data);
	}
	public function saveMovieData() {
		$data = array(
				'movid' => $this->input->post('movid'),
				'genresId'	    => $this->input->post('genresid'), 
				'title'	        => $this->input->post('title'),
				'tagline'	    => $this->input->post('tagline'),
				'overview'	    => $this->input->post('overview'),
				'release_date'	=> $this->input->post('release_date'),
				'vote_average'	=> $this->input->post('vote_average'),
				'vote_count'	=> $this->input->post('vote_count'),
				'poster_path'	=> $this->input->post('poster_path'),
				'types'			=> $this->input->post('types'),
				'actores'	    => $this->input->post('actores'),
				'keywords'	    => $this->input->post('keywords'),
				'page_num'	    => $this->input->post('page_num'),
				'backdrop_path'	=> $this->input->post('backdrop_path') 
			);
			$this->savemodel->SaveMovie($data);
			
	}
	
	 
	
}
?>