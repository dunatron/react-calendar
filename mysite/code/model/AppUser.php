<?php

namespace MyOrg\Security;

use SilverStripe\Security\Member;
use GraphQL\Type\Definition\ResolveInfo;
use SilverStripe\GraphQL\Scaffolding\Interfaces\ScaffoldingProvider;
use SilverStripe\GraphQL\Scaffolding\Scaffolders\SchemaScaffolder;

class AppUser extends Member implements ScaffoldingProvider
{
    public function provideGraphQLScaffolding(SchemaScaffolder $scaffolder)
    {
        $scaffolder
            ->mutation('signinUser', __CLASS__)
            ->addArgs([
                'Email' => 'String!',
                'Password'  =>  'String!'
            ])
            ->setResolver(function ($object, array $args, $context, ResolveInfo $info) {
                $user = self::get()->byID($args['ID']);
                if (!$user) {
                    throw new \InvalidArgumentException(sprintf(
                        'User #%s does not exist',
                        $args['ID']
                    ));
                }
                $params = [
                    'ID' => $user->ID,
                ];

                return $user;
            });

        return $scaffolder;
    }
}