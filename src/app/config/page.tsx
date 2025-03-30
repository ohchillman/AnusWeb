'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useTheme } from '@/lib/theme-context'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function ConfigPage() {
  const { darkMode, showJokes, setDarkMode, setShowJokes } = useTheme()
  
  // Mock configuration data
  const [config, setConfig] = useState({
    api_keys: {
      openai: 'sk-***********************************',
      anthropic: 'sk-ant-***************************',
    },
    models: {
      default: 'gpt-4',
      fallback: 'gpt-3.5-turbo',
    },
    agents: {
      max_agents: 5,
      default_mode: 'auto',
    },
    logging: {
      level: 'info',
      file_output: true,
      max_history: 100,
    },
    ui: {
      show_jokes: showJokes,
      dark_mode: darkMode,
    }
  })

  // Update config when theme context changes
  useEffect(() => {
    setConfig(prev => ({
      ...prev,
      ui: {
        ...prev.ui,
        show_jokes: showJokes,
        dark_mode: darkMode
      }
    }))
  }, [darkMode, showJokes])

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    
    // Apply theme settings immediately
    setDarkMode(config.ui.dark_mode)
    setShowJokes(config.ui.show_jokes)
    
    // Simulate API call to save configuration
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
      setSaveSuccess(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Configuration</h1>
        {isEditing ? (
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)} className="dark:border-slate-600 dark:text-gray-300">Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit Configuration</Button>
        )}
      </div>
      
      {saveSuccess && (
        <Alert className="mb-4 bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800">
          <AlertDescription className="text-green-800 dark:text-green-200">
            Configuration saved successfully!
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="logging">Logging</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Configure general system settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show_jokes" className="dark:text-gray-200">Show ANUS Jokes</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Display humorous ANUS jokes in the interface</p>
                </div>
                <Switch
                  id="show_jokes"
                  checked={config.ui.show_jokes}
                  onCheckedChange={(checked) => {
                    setConfig({...config, ui: {...config.ui, show_jokes: checked}})
                    if (!isEditing) {
                      setShowJokes(checked)
                    }
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark_mode" className="dark:text-gray-200">Dark Mode</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Use dark theme for the interface</p>
                </div>
                <Switch
                  id="dark_mode"
                  checked={config.ui.dark_mode}
                  onCheckedChange={(checked) => {
                    setConfig({...config, ui: {...config.ui, dark_mode: checked}})
                    if (!isEditing) {
                      setDarkMode(checked)
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Configure API keys for external services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="openai_key" className="dark:text-gray-200">OpenAI API Key</Label>
                <Input
                  id="openai_key"
                  type="password"
                  value={config.api_keys.openai}
                  onChange={(e) => 
                    setConfig({...config, api_keys: {...config.api_keys, openai: e.target.value}})}
                  disabled={!isEditing}
                  className="mt-1 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="anthropic_key" className="dark:text-gray-200">Anthropic API Key</Label>
                <Input
                  id="anthropic_key"
                  type="password"
                  value={config.api_keys.anthropic}
                  onChange={(e) => 
                    setConfig({...config, api_keys: {...config.api_keys, anthropic: e.target.value}})}
                  disabled={!isEditing}
                  className="mt-1 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="models">
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Model Settings</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Configure AI model settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="default_model" className="dark:text-gray-200">Default Model</Label>
                <Input
                  id="default_model"
                  value={config.models.default}
                  onChange={(e) => 
                    setConfig({...config, models: {...config.models, default: e.target.value}})}
                  disabled={!isEditing}
                  className="mt-1 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="fallback_model" className="dark:text-gray-200">Fallback Model</Label>
                <Input
                  id="fallback_model"
                  value={config.models.fallback}
                  onChange={(e) => 
                    setConfig({...config, models: {...config.models, fallback: e.target.value}})}
                  disabled={!isEditing}
                  className="mt-1 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Used when the default model is unavailable</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agents">
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Agent Settings</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Configure agent behavior and limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="max_agents" className="dark:text-gray-200">Maximum Agents</Label>
                <Input
                  id="max_agents"
                  type="number"
                  value={config.agents.max_agents}
                  onChange={(e) => 
                    setConfig({...config, agents: {...config.agents, max_agents: parseInt(e.target.value)}})}
                  disabled={!isEditing}
                  className="mt-1 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Maximum number of agents to use in multi-agent mode</p>
              </div>
              
              <div>
                <Label htmlFor="default_mode" className="dark:text-gray-200">Default Mode</Label>
                <Input
                  id="default_mode"
                  value={config.agents.default_mode}
                  onChange={(e) => 
                    setConfig({...config, agents: {...config.agents, default_mode: e.target.value}})}
                  disabled={!isEditing}
                  className="mt-1 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Default execution mode (single, multi, auto)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logging">
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Logging Settings</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Configure logging and history settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="log_level" className="dark:text-gray-200">Log Level</Label>
                <Input
                  id="log_level"
                  value={config.logging.level}
                  onChange={(e) => 
                    setConfig({...config, logging: {...config.logging, level: e.target.value}})}
                  disabled={!isEditing}
                  className="mt-1 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Logging detail level (debug, info, warning, error)</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="file_output" className="dark:text-gray-200">File Output</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Save logs to file</p>
                </div>
                <Switch
                  id="file_output"
                  checked={config.logging.file_output}
                  onCheckedChange={(checked) => 
                    setConfig({...config, logging: {...config.logging, file_output: checked}})}
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <Label htmlFor="max_history" className="dark:text-gray-200">Max History</Label>
                <Input
                  id="max_history"
                  type="number"
                  value={config.logging.max_history}
                  onChange={(e) => 
                    setConfig({...config, logging: {...config.logging, max_history: parseInt(e.target.value)}})}
                  disabled={!isEditing}
                  className="mt-1 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Maximum number of task history entries to keep</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="mt-8 dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle>Raw Configuration</CardTitle>
          <CardDescription className="dark:text-gray-300">
            View or edit the raw configuration JSON
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={JSON.stringify(config, null, 2)}
            onChange={(e) => {
              try {
                setConfig(JSON.parse(e.target.value))
              } catch (error) {
                // Handle invalid JSON
              }
            }}
            disabled={!isEditing}
            className="font-mono h-64 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          />
        </CardContent>
      </Card>
    </div>
  )
}
