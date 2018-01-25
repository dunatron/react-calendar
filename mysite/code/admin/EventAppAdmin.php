<?php
namespace MyOrg\Controller;
use MyOrg\Model\Event;
use SilverStripe\Admin\ModelAdmin;
class EventAppAdmin extends ModelAdmin
{
    private static $managed_models = [
        Event::class,
    ];
    private static $url_segment = 'eventapp';
    private static $menu_title = 'Event App';
}