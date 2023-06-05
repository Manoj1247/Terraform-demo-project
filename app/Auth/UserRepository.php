<?php

namespace App\Auth;

use App\Auth\Models\User;
use Auth0\Laravel\Contract\Auth\User\Repository as RepositoryContract;
use Illuminate\Contracts\Auth\Authenticatable;
class UserRepository implements RepositoryContract
{
    public function fromSession(
        array $user
    ): ?Authenticatable {
        // store as eloquent user
        if (null === ($eloquentUser = User::firstWhere('email', $user['email']))) {
            // $user['periscope365_roles'] will contain an array of roles
            // dd($user);
            $eloquentUser = User::create([
                'name'     => $user['name'],
                'auth0_id' => str_replace('auth0|', '', $user['sub']),
                'email'    => $user['email'],
                'image'    => $user['picture'],
            ]);
        }

        return $eloquentUser;
    }

    public function fromAccessToken(
        array $user
    ): ?Authenticatable {
        // Simliar to above. Used for stateless application types.
        return null;
    }
}
