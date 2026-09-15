<?php
/**
 * TravelOps Pro - API Router
 * Main entry point for all API requests
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Load dependencies
require_once __DIR__ . '/config/Database.php';

// Get request details
$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];
$path = parse_url($uri, PHP_URL_PATH);
$path = str_replace('/api/', '', $path);
$segments = explode('/', trim($path, '/'));

// Route mapping
$resource = $segments[0] ?? '';
$id = $segments[1] ?? null;
$action = $segments[2] ?? null;

try {
    // Test database connection first
    $dbTest = Database::testConnection();
    if (!$dbTest['connected']) {
        http_response_code(503);
        echo json_encode([
            'success' => false,
            'error' => 'Database connection failed',
            'message' => $dbTest['message']
        ]);
        exit;
    }

    $db = Database::getInstance();

    // Route handling
    switch ($resource) {
        case 'health':
            require_once __DIR__ . '/health.php';
            break;

        case 'leads':
            require_once __DIR__ . '/controllers/LeadController.php';
            $controller = new LeadController($db);
            
            if ($method === 'GET' && !$id) {
                $controller->index();
            } elseif ($method === 'GET' && $id) {
                $controller->show($id);
            } elseif ($method === 'POST') {
                $controller->store();
            } elseif ($method === 'PUT' && $id) {
                $controller->update($id);
            } elseif ($method === 'DELETE' && $id) {
                $controller->destroy($id);
            }
            break;

        case 'bookings':
            require_once __DIR__ . '/controllers/BookingController.php';
            $controller = new BookingController($db);
            
            if ($method === 'GET' && !$id) {
                $controller->index();
            } elseif ($method === 'GET' && $id) {
                $controller->show($id);
            } elseif ($method === 'POST') {
                $controller->store();
            } elseif ($method === 'PUT' && $id) {
                $controller->update($id);
            } elseif ($method === 'DELETE' && $id) {
                $controller->destroy($id);
            }
            break;

        case 'vendors':
            require_once __DIR__ . '/controllers/VendorController.php';
            $controller = new VendorController($db);
            
            if ($method === 'GET' && !$id) {
                $controller->index();
            } elseif ($method === 'GET' && $id) {
                $controller->show($id);
            } elseif ($method === 'POST') {
                $controller->store();
            } elseif ($method === 'PUT' && $id) {
                $controller->update($id);
            } elseif ($method === 'DELETE' && $id) {
                $controller->destroy($id);
            }
            break;

        case 'invoices':
            require_once __DIR__ . '/controllers/InvoiceController.php';
            $controller = new InvoiceController($db);
            
            if ($method === 'GET' && !$id) {
                $controller->index();
            } elseif ($method === 'GET' && $id) {
                $controller->show($id);
            } elseif ($method === 'POST') {
                $controller->store();
            } elseif ($method === 'PUT' && $id) {
                $controller->update($id);
            } elseif ($method === 'DELETE' && $id) {
                $controller->destroy($id);
            }
            break;

        default:
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'error' => 'Endpoint not found',
                'path' => $path
            ]);
            break;
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error',
        'message' => $e->getMessage()
    ]);
}
