# Crear la estructura de carpetas para el frontend del Hotel Imperial

# Ruta base (asume que el script se ejecuta desde la raíz del proyecto)
$basePath = "src"

# Crear carpetas principales
New-Item -ItemType Directory -Path "$basePath\assets" -Force
New-Item -ItemType Directory -Path "$basePath\components" -Force
New-Item -ItemType Directory -Path "$basePath\layouts" -Force
New-Item -ItemType Directory -Path "$basePath\pages" -Force
New-Item -ItemType Directory -Path "$basePath\services" -Force
New-Item -ItemType Directory -Path "$basePath\store" -Force
New-Item -ItemType Directory -Path "$basePath\utils" -Force

# Crear carpetas para la interfaz general
New-Item -ItemType Directory -Path "$basePath\pages\general" -Force
New-Item -ItemType Directory -Path "$basePath\pages\general\dashboard" -Force

# Crear carpetas para procesos estratégicos
New-Item -ItemType Directory -Path "$basePath\pages\estrategicos" -Force
New-Item -ItemType Directory -Path "$basePath\pages\estrategicos\planificacion-estrategica" -Force
New-Item -ItemType Directory -Path "$basePath\pages\estrategicos\planificacion-estrategica\components" -Force
New-Item -ItemType Directory -Path "$basePath\pages\estrategicos\planificacion-estrategica\views" -Force
New-Item -ItemType Directory -Path "$basePath\pages\estrategicos\gestion-calidad" -Force
New-Item -ItemType Directory -Path "$basePath\pages\estrategicos\gestion-calidad\components" -Force
New-Item -ItemType Directory -Path "$basePath\pages\estrategicos\gestion-calidad\views" -Force

# Crear carpetas para procesos misionales
New-Item -ItemType Directory -Path "$basePath\pages\misionales" -Force
New-Item -ItemType Directory -Path "$basePath\pages\misionales\gestion-reservas" -Force
New-Item -ItemType Directory -Path "$basePath\pages\misionales\gestion-reservas\components" -Force
New-Item -ItemType Directory -Path "$basePath\pages\misionales\gestion-reservas\views" -Force
New-Item -ItemType Directory -Path "$basePath\pages\misionales\gestion-habitaciones" -Force
New-Item -ItemType Directory -Path "$basePath\pages\misionales\gestion-habitaciones\components" -Force
New-Item -ItemType Directory -Path "$basePath\pages\misionales\gestion-habitaciones\views" -Force
New-Item -ItemType Directory -Path "$basePath\pages\misionales\atencion-cliente" -Force
New-Item -ItemType Directory -Path "$basePath\pages\misionales\atencion-cliente\components" -Force
New-Item -ItemType Directory -Path "$basePath\pages\misionales\atencion-cliente\views" -Force

# Crear carpetas para procesos de soporte
New-Item -ItemType Directory -Path "$basePath\pages\soporte" -Force
New-Item -ItemType Directory -Path "$basePath\pages\soporte\finanzas-administracion" -Force
New-Item -ItemType Directory -Path "$basePath\pages\soporte\finanzas-administracion\components" -Force
New-Item -ItemType Directory -Path "$basePath\pages\soporte\finanzas-administracion\views" -Force
New-Item -ItemType Directory -Path "$basePath\pages\soporte\limpieza-mantenimiento" -Force
New-Item -ItemType Directory -Path "$basePath\pages\soporte\limpieza-mantenimiento\components" -Force
New-Item -ItemType Directory -Path "$basePath\pages\soporte\limpieza-mantenimiento\views" -Force

# Crear carpetas para servicios
New-Item -ItemType Directory -Path "$basePath\services\estrategicos" -Force
New-Item -ItemType Directory -Path "$basePath\services\misionales" -Force
New-Item -ItemType Directory -Path "$basePath\services\soporte" -Force

# Crear carpetas para el store
New-Item -ItemType Directory -Path "$basePath\store\estrategicos" -Force
New-Item -ItemType Directory -Path "$basePath\store\misionales" -Force
New-Item -ItemType Directory -Path "$basePath\store\soporte" -Force

# Mensaje de confirmación
Write-Host "Estructura de carpetas creada exitosamente en: $basePath"
