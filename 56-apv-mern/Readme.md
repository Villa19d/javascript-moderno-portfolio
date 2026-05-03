# APV — Administrador de Pacientes Veterinaria

Aplicación fullstack MERN para gestionar pacientes de una clínica veterinaria. Los veterinarios pueden registrarse, confirmar su cuenta por email, iniciar sesión y administrar sus pacientes (agregar, editar, eliminar).

**Demo en vivo:** [adminpacientesmern.netlify.app](https://adminpacientesmern.netlify.app)

---

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | React 19, React Router v7, Tailwind CSS v4, Vite |
| Backend | Node.js, Express (Serverless Functions) |
| Base de datos | MongoDB Atlas + Mongoose |
| Autenticación | JWT (jsonwebtoken) + bcrypt |
| Email | Nodemailer + SMTP (Gmail/Mailtrap) |
| Deploy Frontend | Netlify |
| Deploy Backend | Vercel |

---

## Funcionalidades

- Registro de veterinarios con confirmación por email
- Recuperación de password por email
- Login con JWT persistido en localStorage
- Rutas protegidas (solo accesibles con sesión activa)
- CRUD completo de pacientes (nombre, propietario, email, fecha, síntomas)
- Cada veterinario solo ve y gestiona sus propios pacientes
- Editar perfil (nombre, email, teléfono, web)
- Cambiar password con validación del password actual
- Cerrar sesión

---

## Estructura del proyecto

```
apv/
├── backend/
│   ├── config/          # Conexión a MongoDB
│   ├── controllers/     # Lógica de veterinarios y pacientes
│   ├── helpers/         # JWT, IDs, emails
│   ├── middleware/       # Auth con JWT
│   ├── models/          # Schemas de Mongoose
│   └── routes/          # Rutas de la API
└── frontend/
    └── src/
        ├── components/  # Header, Footer, Formularios, Paciente
        ├── context/     # AuthProvider, PacientesProvider
        ├── hooks/       # useAuth, usePacientes
        ├── layout/      # AuthLayout, RutaProtegida
        └── pages/       # Login, Registrar, Admin, Perfil...
```

---

## API Endpoints

### Veterinarios
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/api/veterinarios` | Registrar | No |
| POST | `/api/veterinarios/login` | Iniciar sesión | No |
| GET | `/api/veterinarios/confirmar/:token` | Confirmar cuenta | No |
| POST | `/api/veterinarios/olvide-password` | Solicitar reset | No |
| GET | `/api/veterinarios/olvide-password/:token` | Verificar token | No |
| POST | `/api/veterinarios/olvide-password/:token` | Nuevo password | No |
| GET | `/api/veterinarios/perfil` | Ver perfil | ✅ |
| PUT | `/api/veterinarios/perfil` | Editar perfil | ✅ |
| PUT | `/api/veterinarios/cambiar-password` | Cambiar password | ✅ |

### Pacientes
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/api/pacientes` | Listar pacientes | ✅ |
| POST | `/api/pacientes` | Agregar paciente | ✅ |
| GET | `/api/pacientes/:id` | Ver paciente | ✅ |
| PUT | `/api/pacientes/:id` | Editar paciente | ✅ |
| DELETE | `/api/pacientes/:id` | Eliminar paciente | ✅ |

---

## Instalación local

### Requisitos
- Node.js 18+
- Cuenta en MongoDB Atlas
- Cuenta en Mailtrap (para emails en desarrollo)

### Backend

```bash
cd backend
npm install
```

Crear archivo `.env`:

```env
MONGO_URI=tu_uri_de_mongodb_atlas
PORT=4000
JWT_SECRET=tu_secreto_jwt
FRONTEND_URL=http://localhost:5173
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=tu_usuario_mailtrap
EMAIL_PASS=tu_password_mailtrap
```

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Crear archivo `.env.local`:

```env
VITE_REACT_APP_BACKEND_URL=http://localhost:4000/api
```

```bash
npm run dev
```

---

## Deploy

### Backend → Vercel
1. Conectar el repositorio en [vercel.com](https://vercel.com)
2. El proyecto cuenta con un archivo `vercel.json` configurado con `rewrites` para apuntar al archivo `api/index.js` y hacer funcionar Express con Vercel Serverless Functions.
3. Asegurarse de agregar todas las variables de entorno (`MONGO_URI`, `JWT_SECRET`, credenciales de `EMAIL_*`, etc.) en el panel de **Vercel -> Settings -> Environment Variables**.
4. ¡Importante! Configurar la IP `0.0.0.0/0` en MongoDB Atlas (Network Access) para permitir que Vercel se conecte correctamente.

### Frontend → Netlify
1. Conectar el repositorio en [netlify.com](https://netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Agregar variable de entorno: `VITE_REACT_APP_BACKEND_URL=https://tu-backend.vercel.app/api`
5. El archivo `public/_redirects` con `/* /index.html 200` ya está incluido para que el routing de React funcione correctamente

---

## Autor

**Rodrigo Villar** — [@Villa19d](https://github.com/Villa19d)

Proyecto desarrollado como parte del curso *JavaScript Moderno — Fullstack MERN*.