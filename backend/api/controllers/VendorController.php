<?php
/**
 * Vendor Controller
 */

class VendorController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function index() {
        $vendors = $this->db->fetchAll("SELECT * FROM vendors ORDER BY created_at DESC");
        echo json_encode(['success' => true, 'data' => $vendors]);
    }

    public function show($id) {
        $vendor = $this->db->fetchOne("SELECT * FROM vendors WHERE id = ?", [$id]);
        if (!$vendor) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Vendor not found']);
            return;
        }
        echo json_encode(['success' => true, 'data' => $vendor]);
    }

    public function store() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $id = $this->db->insert('vendors', [
            'name' => $data['name'],
            'type' => $data['type'],
            'contact_person' => $data['contactPerson'] ?? null,
            'email' => $data['email'] ?? null,
            'phone' => $data['phone'] ?? null,
            'location' => $data['location'] ?? null,
            'rating' => $data['rating'] ?? 0,
            'vehicle_number' => $data['vehicleNumber'] ?? null,
            'vehicle_type' => $data['vehicleType'] ?? null
        ]);

        $vendor = $this->db->fetchOne("SELECT * FROM vendors WHERE id = ?", [$id]);
        http_response_code(201);
        echo json_encode(['success' => true, 'data' => $vendor]);
    }

    public function update($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $this->db->update('vendors', [
            'name' => $data['name'] ?? null,
            'type' => $data['type'] ?? null,
            'contact_person' => $data['contactPerson'] ?? null,
            'email' => $data['email'] ?? null,
            'phone' => $data['phone'] ?? null,
            'location' => $data['location'] ?? null,
            'rating' => $data['rating'] ?? null
        ], 'id = ?', [$id]);

        $vendor = $this->db->fetchOne("SELECT * FROM vendors WHERE id = ?", [$id]);
        echo json_encode(['success' => true, 'data' => $vendor]);
    }

    public function destroy($id) {
        $this->db->delete('vendors', 'id = ?', [$id]);
        echo json_encode(['success' => true, 'message' => 'Vendor deleted']);
    }
}
