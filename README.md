# PRD Translator

Transform complex Product Requirements Documents (PRDs) into structured connector prompts ready for Connector development.

## 🚀 Features

- **OpenAI Integration**: Uses GPT-4 to intelligently parse and structure PRDs
- **Modern UI**: Clean, responsive design with dark/light mode support
- **Real-time Processing**: Live character counting and validation
- **Export Options**: Copy to clipboard or download as text file
- **Secure**: API keys stored locally in browser storage
- **Professional Output**: Generates structured prompts ready for Cursor

## 🛠️ How It Works

1. **Configure OpenAI**: Add your OpenAI API key in the settings section
2. **Input PRD**: Paste your complex PRD text (minimum 100 characters)
3. **Transform**: Click "Transform PRD" to process with AI
4. **Get Results**: Receive a structured connector prompt ready for Cursor
5. **Deploy**: Copy the output and paste directly into Cursor for connector development

## 📋 What You Get

The app transforms your unstructured PRD into a clean, organized prompt like this:

```
**CONNECTOR PROMPT FOR CURSOR:**

Build a [CONNECTOR_NAME] connector with the following specifications:

**Basic Information:**
- Connector Name: [extracted name]
- Description: [extracted description]
- Primary Use Case: [what users will search/access]
- API Documentation: [if mentioned]

**Authentication:**
- Primary Method: [API Token/OAuth 2.0/Basic Auth]
- Required Fields: [list the auth fields needed]

**Core Data Types:**
- Primary Objects: [main content type - P0 priority]
- Secondary Objects: [supporting content - P1 priority]
- Tertiary Objects: [additional content - P2 priority]

[...and much more structured information...]
```

## 🏃‍♂️ Getting Started

1. **Clone and Install**:
   ```bash
   npm install
   npm run dev
   ```

2. **Get OpenAI API Key**:
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Add it to the app settings

3. **Start Transforming**:
   - Paste your PRD content
   - Click "Transform PRD"
   - Copy the structured output
   - Use in Cursor to generate connectors

## 🎨 Tech Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first styling
- **OpenAI API** - GPT-4 for intelligent parsing
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Smooth notifications
- **Vite** - Fast development and building

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # App header with branding
│   ├── InputSection.jsx    # PRD input area
│   ├── OutputSection.jsx   # Results display
│   ├── SettingsSection.jsx # API configuration
│   ├── LoadingSpinner.jsx  # Loading states
│   └── ThemeToggle.jsx     # Dark/light mode
├── services/
│   └── openaiService.js    # OpenAI API integration
├── hooks/
│   └── useOpenAI.js        # OpenAI state management
├── App.jsx                 # Main application
└── main.jsx               # App entry point
```

## 🔧 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🌟 Key Features in Detail

### Intelligent PRD Parsing
- Extracts connector names and descriptions
- Identifies authentication methods
- Categorizes data types by priority (P0/P1/P2)
- Maps filtering capabilities
- Determines technical requirements

### Professional UI/UX
- Responsive design for all devices
- Dark/light mode with system preference detection
- Smooth animations and transitions
- Comprehensive error handling
- Accessible keyboard navigation

### Secure & Local
- API keys stored in browser localStorage
- No server-side data storage
- Direct OpenAI API communication
- Secure credential handling

## 📝 Example Usage

Perfect for transforming complex PRDs like:
- GitHub Connector specifications
- Confluence integration requirements
- ServiceNow connector documents
- Any enterprise connector PRD

Input your complex PRD → Get structured Cursor prompt → Generate working connector code instantly!

## 🤝 Contributing

This app streamlines the connector development process by automatically structuring PRDs into developer-ready prompts, saving hours of manual organization and ensuring consistent connector specifications.
