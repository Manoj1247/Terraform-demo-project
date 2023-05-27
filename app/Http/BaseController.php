<?php

namespace App\Http;

use App\Constants\HttpCode;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class BaseController extends Controller
{
    /**
     * @param array $body
     *
     * @return JsonResponse
     */
    public function returnSuccessResponse(array $body = []): JsonResponse
    {
        return response()->json($body);
    }

    /**
     * @param array $body
     * @param int|null $code
     *
     * @return JsonResponse
     */
    public function returnErrorResponse(array|string $body, ?int $code = HttpCode::BAD_REQUEST): JsonResponse
    {
        $errors = is_array($body) ? $body : [$body];

        $errors = empty($errors) ? ['Bad Request'] : $errors;
        return response()->json(['errors' => $errors], $code);
    }

    /**
     *
     * @return JsonResponse
     */
    public function returnNotFoundResponse(): JsonResponse
    {
        return response()->json(['errors' => ['Requested resource does not exist.']], HttpCode::NOT_FOUND);
    }

    /**
     * @return JsonResponse
     */
    public function returnForbiddenResponse(): JsonResponse
    {
        return response()->json([
            'errors' => ['Action not allowed for currently logged in user.']
        ], HttpCode::FORBIDDEN);
    }
}
