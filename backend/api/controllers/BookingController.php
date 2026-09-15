<?php
/**
 * Booking Controller
 */

class BookingController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function index() {
        $bookings = $this->db->fetchAll("SELECT * FROM bookings ORDER BY created_at DESC");
        echo json_encode(['success' => true, 'data' => $bookings]);
    }

    public function show($id) {
        $booking = $this->db->fetchOne("SELECT * FROM bookings WHERE id = ?", [$id]);
        if (!$booking) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Booking not found']);
            return;
        }
        echo json_encode(['success' => true, 'data' => $booking]);
    }

    public function store() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $id = $this->db->insert('bookings', [
            'booking_number' => $data['bookingNumber'] ?? 'BK-' . time(),
            'lead_id' => $data['leadId'] ?? null,
            'client_name' => $data['clientName'],
            'destination' => $data['destination'] ?? null,
            'start_date' => $data['startDate'] ?? null,
            'end_date' => $data['endDate'] ?? null,
            'pax_adults' => $data['paxAdults'] ?? 1,
            'pax_children' => $data['paxChildren'] ?? 0,
            'total_amount' => $data['totalAmount'] ?? 0,
            'currency' => $data['currency'] ?? 'NPR',
            'status' => $data['status'] ?? 'confirmed',
            'category' => $data['category'] ?? 'vacation_family',
            'special_requests' => $data['specialRequests'] ?? null
        ]);

        $booking = $this->db->fetchOne("SELECT * FROM bookings WHERE id = ?", [$id]);
        http_response_code(201);
        echo json_encode(['success' => true, 'data' => $booking]);
    }

    public function update($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $this->db->update('bookings', [
            'client_name' => $data['clientName'] ?? null,
            'destination' => $data['destination'] ?? null,
            'status' => $data['status'] ?? null,
            'category' => $data['category'] ?? null,
            'total_amount' => $data['totalAmount'] ?? null
        ], 'id = ?', [$id]);

        $booking = $this->db->fetchOne("SELECT * FROM bookings WHERE id = ?", [$id]);
        echo json_encode(['success' => true, 'data' => $booking]);
    }

    public function destroy($id) {
        $this->db->delete('bookings', 'id = ?', [$id]);
        echo json_encode(['success' => true, 'message' => 'Booking deleted']);
    }
}
