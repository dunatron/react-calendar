<?php

namespace MyOrg\Extension;

use SilverStripe\ORM\DataExtension;
use SilverStripe\Security\Member;
use MyOrg\Model\Event;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldConfig_RelationEditor;

class EventOwner extends DataExtension
{

    private static $has_many = [
        'Events' => Event::class
    ];

    private static $many_many = [
        'Friends' => Member::class
    ];

    public function updateCMSFields(FieldList $fields)
    {
        $eventField = GridField::create('Events')
            ->setList($this->owner->Events())
            ->setConfig(GridFieldConfig_RelationEditor::create());
        $fields->addFieldToTab('Root.Events', $eventField);

        $friendField = GridField::create('Friends')
            ->setList($this->owner->Friends())
            ->setConfig(GridFieldConfig_RelationEditor::create());
        $fields->addFieldToTab('Root.Friends', $friendField);
    }
}