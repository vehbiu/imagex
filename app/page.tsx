"use client"

import { useState, useRef, ChangeEvent, useEffect } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, FileImage, Download, ChevronDown, Unlock, Lock } from 'lucide-react'

import { DownloadItem } from '@/lib/types'
import DownloadHistory from '@/components/download-history'

import { saveAs } from 'file-saver'
import { cn } from '@/lib/utils'

export default function ImageConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [outputFormat, setOutputFormat] = useState<string>('png')
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<DownloadItem[]>([])
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [aspectRatioLocked, setAspectRatioLocked] = useState(true)

  useEffect(() => {
    const storedHistory = localStorage.getItem('downloadHistory')
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory))
    }
  }, [])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setError(null)
      // Reset width and height to image dimensions
      const img = new Image()
      img.src = URL.createObjectURL(file)
      img.onload = () => {
        setWidth(img.width)
        setHeight(img.height)
      }
    }
  }

  const addToHistory = (item: DownloadItem) => {
    const newHistory = [item, ...history.slice(0, 9)]
    setHistory(newHistory)
    localStorage.setItem('downloadHistory', JSON.stringify(newHistory))
  }

  const convertImage = () => {
    if (!selectedFile) {
      setError('Please select an image to convert.')
      return
    }

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        return setError('Failed to create canvas context. Please try again.')
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((blob) => {
        if (!blob) return setError('Failed to convert the image. Please try again.')
        const beforeName = selectedFile.name.split('.')[0] as string;
        const fileName = `${beforeName}.${outputFormat}`
        saveAs(blob, fileName)
        const newItem: DownloadItem = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          format: outputFormat,
          before: beforeName + '.' + selectedFile.name.split('.').pop(),
          fileName,
          blob,
        }
        addToHistory(newItem)
      }, `image/${outputFormat}`)
    }
    img.onerror = () => {
      setError('Failed to load the image. Please try again with a different file.')
    }
    img.src = URL.createObjectURL(selectedFile)
  }

  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newWidth = Number(e.target.value);
    setWidth(newWidth);
    if (aspectRatioLocked) {
      const ratio = height / width;
      setHeight(newWidth * ratio);
    }
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newHeight = Number(e.target.value);
    setHeight(newHeight);
    if (aspectRatioLocked) {
      const ratio = width / height;
      setWidth(newHeight * ratio);
    }
  };

  const toggleAspectRatioLock = () => {
    setAspectRatioLocked(!aspectRatioLocked);
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card>
        <CardHeader className='flex flex-row items-center'>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 px-2 rounded-lg">
            X
          </h1>
          <div className="flex flex-col ml-2">
            <CardTitle>Image Converter</CardTitle>
            <CardDescription>Convert your images to different formats in the browser</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-upload">Upload Image</Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>
          {previewUrl && (
            <div className="overflow-hidden border border-gray-200 rounded-lg aspect-video">
              <img src={previewUrl} alt="Preview" className="object-contain w-full h-full" />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="output-format">Output Format</Label>
            <Select onValueChange={(value) => setOutputFormat(value)}>
              <SelectTrigger id="output-format">
                <SelectValue placeholder="Select output format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="jpeg">JPEG</SelectItem>
                <SelectItem value="webp">WebP</SelectItem>
                <SelectItem value="avif">AVIF</SelectItem>
                <SelectItem value="bmp">BMP</SelectItem>
                <SelectItem value="ico">ICO</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2 items-end">
            <div className="space-y-2">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={handleWidthChange}
                min={1}
              />
            </div>
            <Button onClick={toggleAspectRatioLock} variant="outline" className='p-2'>
              {aspectRatioLocked ? <Unlock /> : <Lock />}
            </Button>
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={handleHeightChange}
                min={1}
              />
            </div>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <FileImage className="w-4 h-4 mr-2" />
            Select Image
          </Button>
          <Button onClick={convertImage}>
            <Download className="w-4 h-4 mr-2" />
            Convert & Download
          </Button>
        </CardFooter>
      </Card>

      <Collapsible
        open={isHistoryOpen}
        onOpenChange={setIsHistoryOpen}
        className="w-full space-y-2"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center justify-between w-full"
          >
            <span>Download History</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isHistoryOpen ? 'transform rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className={cn("space-y-2 text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2             data-[side=top]:slide-in-from-bottom-2")}>
          <Card>
            <CardContent className="pt-4">
              <DownloadHistory />
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

