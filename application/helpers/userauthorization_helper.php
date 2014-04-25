<?php
if (!defined('BASEPATH'))
  exit ('No direct script access allowed');
if (!function_exists('isuerloggedin')) {  //this function is used to check if session exists or not
  if (!function_exists('isuserloggedin')) {
    function isuserloggedin() {
      $CI = & get_instance(); //get instance, access the CI superobject
      $isLoggedIn = $CI->session->userdata('User');
      if ($isLoggedIn) {       //when seesion is there
        redirect('welcome');
      }
      else {               //when seesion is not there         
        redirect('');
      }
    }
  }
}