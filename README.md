*PromptUI*
-

PromptUI es una aplicación web para generar interfaces de usuario (UI) a partir de un prompt de texto, usando un modelo de lenguaje. El proyecto es local y escalable, pensado para pruebas y desarrollo rápido sin depender de servicios pagos.


🚀 Características
-

Generación de UI en HTML, CSS y JS a partir de un prompt.

Previsualización en tiempo real en un iframe dentro de la app.

Exportación de todos los archivos generados en un ZIP.

Backend en Node.js + Express, frontend con Tailwind CSS y JS vanilla.

Compatible con modelos gratuitos de Hugging Face o mocks locales.

⚡ Instalación y uso
-
Clona el repositorio:

git clone https://github.com/tuusuario/v0-portatil.git
cd v0-portatil


Instala dependencias:

npm install


Crea un archivo .env con tu API key de Hugging Face:

HF_API_KEY=tu_hf_api_key
PORT=5173


Arranca el servidor en modo desarrollo:

npm run dev


Abre tu navegador en: http://localhost:5173

🎯 Cómo usar
-

Escribe un prompt describiendo la UI que quieres generar.

Haz clic en “Generar”.

Visualiza la UI en el iframe y exporta los archivos con “Exportar .zip”.

💡 Notas
-

Si no tienes API key o quieres pruebas rápidas, el backend genera un mock de UI para que el flujo funcione sin límite.

Proyecto pensado para aprendizaje, prototipos y demostraciones.

🔧 Tecnologías
-

Node.js + Express

Tailwind CSS

JavaScript vanilla

Hugging Face Inference API (opcional)

JSZip + FileSaver para exportación
