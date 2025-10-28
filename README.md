# TfL Status Alert

A modern web application that displays real-time status information for Transport for London (TfL) services.

## Features

- **Real-time Status Updates**: Displays current service status for all TfL transport modes
- **Multi-Mode Support**: Shows Tube lines, DLR, Tram, Elizabeth Line, and London Overground
- **Organized by Transport Type**: Lines are grouped by their transport mode using tabs
- **Official TfL Colors**: Uses the official TfL colour standard for accurate brand representation
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Progressive Web App**: Can be installed on your device for quick access
- **Line Starring**: Pin your favorite lines to the top for quick access

## Transport Modes Supported

The app dynamically fetches and displays all available transport modes from the TfL API:

- **Tube**: All London Underground lines
- **DLR**: Docklands Light Railway
- **Overground**: All London Overground lines (Liberty, Lioness, Mildmay, Suffragette, Weaver, Windrush)
- **Elizabeth Line**: TfL Rail / Elizabeth Line
- **Tram**: London Tramlink

## Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NaphatrB/tfl-status-alert-web.git
   cd tfl-status-alert-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run serve
```

## Development

- `npm start` or `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run serve` - Preview the production build

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Workbox** - Service worker for PWA functionality

## Data Sources

- **TfL Unified API**: Real-time status data from [api.tfl.gov.uk](https://api.tfl.gov.uk)
- **TfL Colour Standard**: Official colors from [TfL's brand guidelines](https://content.tfl.gov.uk/tfl-colour-standard.pdf)

## License

MIT

## Acknowledgements

Data provided by Transport for London (TfL) under the [TfL Open Data License](https://tfl.gov.uk/corporate/terms-and-conditions/transport-data-service)
