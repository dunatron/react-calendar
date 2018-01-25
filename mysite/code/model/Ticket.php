<?php

namespace MyOrg\Model;

use SilverStripe\ORM\DataObject;

use MyOrg\Model\Event;

class Ticket extends DataObject
{
    private static $has_one = array(
        'Event' => Event::class,
    );
    private static $db = array(
        'TicType' => 'Text',
        'TicPrice' => 'Currency'
    );
    private static $summary_fields = array(
        'TicType' => 'TicType',
        'TicPrice' => 'TicPrice'
    );
    public function getCMSFields(){
        $fields = parent::getCMSFields();
        return $fields;
    }
}