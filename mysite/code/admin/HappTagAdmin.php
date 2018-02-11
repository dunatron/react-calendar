<?php
namespace MyOrg\Controller;
use MyOrg\Model\HappTag;
use SilverStripe\Admin\ModelAdmin;
class HappTagAdmin extends ModelAdmin
{
    private static $managed_models = [
        HappTag::class,
    ];
    private static $url_segment = 'happtagapp';
    private static $menu_title = 'Happ Tags';
}