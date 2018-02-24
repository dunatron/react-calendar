<?php
namespace MyOrg\Controller;
use MyOrg\Model\AppSettings;
use SilverStripe\Admin\ModelAdmin;
class AppSettingsAdmin extends ModelAdmin
{
    private static $managed_models = [
        AppSettings::class,
    ];
    private static $url_segment = 'settingsapp';
    private static $menu_title = 'App Settings';
}