"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"

interface SearchBarProps {
  onSearch: (username: string) => void
  loading: boolean
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [username, setUsername] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim() && !loading) {
      onSearch(username.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          className="pr-10"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      <Button type="submit" disabled={!username.trim() || loading} className="px-6">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Searching...
          </>
        ) : (
          "Search"
        )}
      </Button>
    </form>
  )
}
