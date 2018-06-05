<?php
/**
 * Created by PhpStorm.
 * User: Tron
 * Date: 26/04/18
 * Time: 6:48 PM
 */
namespace MyOrg\Model;

use SilverStripe\Dev\BuildTask;
use SilverStripe\SiteConfig\SiteConfig;
use SilverStripe\View\ArrayData;
use SilverStripe\Dev\Debug;
use SilverStripe\Assets\Image;
use MyOrg;
use MyOrg\Model\Event;
use MyOrg\Model;
use MyOrg\Extension;



class CreateStressEventsTask extends BuildTask
{
    // Guide for array conversion ->http://array.include-once.org/
    // Guide for array conversion ->http://array.include-once.org/

    protected $title = 'Create Stress Events For Calendar';

    protected $description = 'Will create 1000 events with a random day and month for the current year';


    public function generateRandomDate()
    {
        $day = rand(1, 28);
        $month = rand(1,12);
        $year = date("Y");
        return ''.$year.'-'.$month.'-'.$day.'';
    }

    public function createEvent($imgID)
    {
        $newEvent = Event::create();
        $newEvent->Title = "Stress Test";
        $newEvent->Description = "An event generated to stress test the application";
        // $newEvent->CalendarPageID = 1;
        $newEvent->Approved = 1;
        // Event Date
        $newEvent->Date = $this->generateRandomDate();
        $newEvent->ImageID = $imgID;
        $newEvent->write();
    }


    public function createStressImage()
    {
        $imgContents = file_get_contents("https://i.kinja-img.com/gawker-media/image/upload/t_original/ais1w8kfxjndxieyfrl6.jpg"); // extracted source to save in file system
        $image = Image::create();
        $image->ShowInSearch = 0;
        $image->setFromString($imgContents, 'STRESS_IMAGE.jpg');
        $image->write();
        return $image;
    }


    public function run($request)
    {
        echo '<h1 style="color:rebeccapurple;">Generating events'.'</h1>';
        $offset = 1000;

        $stressImage = $this->createStressImage();
        for ($i = 0; $i <= $offset; $i++) {
            $this->createEvent($stressImage->ID);
        }
        echo '<h1 style="color:green;"> '.$offset.' Stress Events have been created'.'</h1>';
    }


}