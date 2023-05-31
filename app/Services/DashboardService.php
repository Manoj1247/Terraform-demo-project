<?php

namespace App\Services;

use Aws\QuickSight\Exception\QuickSightException;
use Aws\QuickSight\QuickSightClient;
use Exception;
use Illuminate\Support\Facades\Http;
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
            foreach ($data as $dashboard) {
                try {
                    $screenshotPath = public_path('images/screenshots/'. $dashboard['id'].'_'.$dashboard['ssname']);
                    if(!file_exists($screenshotPath)) {
                        $url = config('app.dps_domain').'/gets3object?Clientid='.config('app.dps_api_id').
                            '&Clientsecret='.config('app.dps_api_secret').
                            '&S3url=https://periscope365-prod.s3.us-west2.amazonaws.com/documents/requestid/'.$dashboard['id'].'/'.$dashboard['ssname'];
                        $content = Http::get($url)->body();
                        file_put_contents($screenshotPath, $content);
                    }
                }catch (\Exception $e){
                    info('Download Error:::'.$e->getMessage());
                }
            }
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

    public function downloadImages() {

    }
}
