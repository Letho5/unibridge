# 🌉 UniBridge

**One Bridge. Every Voice. No Barriers.**

UniBridge is a universal accessibility platform that breaks communication barriers for deaf, blind, and speech-impaired users through real-time sign language recognition, voice transcription, and multi-modal conversation support.

## ✨ Features

### 🎤 VoiceLink
- Real-time speech-to-text transcription
- Natural text-to-speech with multiple voices
- Live conversation captioning
- Ambient sound detection and alerts

### 🤟 SignLink
- Real-time ASL/BSL/ISL sign language recognition
- 3D avatar that signs back
- Fingerspelling support
- Emotion/tone indicators

### 👁️ AccessiView
- Screen reader integration
- Document/image OCR
- High contrast & large text modes
- Color blind friendly palettes

### 💬 CommuniChat
- Multi-modal real-time conversation
- Deaf + Hearing + Speech-impaired communication
- Split-screen conversation view
- Emergency quick-phrases

### 📚 LearnHub
- Interactive sign language lessons
- Speech exercises
- Progress tracking with gamification
- AI-powered feedback

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Letho5/unibridge.git
cd unibridge

# Install dependencies
npm install

# Set up environment variables
cp backend/.env.example backend/.env
# Edit backend/.env with your settings

# Initialize database
npm run db:push

# Start development servers
npm run dev