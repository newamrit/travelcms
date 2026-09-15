<?php
/**
 * Invoice Controller
 */

class InvoiceController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function index() {
        $invoices = $this->db->fetchAll("SELECT * FROM invoices ORDER BY created_at DESC");
        echo json_encode(['success' => true, 'data' => $invoices]);
    }

    public function show($id) {
        $invoice = $this->db->fetchOne("SELECT * FROM invoices WHERE id = ?", [$id]);
        if (!$invoice) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Invoice not found']);
            return;
        }
        echo json_encode(['success' => true, 'data' => $invoice]);
    }

    public function store() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $id = $this->db->insert('invoices', [
            'invoice_number' => $data['invoiceNumber'] ?? 'INV-' . time(),
            'booking_id' => $data['bookingId'] ?? null,
            'booking_number' => $data['bookingNumber'] ?? null,
            'client_name' => $data['clientName'],
            'subtotal' => $data['subtotal'] ?? 0,
            'tax_percent' => $data['taxPercent'] ?? 13,
            'tax_amount' => $data['taxAmount'] ?? 0,
            'discount_amount' => $data['discountAmount'] ?? 0,
            'total_amount' => $data['totalAmount'] ?? 0,
            'currency' => $data['currency'] ?? 'NPR',
            'status' => $data['status'] ?? 'draft',
            'invoice_date' => $data['invoiceDate'] ?? date('Y-m-d'),
            'due_date' => $data['dueDate'] ?? null,
            'payments' => json_encode($data['payments'] ?? [])
        ]);

        $invoice = $this->db->fetchOne("SELECT * FROM invoices WHERE id = ?", [$id]);
        http_response_code(201);
        echo json_encode(['success' => true, 'data' => $invoice]);
    }

    public function update($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $this->db->update('invoices', [
            'status' => $data['status'] ?? null,
            'total_amount' => $data['totalAmount'] ?? null
        ], 'id = ?', [$id]);

        $invoice = $this->db->fetchOne("SELECT * FROM invoices WHERE id = ?", [$id]);
        echo json_encode(['success' => true, 'data' => $invoice]);
    }

    public function destroy($id) {
        $this->db->delete('invoices', 'id = ?', [$id]);
        echo json_encode(['success' => true, 'message' => 'Invoice deleted']);
    }
}
