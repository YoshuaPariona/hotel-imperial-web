-- ====================================
-- ROLES & USERS
-- ====================================

CREATE TABLE roles (
    role_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    role_id BIGINT NOT NULL REFERENCES roles(role_id),
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ====================================
-- ROOMS
-- ====================================

CREATE TYPE room_category AS ENUM ('STANDARD', 'MATRIMONIAL');
CREATE TYPE bed_size AS ENUM ('SINGLE', 'DOUBLE');
CREATE TYPE room_status AS ENUM ('DISPONIBLE', 'RESERVADA', 'OCUPADA', 'MANTENIMIENTO', 'LIMPIEZA');

CREATE TABLE room_types (
    room_type_id BIGSERIAL PRIMARY KEY,
    category room_category NOT NULL,
    bed_size bed_size,
    bed_quantity INTEGER,
    description TEXT
);

CREATE TABLE rooms (
    room_id BIGSERIAL PRIMARY KEY,
    room_number VARCHAR(10) UNIQUE NOT NULL,
    room_type_id BIGINT NOT NULL REFERENCES room_types(room_type_id),
    floor INTEGER,
    capacity INTEGER,
    current_status room_status NOT NULL DEFAULT 'DISPONIBLE',
    note TEXT
);

CREATE TABLE room_status_history (
    room_status_history_id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL REFERENCES rooms(room_id) ON DELETE CASCADE,
    previous_status room_status NOT NULL,
    new_status room_status NOT NULL,
    changed_by BIGINT REFERENCES users(user_id),
    changed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    note TEXT
);

-- ====================================
-- RESERVAS & HUÉSPEDES
-- ====================================

CREATE TYPE reservation_status AS ENUM ('CONFIRMADO', 'CANCELADO', 'COMPLETADO');

CREATE TYPE document_type AS ENUM ('DNI', 'PASAPORTE');

CREATE TABLE guests (
    guest_id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    doc_type document_type DEFAULT 'DNI',
    document_number VARCHAR(50) UNIQUE,
    phone VARCHAR(30),
    email VARCHAR(150) UNIQUE
);

CREATE TABLE reservations (
    reservation_id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL REFERENCES rooms(room_id),
    user_id BIGINT NOT NULL REFERENCES users(user_id),
    guest_id BIGINT REFERENCES guests(guest_id),
    check_in TIMESTAMPTZ NOT NULL,
    check_out TIMESTAMPTZ NOT NULL,
    status reservation_status NOT NULL DEFAULT 'CONFIRMADO',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE room_occupancy (
    occupancy_id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL REFERENCES rooms(room_id),
    guest_id BIGINT NOT NULL REFERENCES guests(guest_id),
    reservation_id BIGINT NOT NULL REFERENCES reservations(reservation_id) ON DELETE CASCADE
);

-- ====================================
-- INCIDENCIAS
-- ====================================

CREATE TYPE incident_priority AS ENUM ('BAJA', 'MEDIA', 'ALTA', 'CRITICA');
CREATE TYPE incident_status AS ENUM ('PENDIENTE', 'EN_PROCESO', 'RESUELTA');
CREATE TYPE incident_type AS ENUM (
    'MANTENIMIENTO',
    'LIMPIEZA',
    'RUIDO',
    'DETERIORO_MOBILIARIO',
    'FUGA_AGUA',
    'ELECTRICIDAD'
);
CREATE TYPE incident_area AS ENUM (
    'HABITACION',
    'LAVABO',
    'PASILLO',
    'AREA_COMUN',
    'COCINA',
    'ASCENSOR'
);

CREATE TABLE incidents (
    incident_id BIGSERIAL PRIMARY KEY,
    type incident_type NOT NULL,
    area incident_area NOT NULL,
    location_detail VARCHAR(100),
    description TEXT NOT NULL,
    priority incident_priority NOT NULL DEFAULT 'MEDIA',
    team VARCHAR(50) NOT NULL,
    reported_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    status incident_status NOT NULL DEFAULT 'PENDIENTE',

    reported_by BIGINT REFERENCES users(user_id),
    handled_by BIGINT REFERENCES users(user_id),
    room_id BIGINT REFERENCES rooms(room_id)
);

CREATE TABLE incident_history (
    incident_history_id BIGSERIAL PRIMARY KEY,
    incident_id BIGINT NOT NULL REFERENCES incidents(incident_id) ON DELETE CASCADE,
    old_status incident_status NOT NULL,
    new_status incident_status NOT NULL,
    changed_by BIGINT REFERENCES users(user_id),
    changed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    note TEXT
);
