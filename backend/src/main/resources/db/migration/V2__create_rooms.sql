-- ====================================
-- ROOMS
-- ====================================
-- Crear ENUM para categorías de habitación
CREATE TYPE room_category AS ENUM (
    'STANDARD',
    'MATRIMONIAL'
);

-- Crear ENUM para tamaño de cama matrimonial
CREATE TYPE bed_size AS ENUM (
    'SINGLE',
    'DOUBLE'
);

-- Tabla de tipos de habitación
CREATE TABLE room_types (
    room_type_id BIGSERIAL PRIMARY KEY,
    category room_category NOT NULL,
    bed_size bed_size,
    bed_quantity INTEGER CHECK (bed_quantity IN (1, 2, 3)),
    description TEXT
);

-- Crear ENUM para estados de habitación
CREATE TYPE room_status AS ENUM (
    'AVAILABLE',
    'OCCUPIED',
    'MAINTENANCE',
    'CLEANING'
);

-- Tabla de habitaciones
CREATE TABLE rooms (
    room_id BIGSERIAL PRIMARY KEY,
    room_number VARCHAR(10) UNIQUE NOT NULL,
    room_type_id BIGINT NOT NULL,
    floor INTEGER CHECK (floor > 0),
    capacity INTEGER NOT NULL,
    current_status room_status NOT NULL DEFAULT 'AVAILABLE',
    note TEXT,
    CONSTRAINT fk_room_types FOREIGN KEY (room_type_id) REFERENCES room_types(room_type_id) ON DELETE RESTRICT
);

-- Historial de estados de habitación
CREATE TABLE room_status_history (
    room_status_history_id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL,
    previous_status room_status NOT NULL,
    new_status room_status NOT NULL,
    changed_by BIGINT REFERENCES users(user_id) ON DELETE SET NULL,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    note TEXT,
    CONSTRAINT fk_rooms FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE CASCADE
);
