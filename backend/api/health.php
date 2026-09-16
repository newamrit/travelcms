<?php
/**
 * TravelOps Pro - Health Check API
 * Returns database connection status
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/config/Database.php';

// Test database connection
$dbTest = Database::testConnection();

// Check tables
$tableCheck = Database::checkTables();

// Overall health status
$isHealthy = $dbTest['connected'] && $tableCheck['tables_exist'];

$response = [
    'status' => $isHealthy ? 'healthy' : 'unhealthy',
    'timestamp' => date('c'),
    'version' => '1.0.0',
    'database' => [
        'connected' => $dbTest['connected'],
        'host' => $dbTest['host'],
        'name' => $dbTest['database'],
        'message' => $dbTest['message']
    ],
    'tables' => [
        'exist' => $tableCheck['tables_exist'],
        'total' => $tableCheck['total_tables'],
        'existing' => $tableCheck['existing_tables'],
        'missing' => $tableCheck['missing_tables']
    ]
];

if (!$isHealthy) {
    http_response_code(503); // Service Unavailable
} else {
    http_response_code(200);
}

echo json_encode($response, JSON_PRETTY_PRINT);
