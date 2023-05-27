<?php

namespace App\Http\Controllers;

use App\Http\BaseController;
use App\Services\DashboardService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends BaseController
{
    public function __construct(
        public DashboardService $dashboardService
    )
    {

    }

    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $response = $this->dashboardService->getReports();
            if ($response['success']) {
                return $this->returnSuccessResponse($response['data']);
            }
            return $this->returnErrorResponse($response['error']);
        } catch (\Exception $e) {
            return $this->returnErrorResponse($e->getMessage());
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getEmbedUrl(Request $request): JsonResponse
    {
        try {
            $response = $this->dashboardService->getEmbedUrl($request->input('id'));
            if ($response['success']) {
                return $this->returnSuccessResponse($response['data']);
            }
            return $this->returnErrorResponse($response['error']);
        } catch (\Exception $e) {
            return $this->returnErrorResponse($e->getMessage());
        }
    }

}
