<?php
if (!defined('BASEPATH'))
  exit ('No direct script access allowed');

if (!function_exists('get_header_data')) { //this function is used to check if session exists or not
  
	function get_header_data() {
	  
	  $CI = & get_instance(); //get instance, access the CI superobject
	  $isLoggedIn = $CI->session->userdata('User');
	  $user_logged_in = false;
	  
	  if ($isLoggedIn) { //when seesion is there
		//redirect('welcome');
		$user_logged_in = true;
	  }
	  else {               
	  //when seesion is not there         
		//redirect('');
	  }
	  
	  $header_data['user_logged_in'] = $user_logged_in;
	  
	  return $header_data;
	}
 
}