# 🤖 AI ChatBot - Modern Full-Stack Chat Application

A beautiful, responsive AI-powered chatbot built with React, TypeScript, and Node.js. Features a sleek ChatGPT-like interface with real-time messaging, typing indicators, and smart AI responses.

![ChatBot Demo](https://img.shields.io/badge/Status-Active-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) ![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)

## ✨ Features

### 🎨 **Modern UI/UX**

- **ChatGPT-inspired design** with gradient backgrounds and smooth animations
- **Responsive layout** that works on desktop, tablet, and mobile
- **Dark/Light theme support** with beautiful color schemes
- **Smooth animations** and micro-interactions for better UX

### 💬 **Chat Features**

- **Real-time messaging** with instant responses
- **Typing indicators** with animated dots
- **Message history** with conversation persistence
- **Copy to clipboard** functionality for bot responses
- **Auto-scroll** to latest messages
- **Error handling** with user-friendly error messages

### 🔧 **Technical Features**

- **TypeScript** for type safety and better development experience
- **Modular architecture** with reusable components
- **RESTful API** with proper error handling
- **Form validation** with react-hook-form
- **Responsive design** with Tailwind CSS
- **Modern React patterns** with hooks and functional components

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ai-chatbot.git
   cd ai-chatbot
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cd packages/server
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development servers**

   ```bash
   # Start both client and server
   bun run dev

   # Or start individually
   cd packages/server && bun run dev  # Backend on :5000
   cd packages/client && bun run dev  # Frontend on :5173
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` and start chatting!

## 📁 Project Structure

```
Full-stack-project/
├── packages/
│   ├── client/                 # React frontend
│   │   ├── src/
│   │   │   ├── components/     # Reusable UI components
│   │   │   │   ├── ChatBot.tsx        # Main chat container
│   │   │   │   ├── ChatMessages.tsx   # Messages display
│   │   │   │   ├── ChatMessage.tsx    # Individual message
│   │   │   │   ├── ChatInput.tsx      # Message input form
│   │   │   │   ├── TypingIndicator.tsx # Typing animation
│   │   │   │   └── ui/               # Base UI components
│   │   │   ├── lib/           # Utilities and helpers
│   │   │   └── App.tsx        # Main application
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── server/                # Node.js backend
│       ├── controllers/       # Request handlers
│       ├── services/         # Business logic
│       ├── repositories/     # Data access layer
│       ├── routes.ts         # API routes
│       └── index.ts          # Server entry point
├── README.md
└── package.json
```

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Performant forms with easy validation
- **Lucide React** - Beautiful SVG icons
- **React Markdown** - Render markdown in messages

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server-side development
- **Zod** - Schema validation for API requests
- **Bun** - Fast JavaScript runtime and package manager

## 🎯 API Endpoints

### Chat API

```typescript
POST /api/chat
Content-Type: application/json

{
  "prompt": "Hello, how are you?",
  "conversationId": "uuid-string"
}

Response:
{
  "message": "Hello! I'm doing great, thank you for asking. How can I help you today?"
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in `packages/server/`:

```env
PORT=5000
HUGGING_FACE_API_KEY=your_api_key_here  # Optional for AI integration
```

### Customization

- **Styling**: Modify Tailwind classes in components
- **AI Responses**: Update `chat.service.ts` for different AI providers
- **Validation**: Adjust schemas in `chat.controller.ts`
- **UI Components**: Customize components in `src/components/`

## 🚀 Deployment

### Frontend (Vercel/Netlify)

```bash
cd packages/client
bun run build
# Deploy dist/ folder
```

### Backend (Railway/Heroku)

```bash
cd packages/server
bun run build
# Deploy with start script: "bun run start"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by ChatGPT's clean and intuitive interface
- Built with modern web technologies and best practices
- Designed for scalability and maintainability

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the documentation
- Contact the maintainers

---

**Made with ❤️ and modern web technologies**
