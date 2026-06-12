# Bitarium

A modern, collaborative drawing application built with [Excalidraw](https://excalidraw.com/), [Next.js](https://nextjs.org/), and [Convex](https://www.convex.dev/). Create beautiful drawings, organize them in folders, and collaborate with others in real-time.

## Features

- 🎨 **Powerful Drawing Tools** - Built on Excalidraw for a smooth, feature-rich drawing experience
- 📁 **Organized Workspace** - Organize your drawings into folders with custom icons and colors
- 💾 **Auto-Save** - Your work is automatically saved as you draw
- 👥 **Collaboration** - Share drawings and collaborate with others in real-time
- 🔐 **Secure Authentication** - User authentication powered by Convex Auth
- 🌓 **Theme Support** - Light and dark themes for comfortable drawing
- 📱 **Responsive Design** - Works seamlessly across different screen sizes
- ⚡ **Real-Time Sync** - Instant updates across all connected clients

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Convex (database, real-time sync, authentication)
- **Drawing Engine**: Excalidraw
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Package Manager**: pnpm
- **Local Dev URLs**: [portless](https://portless.sh/)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (>=18.0.0)
- [pnpm](https://pnpm.io/) (>=9.0.0)
- A [Convex](https://www.convex.dev/) account (free tier available)
- Git

## Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd bitarium
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up Convex**

If you haven't already, initialize Convex in your project:

```bash
pnpm exec convex dev
```

This will:

- Create a new Convex project (if needed)
- Generate deployment credentials
- Start the Convex development server

4. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_SITE_URL=https://bitarium.localhost
```

You can find these values in your [Convex dashboard](https://dashboard.convex.dev/).

5. **Start the development servers**

```bash
pnpm run dev
```

This command runs both the Next.js frontend (via [portless](https://portless.sh/)) and Convex backend in parallel.

The application will be available at [https://bitarium.localhost](https://bitarium.localhost).

On first run, portless may prompt for your password to trust its local HTTPS certificate and bind port 443. To run the Next.js server without portless, use `pnpm run dev:frontend:app`.

## Project Structure

```
bitarium/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main drawing workspace
│   ├── signin/             # Authentication pages
│   └── server/             # Server-side pages
├── components/             # React components
│   ├── Canvas.tsx          # Main drawing canvas component
│   ├── Sidebar.tsx         # Sidebar with folders and drawings
│   └── ui/                 # Reusable UI components
├── convex/                 # Convex backend
│   ├── schema.ts           # Database schema
│   ├── drawings.ts         # Drawing mutations and queries
│   ├── folders.ts          # Folder mutations and queries
│   └── auth.ts             # Authentication configuration
├── context/                # React context providers
│   └── DrawingContext.tsx  # Drawing state management
├── lib/                    # Utility functions
└── styles/                 # Global styles
```

## Available Scripts

- `pnpm run dev` - Start both frontend and backend development servers
- `pnpm run dev:frontend` - Start only the Next.js frontend at https://bitarium.localhost
- `pnpm run dev:frontend:app` - Start Next.js directly (no portless proxy)
- `pnpm run dev:backend` - Start only the Convex backend
- `pnpm run build` - Build the application for production
- `pnpm run start` - Start the production server
- `pnpm run lint` - Run ESLint to check code quality

## Usage

1. **Sign In**: Click the sign-in button to authenticate with your account
2. **Create a Drawing**: Start drawing immediately - a new drawing is created automatically
3. **Organize**: Use the sidebar to create folders and organize your drawings
4. **Name Your Drawings**: Click on the drawing name at the top to rename it
5. **Switch Drawings**: Click on any drawing in the sidebar to switch between drawings
6. **Share**: Use the share dialog to collaborate with others

## Development

### Running in Development Mode

```bash
pnpm run dev
```

This starts:

- Next.js dev server at `https://bitarium.localhost` (via portless)
- Convex dev server (handles backend and real-time sync)

### Building for Production

```bash
pnpm run build
```

This creates an optimized production build in the `.next` directory.

### Deploying

1. **Deploy Convex Backend**

```bash
pnpm exec convex deploy
```

2. **Deploy Frontend**

Deploy to your preferred platform (Vercel, Netlify, etc.):

- **Vercel**: Connect your repository and deploy automatically
- **Manual**: Run `pnpm run build` and deploy the `.next` directory

Make sure to set the environment variables in your deployment platform:

- `CONVEX_DEPLOYMENT`
- `NEXT_PUBLIC_CONVEX_URL`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Excalidraw](https://excalidraw.com/) for the amazing drawing library
- [Convex](https://www.convex.dev/) for the backend infrastructure
- [Next.js](https://nextjs.org/) for the React framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
