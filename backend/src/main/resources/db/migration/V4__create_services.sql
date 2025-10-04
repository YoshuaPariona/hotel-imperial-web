-- ====================================
-- SERVICIOS
-- ====================================
-- Tabla de catálogo de servicios
CREATE TABLE services (
    service_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
);

-- Crear ENUM para estados de servicios
CREATE TYPE service_status AS ENUM (
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED'
);

-- Servicios solicitados por habitación
CREATE TABLE room_services (
    room_service_id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL,
    service_id BIGINT NOT NULL,
    reservation_id BIGINT,     -- opcional: servicio ligado a una estadía
    handled_by BIGINT NOT NULL, -- staff que atiende
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status service_status NOT NULL DEFAULT 'PENDING',
    CONSTRAINT fk_room_service_room FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE RESTRICT,
    CONSTRAINT fk_room_service_service FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE RESTRICT,
    CONSTRAINT fk_room_service_reservation FOREIGN KEY (reservation_id) REFERENCES reservations(reservation_id) ON DELETE CASCADE,
    CONSTRAINT fk_room_service_user FOREIGN KEY (handled_by) REFERENCES users(user_id) ON DELETE RESTRICT
);
