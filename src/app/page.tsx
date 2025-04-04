'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useTheme } from '@/lib/theme-context'

export default function Home() {
  const { showJokes } = useTheme()
  
  // Random ANUS jokes from the CLI
  const anusJokes = [
    "ANUS: Because 'Autonomous Networked Utility System' sounds better in meetings.",
    "ANUS: The backend system that handles all your crap.",
    "ANUS: Boldly going where no framework has gone before.",
    "ANUS: It's not a bug, it's a feature... a very uncomfortable feature.",
    "ANUS: For when your code needs that extra push from behind.",
    "ANUS: Working hard so you don't have to explain the acronym to your boss.",
    "ANUS: The framework that makes other developers snicker during code review.",
    "ANUS: Tight integration with your backend systems.",
    "ANUS: Because 'BUTT' was already taken as an acronym.",
    "ANUS: Making developers uncomfortable in stand-up meetings since 2023."
  ]

  // Get a random joke
  const randomJoke = anusJokes[Math.floor(Math.random() * anusJokes.length)]

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">🍑 Autonomous Networked Utility System</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-6">
          A powerful, flexible, and accessible open-source AI agent framework designed to revolutionize task automation.
        </p>
        {showJokes && (
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg mb-8 max-w-2xl">
            <p className="italic text-gray-700 dark:text-gray-300">{randomJoke}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle>Execute Tasks</CardTitle>
            <CardDescription className="dark:text-gray-300">Submit tasks to the ANUS framework</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 dark:text-gray-300">Execute complex tasks through natural language instructions.</p>
            <Button asChild className="w-full">
              <Link href="/tasks">Go to Tasks</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle>Manage Agents</CardTitle>
            <CardDescription className="dark:text-gray-300">View and manage AI agents</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 dark:text-gray-300">Explore available agents and their capabilities.</p>
            <Button asChild className="w-full">
              <Link href="/agents">View Agents</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle>Task History</CardTitle>
            <CardDescription className="dark:text-gray-300">Review past task executions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 dark:text-gray-300">Access and review your task execution history.</p>
            <Button asChild className="w-full">
              <Link href="/history">View History</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription className="dark:text-gray-300">Manage system settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 dark:text-gray-300">View and modify ANUS configuration settings.</p>
            <Button asChild className="w-full">
              <Link href="/config">Configure</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Why ANUS?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
            <h3 className="font-bold mb-2">Truly Open Source</h3>
            <p className="dark:text-gray-300">No barriers, no invite codes, just pure open-source goodness</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
            <h3 className="font-bold mb-2">Hybrid Architecture</h3>
            <p className="dark:text-gray-300">Combines single-agent simplicity with multi-agent power</p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
            <h3 className="font-bold mb-2">Flexible Model Support</h3>
            <p className="dark:text-gray-300">Works with OpenAI models, open-source models, or your own</p>
          </div>
        </div>
      </div>
    </main>
  )
}
