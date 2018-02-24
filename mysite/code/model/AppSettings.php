<?php

namespace MyOrg\Model;

use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\ORM\DataObject;
use SilverStripe\Assets\Image;

class AppSettings extends DataObject implements ScaffoldingProvider
{

    private static $db = [
        'CalendarTitle' => 'Text',
        'PCMain' => 'TractorCow\Colorpicker\Color',
        'PCLight' => 'TractorCow\Colorpicker\Color',
        'PCDark' => 'TractorCow\Colorpicker\Color',
        'PCContrast' => 'TractorCow\Colorpicker\Color',
        'SCMain' => 'TractorCow\Colorpicker\Color',
        'SCLight' => 'TractorCow\Colorpicker\Color',
        'SCDark' => 'TractorCow\Colorpicker\Color',
        'SCContrast' => 'TractorCow\Colorpicker\Color',
    ];

    private static $has_one = [
        'ClientLogoImage' => Image::class,
        'HappLogoImage' => Image::class,
    ];

    private static $has_many = [];


    public function getClientLogo()
    {
        return $this->ClientLogoImage()->exists() ? $this->ClientLogoImage()->ScaleHeight(180)->AbsoluteURL : null;
    }

    public function getHappLogo()
    {
        return $this->HappLogoImage()->exists() ? $this->HappLogoImage()->ScaleHeight(180)->AbsoluteURL : null;
    }

    public function canView($member = null)
    {
        return true;
    }

    public function onAfterWrite()
    {
        parent::onAfterWrite();

        if ($this->ClientLogoImage()->exists()) {
            $this->ClientLogoImage()->copyVersionToStage('Stage', 'Live');
        }
        if ($this->HappLogoImage()->exists()) {
            $this->HappLogoImage()->copyVersionToStage('Stage', 'Live');
        }
    }

//    public function getCMSFields()
//    {
//        $mainSettings = CompositeField::create(
//            HeaderField::create('MainSettings', 'MainSettings'),
//            TextField::create('CalendarTitle', 'CalendarTitle')
//                ->setDescription('e.g <strong>Happ</strong>')
//        );
//
//        $colorSettings = CompositeField::create(
//            HeaderField::create('Colors', 'Colors'),
//            ColorField::create('PCMain', 'PCMain')
//        );
//
//        /**
//         * Field list and Tabs
//         */
//        $fields = FieldList::create(
//            $root = TabSet::create(
//                'Root',
//                new Tab('Main', 'Main Details',
//                    $mainSettings
//                ),
//                new Tab('Colors', 'App Colors',
//                    $colorSettings
//                )
//            )
//        );
//        return $fields;
//
//    }

    public function provideGraphQLScaffolding(SchemaScaffolder $scaffolder)
    {
        $scaffolder
            ->query('getAppSettings', __CLASS__)
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info){
                $settings = self::get()->first();
                if (!$settings) {
                    throw new \InvalidArgumentException(sprintf(
                        'cannot retrieve settings'
                    ));
                }
                return $settings;
            })
            ->setUsePagination(false)
            ->end();


        return $scaffolder;
    }


}