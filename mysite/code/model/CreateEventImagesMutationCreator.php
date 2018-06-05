<?php
namespace MyOrg\Model;

use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use SilverStripe\Assets\Image;
use SilverStripe\GraphQL\MutationCreator;
use SilverStripe\GraphQL\OperationResolver;
use MyOrg\Model\Event;
use Monolog\Handler;
use SilverStripe\Assets\Folder;
use SilverStripe\Assets\Upload;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ResolverInterface;

class CreateEventImagesMutationCreator extends MutationCreator implements OperationResolver
{
    public function attributes()
    {
        return [
            'name' => 'createEventImages',
            'description' => 'Creates Images on the server and assigns them to the events they were created for via an array of event IDS'
        ];
    }

    public function type()
    {
        return $this->manager->getType('Event');
    }

    public function args()
    {
        return [
            'imgSrc' => ['type' => Type::nonNull(Type::string())],
            'eventIds' => ['type' => Type::listOf(Type::id())],
        ];
    }

    public function resolve($object, array $args, $context, ResolveInfo $info)
    {

        $eventIDS = $args['eventIds']; // event Ids to store image reference against
        $rawFile = $args['imgSrc']; // image source from the front end
        $imgContents = file_get_contents($rawFile); // extracted source to save in file system
        var_export(error_log(json_encode($eventIDS)), true);

        // current year and month
        $Year = date('Y');
        $Month = date('M');

        // Find or Make the Folder Year
        $yearFolder = Folder::find_or_make('Uploads/' . $Year);

        $makeDirectory = 'Uploads/' . $Year . '/' . $Month;
        $folderPath = Folder::find_or_make($makeDirectory);
        //Folder::find_or_make('Tron');

        // The below will help with images
        // https://github.com/dunatron/CalendarSS4/blob/master/mysite/code/Controllers/PageController.php

        // create a new image class
        $image = Image::create();
        $image->ShowInSearch = 0;
        $image->setFromString($imgContents, 'imageTROn.jpg');
        $image->write();



        // For some reason I do have a main image so we can fall back to that for now
        var_export(error_log(json_encode("IMAGE ID ")), true);
        var_export(error_log(json_encode($image->ID)), true);

        // for each of the event ids in the array save the new image against the event
        foreach ($eventIDS as $eID) {
            $event = Event::get()->byID($eID);
            $event->ImageID = $image->ID;
            // This below doesnt seem to be working
            $event->EventImages()->add($image);
            $event->write();
        }


    }


}
