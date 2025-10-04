import { useState } from "react";

export default function TipoReserva() {
  const [reserva, setReserva] = useState({
    nombreHuesped: "",
    tipoDocumento: "",
    numeroDocumento: "",
    tipoHabitacion: "",
    cantidadCamas: 1,
    fechaEntrada: "",
    fechaSalida: "",
    correo: "",
    telefono: "",
    observaciones: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reserva),
      });
      if (response.ok) {
        alert("Reserva registrada con éxito");
        setReserva({
          nombreHuesped: "",
          tipoDocumento: "",
          numeroDocumento: "",
          tipoHabitacion: "",
          cantidadCamas: 1,
          fechaEntrada: "",
          fechaSalida: "",
          correo: "",
          telefono: "",
          observaciones: "",
        });
      } else {
        alert("Error al registrar la reserva");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al enviar el formulario");
    }
  };

  const handleTipoHabitacionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tipo = e.target.value;
    setReserva({
      ...reserva,
      tipoHabitacion: tipo,
      cantidadCamas: 1,
    });
  };

  const handleTipoDocumentoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tipo = e.target.value;
    setReserva({
      ...reserva,
      tipoDocumento: tipo,
      numeroDocumento: "", // Limpiar el número de documento al cambiar el tipo
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gray-800 rounded-lg shadow-lg text-white border border-gray-700">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Registrar Reserva</h2>

      <div>
        <label className="block text-sm font-medium text-white">Nombre del Huésped</label>
        <input
          type="text"
          value={reserva.nombreHuesped}
          onChange={(e) => setReserva({ ...reserva, nombreHuesped: e.target.value })}
          className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Tipo de Documento</label>
        <select
          value={reserva.tipoDocumento}
          onChange={handleTipoDocumentoChange}
          className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
          required
        >
          <option value="" className="bg-gray-700">Selecciona un tipo</option>
          <option value="DNI" className="bg-gray-700">DNI</option>
          <option value="RUC" className="bg-gray-700">RUC</option>
        </select>
      </div>

      {reserva.tipoDocumento && (
        <div>
          <label className="block text-sm font-medium text-white">
            Número de {reserva.tipoDocumento}
          </label>
          <input
            type="text"
            value={reserva.numeroDocumento}
            onChange={(e) => setReserva({ ...reserva, numeroDocumento: e.target.value })}
            className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
            placeholder={`Ingrese el número de ${reserva.tipoDocumento}`}
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-white">Tipo de Habitación</label>
        <select
          value={reserva.tipoHabitacion}
          onChange={handleTipoHabitacionChange}
          className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
          required
        >
          <option value="" className="bg-gray-700">Selecciona un tipo</option>
          <option value="simple" className="bg-gray-700">Cama simple</option>
          <option value="matrimonial" className="bg-gray-700">Matrimonial</option>
        </select>
      </div>

      {reserva.tipoHabitacion && (
        <div>
          <label className="block text-sm font-medium text-white">Cantidad de Camas</label>
          <select
            value={reserva.cantidadCamas}
            onChange={(e) => setReserva({ ...reserva, cantidadCamas: parseInt(e.target.value) })}
            className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
            required
          >
            {reserva.tipoHabitacion === "matrimonial" ? (
              <>
                <option value="1" className="bg-gray-700">1 (Matrimonial)</option>
                <option value="2" className="bg-gray-700">2 (Doble Matrimonial)</option>
              </>
            ) : (
              <>
                <option value="1" className="bg-gray-700">1</option>
                <option value="2" className="bg-gray-700">2</option>
                <option value="3" className="bg-gray-700">3</option>
              </>
            )}
          </select>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white">Fecha de Entrada</label>
          <input
            type="date"
            value={reserva.fechaEntrada}
            onChange={(e) => setReserva({ ...reserva, fechaEntrada: e.target.value })}
            className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Fecha de Salida</label>
          <input
            type="date"
            value={reserva.fechaSalida}
            onChange={(e) => setReserva({ ...reserva, fechaSalida: e.target.value })}
            className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Correo Electrónico</label>
        <input
          type="email"
          value={reserva.correo}
          onChange={(e) => setReserva({ ...reserva, correo: e.target.value })}
          className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Teléfono</label>
        <input
          type="text"
          value={reserva.telefono}
          onChange={(e) => setReserva({ ...reserva, telefono: e.target.value })}
          className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white">Observaciones</label>
        <textarea
          value={reserva.observaciones}
          onChange={(e) => setReserva({ ...reserva, observaciones: e.target.value })}
          className="mt-1 block w-full p-3 border rounded-md bg-gray-700 text-white border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-3 bg-yellow-400 text-gray-900 font-bold rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition duration-200"
      >
        Registrar Reserva
      </button>
    </form>
  );
}