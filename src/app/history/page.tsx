'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function HistoryPage() {
  // Mock data for task history
  const taskHistory = [
    {
      id: 'task-001',
      task: 'Research the latest advancements in quantum computing',
      mode: 'multi',
      status: 'completed',
      timestamp: '2025-03-30T10:15:30Z',
      answer: 'Recent advancements in quantum computing include improvements in error correction, increased qubit coherence times, and new algorithms for optimization problems...'
    },
    {
      id: 'task-002',
      task: 'Generate a Python script to analyze stock market data',
      mode: 'single',
      status: 'completed',
      timestamp: '2025-03-29T14:22:45Z',
      answer: 'Here is a Python script that uses pandas and matplotlib to analyze stock market data...'
    },
    {
      id: 'task-003',
      task: 'Summarize the key points from the attached research paper',
      mode: 'single',
      status: 'completed',
      timestamp: '2025-03-28T09:05:12Z',
      answer: 'The key points from the research paper include: 1) A novel approach to natural language processing using transformer models...'
    },
    {
      id: 'task-004',
      task: 'Plan a marketing strategy for a new tech product',
      mode: 'multi',
      status: 'completed',
      timestamp: '2025-03-27T16:30:00Z',
      answer: 'The marketing strategy should focus on digital channels, influencer partnerships, and technical demonstrations...'
    },
    {
      id: 'task-005',
      task: 'Debug the JavaScript code for the user authentication module',
      mode: 'single',
      status: 'completed',
      timestamp: '2025-03-26T11:45:22Z',
      answer: 'The issue in the authentication module was related to an incorrect token validation process...'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Task History</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Tasks</CardTitle>
          <CardDescription>
            View your past task executions and results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taskHistory.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{new Date(task.timestamp).toLocaleString()}</TableCell>
                  <TableCell className="font-medium">
                    {task.task.length > 50 ? `${task.task.substring(0, 50)}...` : task.task}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {task.mode}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Task Details</h2>
        <Card>
          <CardHeader>
            <CardTitle>{taskHistory[0].task}</CardTitle>
            <CardDescription>
              Executed on {new Date(taskHistory[0].timestamp).toLocaleString()} using {taskHistory[0].mode} mode
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Result</h3>
                <div className="bg-gray-50 p-4 rounded-md mt-2">
                  <p>{taskHistory[0].answer}</p>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline">Run Again</Button>
                <Button variant="outline">Export Result</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
