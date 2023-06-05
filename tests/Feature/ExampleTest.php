<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Auth\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $this->withoutExceptionHandling();
        $response = $this->get('/');

        $response->assertStatus(302);
    }

    public function setup(): void
    {
        parent::setup();

        $this->user = User::factory()->make([
            'id' => Str::uuid()->toString(),
        ]);

        $this->actingAs($this->user, 'auth0');
    }
}
