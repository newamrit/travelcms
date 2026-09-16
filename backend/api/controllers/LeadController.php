<?php
/**
 * Lead Controller
 */

class LeadController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function index() {
        $leads = $this->db->fetchAll("SELECT * FROM leads ORDER BY created_at DESC");
        echo json_encode(['success' => true, 'data' => $leads]);
    }

    public function show($id) {
        $lead = $this->db->fetchOne("SELECT * FROM leads WHERE id = ?", [$id]);
        if (!$lead) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Lead not found']);
            return;
        }
        echo json_encode(['success' => true, 'data' => $lead]);
    }

    public function store() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $id = $this->db->insert('leads', [
            'lead_number' => $data['leadNumber'] ?? 'LD-' . time(),
            'client_name' => $data['clientName'],
            'client_email' => $data['clientEmail'] ?? null,
            'client_phone' => $data['clientPhone'] ?? null,
            'client_whatsapp' => $data['clientWhatsapp'] ?? null,
            'client_country' => $data['clientCountry'] ?? 'Nepal',
            'pax_adults' => $data['paxAdults'] ?? 1,
            'pax_children' => $data['paxChildren'] ?? 0,
            'travel_date_from' => $data['travelDateFrom'] ?? null,
            'travel_date_to' => $data['travelDateTo'] ?? null,
            'budget_min' => $data['budgetMin'] ?? 0,
            'budget_max' => $data['budgetMax'] ?? 0,
            'currency' => $data['currency'] ?? 'NPR',
            'lead_source' => $data['leadSource'] ?? 'website',
            'status' => $data['status'] ?? 'new',
            'assigned_agent_id' => $data['assignedAgentId'] ?? null,
            'assigned_agent_name' => $data['assignedAgentName'] ?? null,
            'priority' => $data['priority'] ?? 'medium',
            'notes' => $data['notes'] ?? null
        ]);

        $lead = $this->db->fetchOne("SELECT * FROM leads WHERE id = ?", [$id]);
        http_response_code(201);
        echo json_encode(['success' => true, 'data' => $lead]);
    }

    public function update($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $this->db->update('leads', [
            'client_name' => $data['clientName'] ?? null,
            'client_email' => $data['clientEmail'] ?? null,
            'client_phone' => $data['clientPhone'] ?? null,
            'status' => $data['status'] ?? null,
            'notes' => $data['notes'] ?? null
        ], 'id = ?', [$id]);

        $lead = $this->db->fetchOne("SELECT * FROM leads WHERE id = ?", [$id]);
        echo json_encode(['success' => true, 'data' => $lead]);
    }

    public function destroy($id) {
        $this->db->delete('leads', 'id = ?', [$id]);
        echo json_encode(['success' => true, 'message' => 'Lead deleted']);
    }
}
