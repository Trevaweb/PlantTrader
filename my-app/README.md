# PlantTrader 🌱

A modern web application for plant enthusiasts to trade and manage their plant collections. Built with Next.js, TypeScript, and MongoDB.

## Features

- **Plant Wishlist**: Keep track of plants you want to acquire
- **Trade Management**: List plants you're willing to trade
- **Priority System**: Mark plants as high priority in your wishlist
- **Category Organization**: Plants are organized by categories (Pothos, Monstera, etc.)
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, React
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Styling**: CSS Modules

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd plant-trader
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
my-app/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/         # API routes
│   │   └── page.tsx     # Main page component
│   ├── lib/
│   │   ├── db/         # Database connection
│   │   └── models/     # MongoDB models
│   └── types/          # TypeScript types
├── public/             # Static assets
└── package.json        # Project dependencies
```

## API Endpoints

- `GET /api/plants` - Get all plants
- `POST /api/plants` - Create a new plant
- `GET /api/plants/[id]` - Get a specific plant
- `PUT /api/plants/[id]` - Update a plant
- `DELETE /api/plants/[id]` - Delete a plant

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Plant icons and emojis used for plant representations
- Inspired by plant trading communities
