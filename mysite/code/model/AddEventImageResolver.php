<?php

namespace MyOrg\Model;

use SilverStripe\Assets\Image;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ResolverInterface;

class AddEventImageResolver implements ResolverInterface
{
    public function resolve($object, $args, $context, $info)
    {
//        $post = Post::get()->byID($args['ID']);
//
//        if ($post->canEdit()) {
//            $post->Title = $args['NewTitle'];
//            $post->write();
//        }
//
//        return $post;

        //var_export(error_log($args), true);
        //var_dump("Hello");

        //error_log('AddEventImageResolver ARgs ', $args);


        // A bit of thought need to go into this
        // Do we create our events then add the images?

        $event = Event::get()->byID($args['eventID']);

        //imgSrc

        // The below will help with images
        // https://github.com/dunatron/CalendarSS4/blob/master/mysite/code/Controllers/PageController.php
        // create a new Image
        $image = new Image();
        $image->Filename = "Foo";
        $image->write();

        // add the image.
        $event->EventImages()->add($image);

        return $event;


    }
}