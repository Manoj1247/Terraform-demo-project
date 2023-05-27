<?php


namespace App\Services;


use Aws\Athena\AthenaClient;
use Aws\Athena\Exception\AthenaException;
use Illuminate\Support\Facades\Storage;

class AthenaService
{
    protected ?AthenaClient $client = null;

    public function __construct(
    )
    {
        if (!$this->client) {
            $this->client = new AthenaClient([
                'version' => 'latest',
                'region' => config('aws.default_region'),
                'credentials' => [
                    'key' => config('aws.access_key_id'),
                    'secret' => config('aws.secret_access_key'),
                ],
            ]);
        }
    }
    /**
     * @param string $query
     * @return array
     */
    public function runQuery(string $query): array
    {
        try {
            $result = $this->client->startQueryExecution([
                'QueryExecutionContext' => [
                    'Database' => config('aws.athena_db_name'),
                ],
                'QueryString' => $query,
                'ResultConfiguration' => [],
            ]);

            $queryExecutionId = $result['QueryExecutionId'];

            $status = 'QUEUED';
            while ($status == 'QUEUED' || $status == 'RUNNING') {
                sleep(1);
                $result = $this->client->getQueryExecution([
                    'QueryExecutionId' => $queryExecutionId,
                ]);
                $status = $result['QueryExecution']['Status']['State'];
            }
            if ($status == 'FAILED') {
                return [
                    'success' => false,
                    'error' => 'Query execution failed: ' . $result['QueryExecution']['Status']['StateChangeReason'],
                ];
            }
            $result = $this->client->getQueryResults([
                'QueryExecutionId' => $queryExecutionId,
            ]);

            $resultSet = $result['ResultSet'];
            $rows = array_map(function ($item) {
                return $item['Data'];
            }, $resultSet['Rows']);
            $keys = $resultSet['ResultSetMetadata']['ColumnInfo'];
            $rowsData = array_values(array_filter($rows, function ($item, $key) {
                return $key !== 0;
            }, ARRAY_FILTER_USE_BOTH));
            $data = array_map(function ($item) use ($keys) {
                $newObj = [];
                foreach ($keys as $key) {
                    $keyIndex = array_search($key, $keys);
                    try {
                        $newObj[$key['Name']] = $item[$keyIndex][array_keys($item[$keyIndex])[0]];
                    }catch (\Exception $e){
                        $newObj[$key['Name']] = null;
                    }
                }
                return $newObj;
            }, $rowsData);

            return [
                'success' => true,
                'data' => $data,
            ];

        } catch (AthenaException $e) {
            return [
                'success' => false,
                'error' => 'Athena error: ' . $e->getMessage(),
            ];
        }
    }
}
