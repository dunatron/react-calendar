<?php

namespace MyOrg\Model;

use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;
use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\ORM\DataObject;
use SilverStripe\Assets\Image;
use SilverStripe\Security\Member;
use SilverStripe\Forms\CompositeField;
use SilverStripe\Forms\DateField;
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\NumericField;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Forms\TimeField;
use SilverStripe\Forms\GridField\GridFieldConfig_RecordEditor;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\TabSet;
use SilverStripe\Forms\Tab;
use SilverStripe\Forms\HeaderField;
use SilverStripe\Forms\FieldGroup;
use SilverStripe\Forms\ReadonlyField;




class Event extends DataObject implements ScaffoldingProvider
{



    private static $db = [
        'Title' => 'Varchar(255)',
        'Date' => 'Date',
        'Description' => 'HTMLText',
        'Venue' => 'Varchar(255)',
        'Start' => 'Time',
        'Finish' => 'Time',
        'Approved' => 'Boolean',
        'Free' => 'Boolean',
        'Website' => 'Text',
        'TicketUrl' => 'Text',
        'TicketPhone' => 'Varchar(255)',
        'Restriction' => 'Varchar(255)',
        'SpecEntry' => 'Varchar(255)',
        'AccessType' => 'Varchar(255)',
        'IsEventFindaEvent' => 'Boolean',
        'EventFindaID' => 'Varchar(10)',
        'EventFindaUrl' => 'Text',
        'LocationText'  =>  'Text',
        'Lat'   =>  'Text',
        'Lon'  =>  'Text'
    ];

    private static $has_one = [
        'Owner' => Member::class,
        'Image' => Image::class,
        'Category' => Category::class,
        'SecondaryTag'  =>  SecondaryTag::class
    ];

    private static $has_many = [
        'Tickets'   =>  Ticket::class,
        'EventFindaImages'  =>  EventFindaImage::class
    ];

    private static $many_many = [
        'EventImages'   =>  Image::class
    ];

    private static $default_sort = 'Created DESC';

    public function getThumbnail()
    {
        return $this->Image()->exists() ? $this->Image()->Fill(300, 300)->AbsoluteURL : null;
    }

    public function canView($member = null)
    {
        return true;
    }

    public function onAfterWrite()
    {
        parent::onAfterWrite();

        if ($this->Image()->exists()) {
            $this->Image()->copyVersionToStage('Stage', 'Live');
        }
    }

    public function getCMSFields()
    {
        $eventDetails = CompositeField::create(
            HeaderField::create('EventDetails', 'Details'),
            // EventTitle
            TextField::create('Title', 'Title:')
                ->setDescription('e.g <strong>Little johnys bakeoff</strong>'),
            // EventDescription
            TextareaField::create('Description', 'Description')
                ->setDescription('The real description field'),
            // EventVenue
            TextField::create('Venue', 'Venue:')
                ->setDescription('e.g <strong>Entertainment Centre</strong>')
        );
        $eventLocation = CompositeField::create(
            HeaderField::create('EventLocationDetails', 'Location Details'),
            FieldGroup::create([
                // LocationText
                TextField::create('LocationText', 'Location:')
                    ->setDescription('e.g <strong>182 Bowmar Rd, Waimumu 9774, New Zealand</strong>'),
                // LocationLat
                NumericField::create('Lat', 'Location latitude:')
                    ->setDescription('e.g <strong>-46.1326615</strong>'),
                // LocationLon
                NumericField::create('Lon', 'Location longitude:')
                    ->setDescription('e.g <strong>168.89592100000004</strong>')
            ])
        );
        $mainImage = UploadField::create('Image', 'Main Image');
        $eventDateTime = CompositeField::create(
            HeaderField::create('DateTimeDetails', ' Date Time Details'),
            FieldGroup::create([
                // EventDate
                DateField::create('Date', 'Event Date')
                    ->setDescription('Date for the event'),
                // StartTime
                TimeField::create('Start')
                    ->setDescription('Start time for the event'),
                // FinishTime
                TimeField::create('Finish')
                    ->setDescription('Finish time for the event')
            ])
        );
        $eventApproval = CompositeField::create(
            HeaderField::create('ApprovalDetails', 'Approve Event')->addExtraClass('primary'),
            // EventApproved
            CheckboxField::create('Approved', 'Event Approved')
                ->setDescription('Check to display this event on the calendar')
        );
        $eventRestrictions = CompositeField::create(
            HeaderField::create('RestrictionDetails', 'Restrictions'),
            DropdownField::create(
                'Restriction',
                'Choose A Restriction Type',
                EventRestriction::get()->map('ID', 'Description')->toArray(),
                null,
                true
            )
        );
        $acc = new AccessTypeArray();
        $eventAccess = CompositeField::create(
            HeaderField::create('AccessDetails', 'Event Access'),
            $acc->getAccessValues()
        );
        $ticketDetails = CompositeField::create(
            HeaderField::create('TicketDetails', 'Ticket Details'),
            // TicketWebsite
            TextField::create('Website', 'Ticket Website')
                ->setDescription('URL where tickets for this event can be purchased from'),
            // TicketPhone
            TextField::create('TicketUrl', 'Ticket Phone')
                ->setDescription('Number to call to buy tickets'),
            // BookingWebsite
            TextField::create('Ticket', 'Booking Website URL')
                ->setDescription('Booking website URL')
        );

        $eventImages = UploadField::create('EventImages');
        //Set allowed upload extensions
        $eventImages->getValidator()->setAllowedExtensions(array('png', 'gif', 'jpg', 'jpeg'));
        // Create Folder for images
        $Year = date('Y');
        $Month = date('M');
        $makeDirectory = 'Uploads/' . $Year . '/' . $Month;
        $eventImages->setFolderName($makeDirectory);
        //$eventImages->setFolderName('event-Images');
        $eventFindaDetails = CompositeField::create(
            HeaderField::create('EventFindaDetails', 'Event Finda Details'),
            // IsEventFindaEvent
            ReadonlyField::create('IsEventFindaEvent', 'Is EventFinda Event')
                ->setDescription('Leave this checked if event has come from event finda'),
            // EventFindaID
            TextField::create('EventFindaID', 'Id for event finda'),
            // EventFindaURL
            TextField::create('EventFindaUrl', 'Absolute url for event')
                ->setDescription('If this event was generated by event finda this field will contain a value')
        );
        $eventFindaImages = CompositeField::create(
            GridField::create(
                'EventFindaImages',
                'Event Finda Images on page',
                $this->EventFindaImages(),
                GridFieldConfig_RecordEditor::create()
            )
        );
        /**
         * Field list and Tabs
         */
        $fields = FieldList::create(
            $root = TabSet::create(
                'Root',
                new Tab('Main', 'Main Details',
                    $eventDetails,
                    $mainImage,
                    $eventLocation,
                    $eventDateTime,
                    $eventApproval,
                    $eventRestrictions,
                    $eventAccess
                ),
                new Tab('TicketDetails', 'Ticket Details',
                    $ticketDetails
                ),
                new Tab('EventImages', 'Images',
                    $eventImages
                ),
                new Tab('EventFinda', 'Event Finda Info',
                    $eventFindaDetails
                ),
                new Tab('EventFindaImages', 'Finda Images',
                    $eventFindaImages
                )
            )
        );
        return $fields;

    }


    public static function get_by_finda_id($callerClass, $id, $cache = true) {
        if(!is_numeric($id)) {
            user_error("DataObject::get_by_finda_id passed a non-numeric ID #$id", E_USER_WARNING);
        }
        // Check filter column
        if(is_subclass_of($callerClass, DataObject::class)) {
            $baseClass = DataObject::getSchema()->baseDataClass($callerClass);
            $column = "\"$baseClass\".\"EventFindaID\"";
        } else{
            // This simpler code will be used by non-DataObject classes that implement DataObjectInterface
            $column = '"EventFindaID"';
        }
        $column = '"EventFindaID"';
        // Relegate to get_one
        return DataObject::get_one($callerClass, array($column => $id), $cache);
    }

    public function provideGraphQLScaffolding(SchemaScaffolder $scaffolder)
    {
        $scaffolder
            ->query('getSingleEvent', __CLASS__)
            ->addArgs([
                'ID' => 'ID!'
            ])
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info){
                $event = self::get()->byID($args['ID']);
                if (!$event) {
                    throw new \InvalidArgumentException(sprintf(
                        'Event #%s does not exist',
                        $args['ID']
                    ));
                }
                $params = [
                    'ID' => $event->ID
                ];

                return $event;
            })

            ->setUsePagination(false)
            ->end();

        $scaffolder
            ->query('getAllEvents', __CLASS__)
            ->addArgs([

            ])
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info){
                $events = self::get();
                return $events;
            })

            ->setUsePagination(false)
            ->end();

        $scaffolder
            ->query('getEventsBetween', __CLASS__)
            ->addArgs([
                'StartDate' => 'String!',
                'EndDate'   => 'String!'
            ])
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info) {
                $events = self::get()->filter([
                    'Date:GreaterThan' => $args['StartDate'],
                    'Date:LessThan' => $args['EndDate']
                ]);

                return $events;
            })
            ->setUsePagination(false)
            ->end();

        $scaffolder
            ->query('searchAllEvents', __CLASS__)
            ->addArgs([
                'filter' => 'String!',
            ])
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info) {
                $events = self::get()->filter([
                    'Title:PartialMatch' => $args['filter'],
                    'Description:PartialMatch' => $args['filter']
                ]);

                return $events;
            })
            ->setUsePagination(true)
            ->end();


        return $scaffolder;
    }


}