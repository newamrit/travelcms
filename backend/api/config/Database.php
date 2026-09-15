<?php
/**
 * TravelOps Pro - Database Configuration
 * MySQL Connection with Health Check
 */

class Database {
    private static $instance = null;
    private $connection;
    private $host;
    private $dbname;
    private $username;
    private $password;
    
    private function __construct() {
        // Database credentials - UPDATE THESE FOR YOUR CPANEL
        $this->host = getenv('DB_HOST') ?: 'localhost';
        $this->dbname = getenv('DB_NAME') ?: 'cpaneluser_travelops';
        $this->username = getenv('DB_USER') ?: 'cpaneluser_dbuser';
        $this->password = getenv('DB_PASS') ?: 'your_password_here';
        
        try {
            $dsn = "mysql:host={$this->host};dbname={$this->dbname};charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
            ];
            
            $this->connection = new PDO($dsn, $this->username, $this->password, $options);
        } catch (PDOException $e) {
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function getConnection() {
        return $this->connection;
    }
    
    /**
     * Test database connection
     */
    public static function testConnection() {
        try {
            $db = self::getInstance();
            $conn = $db->getConnection();
            
            // Test query
            $stmt = $conn->query("SELECT 1");
            $result = $stmt->fetch();
            
            return [
                'connected' => true,
                'database' => $db->dbname,
                'host' => $db->host,
                'message' => 'Database connection successful'
            ];
        } catch (Exception $e) {
            return [
                'connected' => false,
                'database' => '',
                'host' => '',
                'message' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Check if database tables exist
     */
    public static function checkTables() {
        try {
            $db = self::getInstance();
            $conn = $db->getConnection();
            
            $requiredTables = [
                'users', 'leads', 'bookings', 'vendors', 
                'assignments', 'invoices', 'supplier_expenses'
            ];
            
            $stmt = $conn->query("SHOW TABLES");
            $existingTables = $stmt->fetchAll(PDO::FETCH_COLUMN);
            
            $missingTables = array_diff($requiredTables, $existingTables);
            
            return [
                'tables_exist' => empty($missingTables),
                'existing_tables' => $existingTables,
                'missing_tables' => array_values($missingTables),
                'total_tables' => count($existingTables)
            ];
        } catch (Exception $e) {
            return [
                'tables_exist' => false,
                'existing_tables' => [],
                'missing_tables' => $requiredTables,
                'total_tables' => 0,
                'error' => $e->getMessage()
            ];
        }
    }
    
    public function query($sql, $params = []) {
        try {
            $stmt = $this->connection->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            throw new Exception("Query failed: " . $e->getMessage());
        }
    }
    
    public function fetchAll($sql, $params = []) {
        return $this->query($sql, $params)->fetchAll();
    }
    
    public function fetchOne($sql, $params = []) {
        $result = $this->query($sql, $params)->fetch();
        return $result ?: null;
    }
    
    public function insert($table, $data) {
        $columns = implode(', ', array_keys($data));
        $placeholders = ':' . implode(', :', array_keys($data));
        $sql = "INSERT INTO {$table} ({$columns}) VALUES ({$placeholders})";
        $this->query($sql, $data);
        return $this->connection->lastInsertId();
    }
    
    public function update($table, $data, $where, $whereParams = []) {
        $set = [];
        foreach (array_keys($data) as $key) {
            $set[] = "{$key} = :{$key}";
        }
        $setClause = implode(', ', $set);
        $sql = "UPDATE {$table} SET {$setClause} WHERE {$where}";
        $params = array_merge($data, $whereParams);
        return $this->query($sql, $params)->rowCount();
    }
    
    public function delete($table, $where, $params = []) {
        $sql = "DELETE FROM {$table} WHERE {$where}";
        return $this->query($sql, $params)->rowCount();
    }
}
