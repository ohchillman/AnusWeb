'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { useTheme } from '@/lib/theme-context'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  TaskType, 
  classifyTask, 
  getTaskTypeDescription,
  getTaskStatusMessage
} from '@/lib/task-classifier'
import { renderTaskData } from '@/components/task-renderers'
import { generateTaskData, generateTaskResponse } from '@/lib/task-handlers'

// Mock task history for persistence
const STORAGE_KEY = 'anus_task_history';

export default function TasksPage() {
  const { darkMode } = useTheme()
  const [task, setTask] = useState('')
  const [mode, setMode] = useState('auto')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [progress, setProgress] = useState(0)
  const [taskHistory, setTaskHistory] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('new')
  const [taskType, setTaskType] = useState<TaskType>(TaskType.GENERAL)
  const [taskData, setTaskData] = useState<any>(null)

  // Load task history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY)
    if (savedHistory) {
      try {
        setTaskHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error('Failed to parse task history:', e)
      }
    }
  }, [])

  // Save task history to localStorage
  useEffect(() => {
    if (taskHistory.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(taskHistory))
    }
  }, [taskHistory])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!task.trim()) return
    
    // Classify the task
    const detectedTaskType = classifyTask(task);
    setTaskType(detectedTaskType);
    
    setIsLoading(true)
    setProgress(0)
    setActiveTab('current')
    setTaskData(null)
    
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 500)
    
    // Generate task-specific data
    let specificTaskData = null;
    
    // Use the task handlers to generate appropriate data
    specificTaskData = generateTaskData(detectedTaskType, task);
    setTaskData(specificTaskData);
    
    // Generate a response based on the task type and mode
    setTimeout(() => {
      clearInterval(progressInterval)
      setProgress(100)
      
      let taskResponse = generateTaskResponse(task, mode, detectedTaskType, specificTaskData);
      
      const newResult = {
        id: Date.now().toString(),
        task: task,
        mode: mode,
        answer: taskResponse,
        timestamp: new Date().toISOString(),
        status: 'completed',
        taskType: detectedTaskType,
        taskData: specificTaskData
      }
      
      setResult(newResult)
      setTaskHistory(prev => [newResult, ...prev].slice(0, 10)) // Keep only the 10 most recent tasks
      setIsLoading(false)
      setTask('')
    }, 3000 + Math.random() * 2000) // Random time between 3-5 seconds
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Execute Tasks</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="new">New Task</TabsTrigger>
          <TabsTrigger value="current">Current Task</TabsTrigger>
          <TabsTrigger value="history">Task History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new">
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Submit a New Task</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Enter a task description and select an execution mode
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="task" className="block text-sm font-medium mb-1 dark:text-gray-200">
                    Task Description
                  </label>
                  <Textarea
                    id="task"
                    placeholder="Describe your task here..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="min-h-32 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="mode" className="block text-sm font-medium mb-1 dark:text-gray-200">
                    Execution Mode
                  </label>
                  <Select value={mode} onValueChange={setMode}>
                    <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      <SelectItem value="single">Single Agent</SelectItem>
                      <SelectItem value="multi">Multi Agent</SelectItem>
                      <SelectItem value="auto">Auto (Recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {mode === 'single' && 'Uses a single agent for simple tasks.'}
                    {mode === 'multi' && 'Uses multiple specialized agents for complex tasks.'}
                    {mode === 'auto' && 'Automatically selects the appropriate mode based on task complexity.'}
                  </p>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading || !task.trim()}>
                  {isLoading ? 'Processing...' : 'Execute Task'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="current">
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Current Task Status</CardTitle>
              <CardDescription className="dark:text-gray-300">
                View the status and results of your current task
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 space-y-4">
                  <Progress value={progress} className="w-full h-2" />
                  <p className="mt-2 dark:text-gray-200">{progress < 100 ? 'Processing your task...' : 'Finalizing results...'}</p>
                  <div className="space-y-2 text-left border p-4 rounded-md dark:border-slate-700">
                    <p className="text-sm font-medium dark:text-gray-300">Task: {task}</p>
                    <p className="text-sm dark:text-gray-300">Mode: {mode}</p>
                    <p className="text-sm dark:text-gray-300">Type: {getTaskTypeDescription(taskType)}</p>
                    <p className="text-sm dark:text-gray-300">Status: {getTaskStatusMessage(taskType, progress)}</p>
                  </div>
                </div>
              ) : result ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium dark:text-gray-200">Task</h3>
                    <p className="text-gray-700 dark:text-gray-300">{result.task}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium dark:text-gray-200">Mode</h3>
                    <p className="text-gray-700 dark:text-gray-300">{result.mode}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium dark:text-gray-200">Type</h3>
                    <p className="text-gray-700 dark:text-gray-300">{getTaskTypeDescription(result.taskType)}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium dark:text-gray-200">Result</h3>
                    {renderTaskData(result.taskType, result.taskData) || (
                      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-md">
                        <p className="dark:text-gray-200">{result.answer}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium dark:text-gray-200">Timestamp</h3>
                    <p className="text-gray-700 dark:text-gray-300">{new Date(result.timestamp).toLocaleString()}</p>
                  </div>
                  
                  <Button onClick={() => setActiveTab('new')} className="mt-4">
                    Submit Another Task
                  </Button>
                </div>
              ) : (
                <Alert className="dark:bg-slate-700 dark:text-gray-200">
                  <AlertTitle>No active task</AlertTitle>
                  <AlertDescription className="dark:text-gray-300">
                    Submit a new task to see results here.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Task History</CardTitle>
              <CardDescription className="dark:text-gray-300">
                View your previously executed tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              {taskHistory.length > 0 ? (
                <div className="space-y-4">
                  {taskHistory.map((historyItem) => (
                    <div key={historyItem.id} className="border rounded-md p-4 dark:border-slate-700">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium dark:text-gray-200">{historyItem.task.length > 50 ? `${historyItem.task.substring(0, 50)}...` : historyItem.task}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(historyItem.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <span className="mr-4">Mode: {historyItem.mode}</span>
                        <span className="mr-4">Status: {historyItem.status}</span>
                        <span>Type: {getTaskTypeDescription(historyItem.taskType || TaskType.GENERAL)}</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => {
                        setResult(historyItem)
                        setActiveTab('current')
                      }} className="dark:border-slate-600 dark:text-gray-300">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <Alert className="dark:bg-slate-700 dark:text-gray-200">
                  <AlertTitle>No task history</AlertTitle>
                  <AlertDescription className="dark:text-gray-300">
                    Your completed tasks will appear here.
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
