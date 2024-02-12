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
//            $data = Storage::json('response.json');
//            return [
//                'success' =>  true,
//                'data' => $data
//            ];
            $path = 'integrations/SQL_library/embedding_sql/elt_qs_report.sql';
            $query = Storage::disk('s3')->get($path);
            $athenaResult = $this->athenaService->runQuery($query);
            if (!$athenaResult['success']) return $athenaResult;
            $data = $athenaResult['data'];
            $data = array_map(function($dashboard){
                try {
                    $dashboard['screenshot'] = Storage::disk('s3')->temporaryUrl('documents/requestid/'.$dashboard['id'].'/'.$dashboard['ssname'], now()->addMinutes(5));
                }catch (\Exception $e){
                    $dashboard['screenshot'] = null;
                    info('Download Error:::'.$e->getMessage());
                }
                return $dashboard;
            }, $data);
            return [
                'success' => true,
                'data' => $data
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
            $settings = [
                'version' => 'latest',
                'region' => config('services.aws.region'),
            ];
            if (null !== ($accessKey = config('services.aws.qs_access_key_id')) && !empty($accessKey)) {
                $settings['credentials'] = [
                    'key' => $accessKey,
                    'secret' => config('services.aws.qs_secret_access_key'),
                ];
            }
            $client = new QuickSightClient($settings);
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
                    'url' => $result['EmbedUrl'],
                    'request_id' => $result['RequestId']
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

    public function downloadImages() {

    }
}
