<?php
namespace MyOrg\Controller;
use MyOrg\Model\SecondaryTag;
use SilverStripe\Admin\ModelAdmin;

class SecondaryTagAdmin extends ModelAdmin
{
    private static $managed_models = [
        SecondaryTag::class,
    ];
    private static $url_segment = 'secondarytagapp';
    private static $menu_title = 'Secondary Tags';
}