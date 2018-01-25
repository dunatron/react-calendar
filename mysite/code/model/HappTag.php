<?php

namespace MyOrg\Model;

use SilverStripe\ORM\DataObject;

class HappTag extends DataObject
{
    private static $has_many = array(
        'SecondaryTags'   =>  SecondaryTag::class
    );
    private static $db = array(
        'Title' => 'Varchar(100)',
        'Description' => 'Text',
        'BgColor' => 'TractorCow\Colorpicker\Color'
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