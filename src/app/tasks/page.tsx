'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function TasksPage() {
  const [task, setTask] = useState('')
  const [mode, setMode] = useState('single')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call to ANUS framework
    setTimeout(() => {
      setResult({
        task: task,
        mode: mode,
        answer: `This is a simulated response for the task: "${task}" using ${mode} mode. In a real implementation, this would connect to the ANUS framework API.`,
        timestamp: new Date().toISOString()
      })
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Execute Tasks</h1>
      
      <Tabs defaultValue="new">
        <TabsList className="mb-6">
          <TabsTrigger value="new">New Task</TabsTrigger>
          <TabsTrigger value="current">Current Task</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>Submit a New Task</CardTitle>
              <CardDescription>
                Enter a task description and select an execution mode
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="task" className="block text-sm font-medium mb-1">
                    Task Description
                  </label>
                  <Textarea
                    id="task"
                    placeholder="Describe your task here..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="min-h-32"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="mode" className="block text-sm font-medium mb-1">
                    Execution Mode
                  </label>
                  <Select value={mode} onValueChange={setMode}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Agent</SelectItem>
                      <SelectItem value="multi">Multi Agent</SelectItem>
                      <SelectItem value="auto">Auto (Recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-1">
                    {mode === 'single' && 'Uses a single agent for simple tasks.'}
                    {mode === 'multi' && 'Uses multiple specialized agents for complex tasks.'}
                    {mode === 'auto' && 'Automatically selects the appropriate mode based on task complexity.'}
                  </p>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Execute Task'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle>Current Task Status</CardTitle>
              <CardDescription>
                View the status and results of your current task
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-4">Processing your task...</p>
                  <p className="text-sm text-gray-500">This may take a few moments</p>
                </div>
              ) : result ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Task</h3>
                    <p className="text-gray-700">{result.task}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Mode</h3>
                    <p className="text-gray-700">{result.mode}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Result</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p>{result.answer}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Timestamp</h3>
                    <p className="text-gray-700">{new Date(result.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ) : (
                <Alert>
                  <AlertTitle>No active task</AlertTitle>
                  <AlertDescription>
                    Submit a new task to see results here.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
