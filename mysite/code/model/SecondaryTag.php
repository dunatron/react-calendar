<?php

namespace MyOrg\Model;

use SilverStripe\ORM\DataObject;

class SecondaryTag extends DataObject
{
    private static $has_one = array(
        'HappTag'   =>  HappTag::class
    );
    private static $has_many = array(
        'Events'   =>  Event::class
    );
    private static $db = array(
        'Title' => 'Varchar(100)',
        'Description' => 'Text'
    );
    public function getCMSFields(){
        $fields = parent::getCMSFields();
        return $fields;
    }
    public function canView($member = null)
    {
        return true;
    }
}