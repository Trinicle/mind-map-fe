# MindMap Frontend

A modern Angular web application that transforms meeting transcripts into interactive, AI-powered mind maps and knowledge discovery tools.

## Key Features

### **Transcript Analysis & Mind Mapping**
- **Smart Upload**: Support for multiple file formats (`.vtt`, `.docx`, `.txt`)
- **AI-Powered Topic Extraction**: Automatically identify and categorize discussion topics
- **Interactive Network Visualization**: Dynamic mind maps using Cytoscape.js for exploring topic relationships
- **Topic Deep Dive**: Detailed topic views with context and related information

###  **Intelligent Chat Interface**
- **Transcript-Aware Chatbot**: Query specific transcripts or general knowledge
- **Conversation Management**: Create, save, and manage multiple chat conversations
- **Context-Aware Responses**: AI responses with source attribution from transcripts
- **Real-time Messaging**: Seamless chat experience with typing indicators and history

### **Dashboard & Organization**
- **Mind Map Gallery**: Visual dashboard showing all created mind maps
- **Advanced Search**: Filter mind maps by title, tags, and date
- **Tag-based Organization**: Categorize and organize transcripts with custom tags
- **Quick Access**: Easy navigation to recent and frequently accessed content

### **Authentication & Security**
- **Secure Authentication**: User registration and login with Supabase integration
- **Session Management**: Automatic token refresh and secure session handling
- **Protected Routes**: Route guards ensuring authenticated access to features
- **User Profile Management**: Account settings and user preferences

### **Modern User Experience**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Component-based Architecture**: Modular, reusable UI components
- **Loading States**: Skeleton screens and progress indicators for better UX
- **Toast Notifications**: Real-time feedback for user actions

## 🛠️ Technology Stack

### **Frontend Framework**
- **Angular 20.1**: Latest Angular with standalone components and signals
- **TypeScript**: Type-safe development with modern ES features
- **RxJS**: Reactive programming for data flow and state management

### **Styling & UI**
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **DaisyUI**: Beautiful, semantic component library built on Tailwind
- **ng-icons**: Comprehensive icon library with multiple icon sets

### **Data Visualization**
- **Cytoscape.js**: Graph theory library for interactive network visualization
- **Dynamic Theming**: Theme-aware graph styling and layouts
- **Interactive Elements**: Clickable nodes, zoom, pan, and navigation

### **State Management**
- **NgRx Signals**: Modern state management with reactive signals
- **Store Pattern**: Centralized stores for different feature domains
- **Service Layer**: Injectable services for API communication and business logic

### **Development Tools**
- **Angular CLI**: Development server, building, and testing tools
- **ESLint & Prettier**: Code quality and formatting standards
- **Karma & Jasmine**: Unit testing framework and tools

## Project Structure

```
src/
├── app/
│   ├── core/                     # Core application services
│   │   ├── auth/                 # Authentication system
│   │   ├── navigation/           # Navigation components
│   │   ├── theme/                # Theme management
│   │   └── toast/                # Notification system
│   ├── modules/                  # Feature modules
│   │   ├── chat/                 # Chat functionality
│   │   │   ├── conversations/    # Conversation management
│   │   │   ├── current-chat/     # Active chat interface
│   │   │   └── new-chat/         # New conversation creation
│   │   ├── dashboard/            # Main dashboard
│   │   │   ├── dashboard-card/   # Mind map cards
│   │   │   └── dashboard-search/ # Search functionality
│   │   ├── mindmap/              # Mind map visualization
│   │   │   ├── overview/         # Mind map details and transcript
│   │   │   ├── network/          # Interactive graph view
│   │   │   └── topic/            # Individual topic details
│   │   └── welcome/              # Landing page
│   └── shared/                   # Shared utilities
│       ├── api/                  # API configuration
│       └── types/                # TypeScript type definitions
```

## Key Components & Features

### **Dashboard Module**
- **Mind Map Cards**: Visual representation of uploaded transcripts
- **Create Dialog**: Upload interface with file validation and metadata entry
- **Search & Filter**: Advanced filtering by title, tags, and date
- **Skeleton Loading**: Smooth loading experience with placeholder content

### **Chat Module**
- **Conversation List**: Sidebar showing all user conversations
- **Message Interface**: Real-time chat with typing indicators
- **Source Attribution**: AI responses linked to specific transcript sections
- **New Chat Creation**: Start conversations with or without transcript context

### **Mind Map Module**
- **Overview Panel**: Transcript summary, tags, and follow-up questions
- **Network Visualization**: Interactive graph of topic relationships
- **Topic Details**: Deep dive into specific discussion topics
- **Responsive Layout**: Adaptive layout for different screen sizes

### **Authentication System**
- **Supabase Integration**: Secure authentication with JWT tokens
- **Route Guards**: Protected routes with automatic redirects
- **Session Persistence**: Automatic token refresh and session management
- **User Store**: Centralized user state management

## Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Angular CLI** (v20.1 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/Trinicle/mind-map-fe.git
cd mind-map-fe

# Install dependencies
npm install

# Start development server
npm start
```

### Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you make changes to the source files.


## Configuration

### Environment Setup
The application uses Angular's environment configuration for different deployment targets. Configure API endpoints, authentication settings, and feature flags in the environment files.

### Supported File Formats
- **VTT Files** (`.vtt`): Video Text Tracks for subtitle files
- **Word Documents** (`.docx`): Microsoft Word documents
- **Text Files** (`.txt`): Plain text transcripts

### API Integration
The application communicates with a backend API for:
- User authentication and session management
- Transcript upload and processing
- Mind map data and topic extraction
- Chat functionality and AI responses

## UI/UX Features

### **Responsive Design**
- Mobile-first approach with breakpoint-based layouts
- Touch-friendly interfaces for mobile and tablet users
- Adaptive navigation for different screen sizes

### **Accessibility**
- Semantic HTML structure for screen readers
- Keyboard navigation support
- High contrast color schemes
- Focus management and ARIA labels

### **Performance**
- Lazy loading for feature modules
- OnPush change detection strategy
- Optimized bundle sizes with tree shaking
- Efficient state management with signals

### **User Experience**
- Skeleton screens for loading states
- Real-time feedback with toast notifications
- Intuitive navigation with breadcrumbs
- Contextual help and tooltips
