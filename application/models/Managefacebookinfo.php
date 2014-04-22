<?php
//API Key: ba5a09dba76b1c3875e487780468ef93
class Managefacebookinfo extends CI_Model {
//declration of all facebook info

  function __construct() {
    parent :: __construct();
  }
  function insertfacebookinfo($objuserinfo) {
// print_r($objuserinfo);
    $this->db->set('name', $objuserinfo['name']);
    $this->db->set('email', $objuserinfo['email']);
    $this->db->set('facebookid', $objuserinfo['id']);
    $this->db->insert('users');
  }

  ///this is used to
  function checkifuserexists($facebookid) {
// print_r($objuserinfo);
    $this->db->where('facebookid', $facebookid);
    $this->db->from("users");
    $query = $this->db->get();
    if ($query->num_rows() > 0) {
      return true;
    }
    else {
      return false;
    }
  }
}
?>