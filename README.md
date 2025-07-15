# Restaurant Management System

A modern restaurant management system built with Next.js, featuring a comprehensive dashboard, order management, and analytics.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: Auth.js
- **UI Components**: Radix UI, Lucide Icons, ShadCn
- **Form Handling**: React Hook Form
- **State Management**: TanStack Query

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL (if running locally without Docker)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd restaurant
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/restaurant"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Start the Database

#### Using Docker (Recommended)

```bash
docker-compose up -d
```

This will start a PostgreSQL container with the following configuration:

- Port: 5432
- Username: postgres
- Password: postgres
- Database: restaurant

#### Using Local PostgreSQL

If you prefer to use a local PostgreSQL instance, make sure it's running and update the `DATABASE_URL` in your `.env` file accordingly.

### 5. Run Database Migrations

```bash
npm run db:generate
npm run db:migrate
```

### 6. Start the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed the database with initial data

## Project Structure

```
restaurant/
├── app/                    # Next.js app directory
├── components/            # React components
├── db/                    # Database configuration and migrations
├── drizzle/              # Drizzle ORM schema
├── lib/                  # Utility functions
├── providers/            # Context providers
├── public/              # Static assets
├── schemas/             # Zod schemas
└── types/               # TypeScript type definitions
```

## Features

- Real-time dashboard with sales analytics
- Order management system
- Table service tracking
- Menu management
- Staff management
- Sales reporting
- Responsive design
- Dark mode support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
