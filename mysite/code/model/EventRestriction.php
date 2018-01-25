<?php

namespace MyOrg\Model;

use SilverStripe\ORM\DataObject;

class EventRestriction extends DataObject
{
    private static $has_one = array();
    private static $db = array(
        'Description' => 'Text'
    );
    public function getCMSFields(){
        $fields = parent::getCMSFields();
        return $fields;
    }
}