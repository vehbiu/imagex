"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download, Trash2 } from 'lucide-react'
import { DownloadItem } from '@/lib/types'
import { saveAs } from 'file-saver'

export default function DownloadHistory() {
  const [history, setHistory] = useState<DownloadItem[]>([])

  const updateHistory = () => {
    const storedHistory = localStorage.getItem('downloadHistory')
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory))
    }
  }

  useEffect(() => {
    updateHistory();
    const interval = setInterval(updateHistory, 1000)
    return () => clearInterval(interval)
  }, [])

  const removeFromHistory = (id: string) => {
    const newHistory = history.filter(item => item.id !== id)
    setHistory(newHistory)
    localStorage.setItem('downloadHistory', JSON.stringify(newHistory))
  }

  const redownload = (item: DownloadItem) => {
    saveAs(item.blob, item.fileName)
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
      {history.length === 0 ? (
        <p className="text-center text-muted-foreground">No download history yet.</p>
      ) : (

        <ul className="space-y-4">
          <Button
            className="w-full"
            variant="outline"
            size="sm"
            onClick={() => {
              setHistory([])
              localStorage.removeItem('downloadHistory')
            }}
            aria-label="Clear download history"
          >
            Clear History
          </Button>
          {history.map((item) => (
            <li key={item.id} className="flex items-center justify-between space-x-2">
              <div className="flex-1 space-y-1">
                {/* item.before (name) -> item.fileName */}
                <div className="flex items-center space-x-1">
                  <p className="text-sm font-medium leading-none text-green-600">{item.fileName}</p>
                  <p className="text-sm font-medium leading-none text-muted-foreground">({item.before})</p>
                </div>
                {/* <p className="text-sm font-medium leading-none">{item.fileName}</p> */}
                <p className="text-xs text-muted-foreground">{formatTimestamp(item.timestamp)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => redownload(item)}
                  aria-label={`Redownload ${item.fileName}`}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeFromHistory(item.id)}
                  aria-label={`Remove ${item.fileName} from history`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}



        </ul>
      )}
    </ScrollArea>
  )
}
