'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default function AgentsPage() {
  // Mock data for agents
  const agents = [
    {
      id: 'agent-001',
      name: 'Researcher',
      type: 'specialized',
      primary: true,
      description: 'Specialized in information gathering and research tasks',
      capabilities: ['Web search', 'Document analysis', 'Data verification']
    },
    {
      id: 'agent-002',
      name: 'Coder',
      type: 'specialized',
      primary: false,
      description: 'Expert in code generation and software development',
      capabilities: ['Code generation', 'Debugging', 'Code optimization']
    },
    {
      id: 'agent-003',
      name: 'Planner',
      type: 'specialized',
      primary: false,
      description: 'Specialized in task planning and coordination',
      capabilities: ['Task breakdown', 'Resource allocation', 'Timeline estimation']
    },
    {
      id: 'agent-004',
      name: 'General Assistant',
      type: 'general',
      primary: false,
      description: 'All-purpose agent for various tasks',
      capabilities: ['Task execution', 'Basic research', 'General assistance']
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Agent Management</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Available Agents</CardTitle>
          <CardDescription>
            View and manage AI agents in the ANUS framework
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">
                    {agent.name}
                    {agent.primary && (
                      <Badge variant="outline" className="ml-2">
                        Primary
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{agent.type}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell>{agent.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{agent.name}</CardTitle>
                {agent.primary && (
                  <Badge variant="outline">Primary</Badge>
                )}
              </div>
              <CardDescription>{agent.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{agent.description}</p>
              <div>
                <h4 className="text-sm font-medium mb-2">Capabilities:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {agent.capabilities.map((capability, index) => (
                    <li key={index} className="text-sm">{capability}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
