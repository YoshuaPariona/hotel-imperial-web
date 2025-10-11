--Ejecutar primero
create database imperial_database;

--Ejecutar edentro de la base de datos despues de correr el backend
-- Insertar roles
INSERT INTO roles (name, description) VALUES
('Administrador', 'Acceso total al sistema'),
('Recepcionista', 'Gestión de reservas y check-in/check-out'),
('Mantenimiento', 'Gestión de incidencias y mantenimiento'),
('Limpieza', 'Gestión de limpieza de habitaciones');

-- Insertar usuarios
INSERT INTO users (role_id, first_name, last_name, username, email, hashed_password, phone) VALUES
(1, 'Admin', 'Principal', 'admin', 'admin@hotel.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy...', '999999999'),
(2, 'Recepcionista', 'Uno', 'recepcion1', 'recepcion1@hotel.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy...', '111111111'),
(3, 'Mantenimiento', 'Uno', 'mantenimiento1', 'mantenimiento1@hotel.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy...', '222222222'),
(4, 'Limpieza', 'Uno', 'limpieza1', 'limpieza1@hotel.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy...', '333333333');

-- Insertar tipos de habitación
INSERT INTO room_types (category, bed_size, bed_quantity, description) VALUES
('STANDARD', 'SINGLE', 1, 'Habitación estándar con cama individual'),
('STANDARD', 'DOUBLE', 1, 'Habitación estándar con cama doble'),
('MATRIMONIAL', 'DOUBLE', 1, 'Habitación matrimonial con cama doble');

-- Insertar habitaciones
INSERT INTO rooms (room_number, room_type_id, floor, capacity, current_status) VALUES
('101', 1, 1, 1, 'DISPONIBLE'),
('102', 2, 1, 2, 'DISPONIBLE'),
('201', 3, 2, 2, 'DISPONIBLE');

-- Insertar huéspedes
INSERT INTO guests (first_name, last_name, doc_type, document_number, phone, email) VALUES
('Juan', 'Pérez', 'DNI', '12345678', '987654321', 'juan.perez@example.com'),
('María', 'Gómez', 'DNI', '87654321', '912345678', 'maria.gomez@example.com');

-- Insertar reservas
INSERT INTO reservations (room_id, user_id, guest_id, check_in, check_out, status) VALUES
(1, 2, 1, '2025-11-15 14:00:00', '2025-11-17 12:00:00', 'CONFIRMADO'),
(2, 2, 2, '2025-11-16 15:00:00', '2025-11-19 11:00:00', 'CONFIRMADO');

-- Insertar ocupación de habitaciones
INSERT INTO room_occupancy (room_id, guest_id, reservation_id) VALUES
(1, 1, 1),
(2, 2, 2);

-- Insertar histórico de estado de habitaciones
INSERT INTO room_status_history (room_id, previous_status, new_status, changed_by, note) VALUES
(1, 'DISPONIBLE', 'RESERVADA', 2, 'Reserva confirmada para Juan Pérez'),
(2, 'DISPONIBLE', 'RESERVADA', 2, 'Reserva confirmada para María Gómez');

-- Insertar incidencias
INSERT INTO incidents (type, area, location_detail, description, priority, team, reported_by, room_id) VALUES
('MANTENIMIENTO', 'HABITACION', '101', 'Foco fundido en la lámpara', 'BAJA', 'Mantenimiento', 3, 1),
('LIMPIEZA', 'LAVABO', '201', 'Falta de toallas limpias', 'MEDIA', 'Limpieza', 4, 3);

-- Insertar histórico de incidencias
INSERT INTO incident_history (incident_id, old_status, new_status, changed_by, note) VALUES
(1, 'PENDIENTE', 'EN_PROCESO', 3, 'Se asignó técnico para revisión'),
(2, 'PENDIENTE', 'RESUELTA', 4, 'Se repusieron toallas limpias');
