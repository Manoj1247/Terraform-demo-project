<?php

namespace App\Services;

use Aws\QuickSight\Exception\QuickSightException;
use Aws\QuickSight\QuickSightClient;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;


class DashboardService
{
    public function __construct(
        protected AthenaService $athenaService
    )
    {

    }

    /**
     * @return array
     */
    public function getReports(): array
    {
        try {
            $path = 'integrations/SQL_library/embedding_sql/elt_qs_report.sql';
            $query = Storage::disk('s3')->get($path);
//            $query = '';
            $athenaResult = $this->athenaService->runQuery($query);
            if (!$athenaResult['success']) return $athenaResult;

            return [
                'success' => true,
                'data' => $athenaResult['data']
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    /**
     * @param string $dashboardId
     * @return array
     */
    public function getEmbedUrl(string $dashboardId): array
    {
        try {
            $client = new QuickSightClient([
                'version' => 'latest',
                'region' => config('services.aws.region'),
                'credentials' => [
                    'key' => config('services.aws.qs_access_key_id'),
                    'secret' => config('services.aws.qs_secret_access_key'),
                ],
            ]);
            $identityType = 'IAM';
            $params = [
                'AwsAccountId' => config('services.aws.account_id'),
                'DashboardId' => $dashboardId,
                'IdentityType' => $identityType,
                'SessionLifetimeInMinutes' => 600,
                'ResetDisabled' => true,
                'UndoRedoDisabled' => false,
            ];
            $result = $client->getDashboardEmbedUrl($params);
            return [
                'success' => true,
                'data' => [
                    'url' => $result['EmbedUrl']
                ]
            ];
        } catch (QuickSightException $e) {
            // Handle the exception here
            $error = $e->getMessage();
            Log::error(sprintf('QS Embed Error: %s', $error));
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }

}
