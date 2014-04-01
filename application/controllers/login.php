<?php
class login extends CI_Controller {
	public $user = null;
	
	public function __construct() {
		parent::__construct();
		parse_str($_SERVER['QUERY_STRING'],$_REQUEST);
		$config = array(
			'appId'  => '694907180553170',
			'secret' => '171730b0b7c778616b69ecf0f6603a7f'
		);
		$this->load->library('facebook', $config);
		
		$this->user = $this->facebook->getUser();
	}
	
	public function index(){
		//echo $this->facebook->getLoginUrl();	
		if ($this->user){
			try {
				
				$user_profile = $this->facebook->api('/me');									                echo "<br/>";
				print_r($user_profile);
				echo $user_profile['email'];
				
			} catch(FacebookApiException $e) {
				print_r(e);
				$user = null;
			}
		}
		
		if ($this->user) {
			$logout = $this->facebook->getLogoutUrl(array("next"=>base_url().'login/logout/'));
			echo "<a href='$logout'>Logout</a>";	
		} else {
			$login = $this->facebook->getLoginUrl(array("scope"=>'email'));
			echo "<a href='$login'>Login</a>";			
		}
	}
	
	function logout(){
		session_destroy();
		redirect(base_url().'login');
		
	}
}
?>