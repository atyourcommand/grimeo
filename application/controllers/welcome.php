<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
//require_once APPPATH.'/libraries/facebook/facebook.php';
class Welcome extends CI_Controller {
	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	 
	public function __construct()
	{
		parent::__construct();
		parse_str($_SERVER['QUERY_STRING'],$_REQUEST);
		$this->load->library('session');
		$this->config->load('facebook');
		$config = array(
			'appId'  => '694907180553170',
			'secret' => '171730b0b7c778616b69ecf0f6603a7f'
		);
		$this->load->library('facebook', $config);   
		$this->user = $this->facebook->getUser();
	} 
	public function index()
	{
		$this->load->view('index');
		$this->load->view('footer');
		
		if ($this->user){
			try {
				
				$user_profile = $this->facebook->api('/me');									                //echo "<br/>";
				//print_r($user_profile);
				//echo $user_profile['email'];
				
			} catch(FacebookApiException $e) {
				print_r($e);
				$user = null;
			}
		}
	}
	function logout(){
		$base_url=$this->config->item('base_url');
		$this->session->sess_destroy();
		header('Location: '.$base_url);
	}
	function fblogin(){
		$base_url=$this->config->item('base_url');
			
		$facebook = new Facebook(array(
		'appId'		=>  $this->config->item('appID'),
		'secret'	=> $this->config->item('appSecret'),
		));
		
		$this->user = $this->facebook->getUser();
		if($this->user){
			try{
				$user_profile = $this->facebook->api('/me');
				$params = array('next' => $base_url.'welcome/logout');
				$sesUser = array('User'=>$user_profile,
				   'logout' =>$facebook->getLogoutUrl($params)
				);
		        $this->session->set_userdata($sesUser);
				header('Location: '.$base_url);
			}catch(FacebookApiException $e){
				error_log($e);
				$user = NULL;
			}		
		}
	}
}
/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */