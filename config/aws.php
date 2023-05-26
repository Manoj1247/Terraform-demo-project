<?php

return [
    'default_region' => env('AWS_DEFAULT_REGION'),
    'access_key_id' => env('AWS_ACCESS_KEY_ID'),
    'secret_access_key' => env('AWS_SECRET_ACCESS_KEY'),
    'athena_db_name' => env('AWS_ATEHNA_DB_NAME'),
    'athena_output_location' => env('AWS_ATEHNA_OUTPUT_LOCATION'),
];
