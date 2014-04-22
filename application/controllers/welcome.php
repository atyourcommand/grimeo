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
			'appId'  => $this->config->item('appID'), //'694907180553170',
			'secret' => $this->config->item('appSecret'),  //'171730b0b7c778616b69ecf0f6603a7f'
		);
		$this->load->library('facebook', $config);
		$this->user = $this->facebook->getUser();
        $this->load->model('Managefacebookinfo');
	}
	public function index()
	{
		$data =  array();
		$data['user_profile'] ='';
		if ($this->user){
			try {

				$user_profile = $this->facebook->api('/me');

           //     var_dump($user_profile);
                //$this->Managefacebookinfo->insertfacebookinfo($user_profile);								                //echo "<br/>";
				$data['user_profile'] = $user_profile;
				$params = array('next' => base_url().'welcome/logout');
				$sesUser = array('User'=>$user_profile,
				   'logout' =>$this->facebook->getLogoutUrl($params)
				);
		     $this->session->set_userdata($sesUser);
				//print_r($user_profile);
				//echo $user_profile['email'];
				
			} catch(FacebookApiException $e) {
				///print_r($e);
				$user = null;
			}
		}
		$this->load->view('index',$data);
		$this->load->view('footer');
	}
	function logout(){
		$base_url=$this->config->item('base_url');
		$this->session->sess_destroy();
		$this->facebook->destroySession();
		///header('Location: '.$base_url);
		redirect('welcome');
	}

    ///this function is used to save info
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

                   echo $this->user;
                         //exit();
                   if (!$this->Managefacebookinfo->checkifuserexists($this->user)) {
                $this->Managefacebookinfo->insertfacebookinfo($user_profile);
                 // exit();
                  }
				$params = array('next' => $base_url.'/welcome/logout');
				//echo $facebook->getLogoutUrl($params);
				$sesUser = array('User'=>$user_profile,
				   'logout' =>$facebook->getLogoutUrl($params)
				);
		     $this->session->set_userdata($sesUser);
				redirect('welcome');
			}catch(FacebookApiException $e){
				//error_log($e);
				$user = NULL;
			}		
		}
	}
}
/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */