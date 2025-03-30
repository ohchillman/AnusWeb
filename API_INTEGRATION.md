# API Integration Guide for ANUS Web Interface

This document provides instructions for integrating the ANUS Web Interface with the ANUS backend framework.

## Overview

The ANUS Web Interface is designed to communicate with the ANUS backend through a REST API. This guide explains how to configure the web interface to connect to your ANUS backend instance.

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory of the project with the following variables:

```
NEXT_PUBLIC_ANUS_API_URL=http://your-anus-backend-url/api
NEXT_PUBLIC_ANUS_API_KEY=your_api_key_if_required
```

### API Endpoints

The web interface expects the following API endpoints to be available on your ANUS backend:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/tasks` | POST | Submit a new task |
| `/api/tasks` | GET | Get list of tasks |
| `/api/tasks/:id` | GET | Get task details |
| `/api/agents` | GET | Get list of available agents |
| `/api/config` | GET | Get current configuration |
| `/api/config` | PUT | Update configuration |

## Implementation Details

### Task Execution

To connect the task execution functionality to your ANUS backend, modify the `handleSubmit` function in `/src/app/tasks/page.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!task.trim()) return
  
  setIsLoading(true)
  setProgress(0)
  setActiveTab('current')
  
  try {
    // Start progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15
        return newProgress >= 95 ? 95 : newProgress
      })
    }, 500)
    
    // Send task to ANUS backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_ANUS_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ANUS_API_KEY}`
      },
      body: JSON.stringify({
        task: task,
        mode: mode
      })
    })
    
    clearInterval(progressInterval)
    setProgress(100)
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    const newResult = {
      id: data.id || Date.now().toString(),
      task: task,
      mode: mode,
      answer: data.result || 'Task completed successfully',
      timestamp: data.timestamp || new Date().toISOString(),
      status: data.status || 'completed'
    }
    
    setResult(newResult)
    setTaskHistory(prev => [newResult, ...prev].slice(0, 10))
    setTask('')
  } catch (error) {
    console.error('Error executing task:', error)
    setResult({
      id: Date.now().toString(),
      task: task,
      mode: mode,
      answer: `Error: Failed to execute task. ${error.message}`,
      timestamp: new Date().toISOString(),
      status: 'error'
    })
  } finally {
    setIsLoading(false)
  }
}
```

### Configuration Management

To connect the configuration page to your ANUS backend, modify the `/src/app/config/page.tsx` file:

```typescript
// Load configuration from API
useEffect(() => {
  const fetchConfig = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ANUS_API_URL}/config`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ANUS_API_KEY}`
        }
      })
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      const data = await response.json()
      setConfig(data)
    } catch (error) {
      console.error('Error loading configuration:', error)
    }
  }
  
  fetchConfig()
}, [])

// Save configuration to API
const handleSave = async () => {
  setIsSaving(true)
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ANUS_API_URL}/config`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ANUS_API_KEY}`
      },
      body: JSON.stringify(config)
    })
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    // Update theme settings
    if (themeContext) {
      themeContext.setDarkMode(config.ui.dark_mode)
      themeContext.setShowJokes(config.ui.show_jokes)
    }
  } catch (error) {
    console.error('Error saving configuration:', error)
  } finally {
    setIsSaving(false)
    setIsEditing(false)
  }
}
```

### Theme Integration

The theme settings (dark mode and jokes) are managed through the ThemeContext. To ensure these settings are synchronized with your ANUS backend configuration:

1. When loading configuration from the API, update the ThemeContext:

```typescript
// In config/page.tsx after fetching config
if (data.ui) {
  themeContext.setDarkMode(data.ui.dark_mode)
  themeContext.setShowJokes(data.ui.show_jokes)
}
```

2. When toggling theme settings directly (e.g., from the navbar), update the backend:

```typescript
// In navbar.tsx
const handleToggleDarkMode = async () => {
  toggleDarkMode()
  
  try {
    // Get current config first
    const response = await fetch(`${process.env.NEXT_PUBLIC_ANUS_API_URL}/config`)
    if (!response.ok) return
    
    const config = await response.json()
    
    // Update dark_mode setting
    await fetch(`${process.env.NEXT_PUBLIC_ANUS_API_URL}/config`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ANUS_API_KEY}`
      },
      body: JSON.stringify({
        ...config,
        ui: {
          ...config.ui,
          dark_mode: !darkMode
        }
      })
    })
  } catch (error) {
    console.error('Error updating theme setting:', error)
  }
}
```

## Error Handling

Implement proper error handling for API requests:

```typescript
try {
  // API request code
} catch (error) {
  console.error('API Error:', error)
  // Show user-friendly error message
  // For example:
  setErrorMessage('Failed to connect to ANUS backend. Please check your connection and try again.')
} finally {
  // Cleanup code
}
```

## Testing the Integration

1. Start your ANUS backend server
2. Configure the web interface with the correct API URL
3. Start the web interface with `npm run dev`
4. Test each feature to ensure it communicates correctly with the backend

## Troubleshooting

- **CORS Issues**: Ensure your ANUS backend allows CORS requests from your web interface domain
- **Authentication Errors**: Verify API keys and authentication headers
- **404 Errors**: Check that all required API endpoints are implemented in your backend
- **Data Format Issues**: Ensure the data format matches between frontend and backend

For additional help, refer to the ANUS framework documentation or open an issue on the GitHub repository.
