-- ====================================
-- RESERVAS & HUÉSPEDES
-- ====================================
-- Crear ENUM para estados de reserva
CREATE TYPE reservation_status AS ENUM (
    'CONFIRMED',
    'CANCELLED',
    'COMPLETED'
);

-- Tabla de huéspedes
CREATE TABLE guests (
    guest_id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    document_type VARCHAR(20),
    document_number VARCHAR(50),
    phone VARCHAR(30),
    email VARCHAR(150) UNIQUE,
    CONSTRAINT unique_document UNIQUE (document_type, document_number)
);

-- Tabla de reservas
CREATE TABLE reservations (
    reservation_id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,   -- staff que gestiona
    guest_id BIGINT,           -- titular de la reserva
    check_in TIMESTAMP WITH TIME ZONE NOT NULL,
    check_out TIMESTAMP WITH TIME ZONE NOT NULL,
    status reservation_status NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_reservation_room FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE RESTRICT,
    CONSTRAINT fk_reservation_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT,
    CONSTRAINT fk_reservation_guest FOREIGN KEY (guest_id) REFERENCES guests(guest_id) ON DELETE SET NULL,
    CONSTRAINT check_dates CHECK (check_out > check_in)
);

-- Tabla de ocupación de habitaciones (huespedes vinculados a reservas)
CREATE TABLE room_occupancy (
    occupancy_id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL,
    guest_id BIGINT NOT NULL,
    reservation_id BIGINT NOT NULL,
    check_in TIMESTAMP WITH TIME ZONE NOT NULL,
    check_out TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_occupancy_room FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE RESTRICT,
    CONSTRAINT fk_occupancy_guest FOREIGN KEY (guest_id) REFERENCES guests(guest_id) ON DELETE RESTRICT,
    CONSTRAINT fk_occupancy_reservation FOREIGN KEY (reservation_id) REFERENCES reservations(reservation_id) ON DELETE CASCADE,
    CONSTRAINT check_occupancy_dates CHECK (check_out IS NULL OR check_out > check_in)
);
