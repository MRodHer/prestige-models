# Elite Models - Catálogo de Modelos

Una aplicación web moderna y elegante para gestionar y mostrar un catálogo profesional de modelos, construida con Next.js 14, TypeScript, Tailwind CSS y Supabase.

## Características

- **Página de Inicio Elegante**: Hero section impactante con diseño refinado
- **Catálogo Responsive**: Grid adaptable que muestra las photocards de modelos
- **Modal de Perfil**: Vista detallada con carrusel de fotos y toda la información
- **Panel de Administración**: Dashboard completo para gestionar modelos (CRUD)
- **Autenticación Segura**: Sistema de login con Supabase Auth
- **WhatsApp Integration**: Botón flotante y enlaces directos para contacto
- **Diseño Dark Mode**: Paleta de colores burgundy y rosa malva sobre fondo oscuro
- **Totalmente Responsive**: Optimizado para móviles, tablets y desktop

## Tecnologías Utilizadas

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Storage**: Supabase Storage
- **UI Components**: Radix UI + shadcn/ui
- **Iconos**: Lucide React
- **Notificaciones**: Sonner

## Configuración Inicial

### 1. Configurar Variables de Entorno

Actualiza el archivo `.env.local` con tus credenciales de Supabase:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key

# WhatsApp Configuration
NEXT_PUBLIC_WHATSAPP_NUMBER=1234567890
\`\`\`

### 2. Obtener Credenciales de Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Ve a **Settings** > **API**
4. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Base de Datos

La base de datos ya está configurada con la migración incluida. Incluye:

- Tabla `modelos` con todos los campos necesarios
- Storage bucket `model-photos` para imágenes
- Row Level Security (RLS) configurado
- Políticas de acceso público para lectura
- Políticas de autenticación para escritura

### 4. Configurar Autenticación

1. En Supabase, ve a **Authentication** > **Providers**
2. Asegúrate de que **Email** esté habilitado
3. Desactiva "Confirm email" si quieres registro directo
4. Crea un usuario administrador:
   - Ve a **Authentication** > **Users**
   - Haz clic en **Add user**
   - Ingresa email y contraseña
   - Este será tu usuario para acceder al panel admin

### 5. Instalar Dependencias

\`\`\`bash
npm install
\`\`\`

### 6. Ejecutar en Desarrollo

\`\`\`bash
npm run dev
\`\`\`

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

\`\`\`
/app
  /page.tsx                 # Página de inicio
  /catalogo
    /page.tsx              # Página del catálogo
  /admin
    /page.tsx              # Redirección del admin
    /login
      /page.tsx            # Login del admin
    /dashboard
      /page.tsx            # Dashboard principal
      /nuevo
        /page.tsx          # Agregar modelo
      /editar/[id]
        /page.tsx          # Editar modelo

/components
  /ModelCard.tsx           # Card de modelo en el catálogo
  /ModelModal.tsx          # Modal de perfil detallado
  /ModelForm.tsx           # Formulario para agregar/editar
  /WhatsAppButton.tsx      # Botón flotante de WhatsApp
  /ui                      # Componentes de shadcn/ui

/lib
  /supabase
    /client.ts             # Cliente de Supabase
    /server.ts             # Cliente con service role
  /hooks
    /useAuth.ts            # Hook de autenticación

/types
  /database.ts             # Tipos de la base de datos
  /index.ts                # Tipos generales
\`\`\`

## Uso

### Panel de Administración

1. Accede a `/admin/login`
2. Ingresa las credenciales del usuario que creaste en Supabase
3. Una vez autenticado, podrás:
   - Ver todas las modelos registradas
   - Agregar nuevas modelos
   - Editar modelos existentes
   - Eliminar modelos
   - Subir hasta 5 fotos por modelo

### Agregar una Modelo

1. Haz clic en "Agregar Nueva Modelo"
2. Sube entre 1 y 5 fotos (la primera será la principal)
3. Completa los campos:
   - Nombre
   - Edad
   - Nacionalidad
   - Altura (cm)
   - Medidas: Busto, Cintura, Cadera (cm)
4. Haz clic en "Agregar Modelo"

### Catálogo Público

- Accede a `/catalogo` para ver todas las modelos
- Haz clic en cualquier photocard para ver el perfil completo
- Usa el botón de WhatsApp para contactar

## Despliegue en Producción

### Vercel (Recomendado)

1. Sube el proyecto a GitHub
2. Conecta tu repositorio en [vercel.com](https://vercel.com)
3. Configura las variables de entorno en Vercel
4. Despliega automáticamente

### Netlify

1. Sube el proyecto a GitHub
2. Conecta tu repositorio en [netlify.com](https://netlify.com)
3. Configura las variables de entorno
4. El archivo `netlify.toml` ya está configurado

## Paleta de Colores

- **Burgundy**: #800020 - CTAs y acentos principales
- **Rosa Malva**: #B76E79 - Hovers y borders
- **Rosa Claro**: #D1A2AE - Detalles delicados
- **Negro**: #0a0a0a - Fondo principal
- **Gris Carbón**: #1a1a1a - Fondo secundario
- **Blanco Cremoso**: #f5f5f5 - Texto principal
- **Gris Claro**: #a0a0a0 - Texto secundario

## Personalización

### Cambiar Colores

Edita `tailwind.config.ts` para modificar la paleta de colores:

\`\`\`typescript
colors: {
  burgundy: {
    DEFAULT: '#800020',
    // ...
  },
  // ...
}
\`\`\`

### Modificar WhatsApp

Actualiza `NEXT_PUBLIC_WHATSAPP_NUMBER` en `.env.local` con tu número (incluye código de país sin +)

### SEO

Actualiza los metadatos en `app/layout.tsx`:

\`\`\`typescript
export const metadata: Metadata = {
  title: 'Tu Título',
  description: 'Tu descripción',
  // ...
}
\`\`\`

## Seguridad

- Row Level Security (RLS) habilitado en todas las tablas
- Acceso público de solo lectura al catálogo
- Autenticación requerida para operaciones CRUD
- Service role key solo en servidor
- Variables de entorno nunca expuestas al cliente

## Soporte

Para problemas o preguntas:
1. Revisa la documentación de [Next.js](https://nextjs.org/docs)
2. Consulta la documentación de [Supabase](https://supabase.com/docs)
3. Verifica que todas las variables de entorno estén configuradas correctamente

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
