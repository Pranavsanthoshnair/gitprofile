"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SearchBar } from "@/components/SearchBar"
import { UserCard } from "@/components/UserCard"
import { RepoList } from "@/components/RepoList"
import { UserCardSkeleton, RepoListSkeleton } from "@/components/LoadingSkeleton"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Github } from "lucide-react"
import type { UserSearchState } from "@/lib/types"
import { searchGitHubUser, GitHubAPIError } from "@/lib/github-api"

export default function Home() {
  const [searchState, setSearchState] = useState<UserSearchState>({
    user: null,
    repos: [],
    loading: false,
    error: null,
  })

  const handleSearch = async (username: string) => {
    if (!username.trim()) return

    setSearchState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const { user, repos } = await searchGitHubUser(username)

      setSearchState({
        user,
        repos,
        loading: false,
        error: null,
      })
    } catch (error) {
      setSearchState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof GitHubAPIError ? error.message : "An unexpected error occurred",
      }))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with theme toggle */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <Github className="w-8 h-8 text-foreground" />
              <h1 className="text-4xl font-bold text-foreground text-balance">GitHub Profile Viewer</h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-muted-foreground text-pretty"
            >
              Discover GitHub profiles and their top repositories
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SearchBar onSearch={handleSearch} loading={searchState.loading} />
          </motion.div>

          <AnimatePresence mode="wait">
            {searchState.error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{searchState.error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {searchState.loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mt-8 space-y-6"
              >
                <UserCardSkeleton />
                <RepoListSkeleton />
              </motion.div>
            )}

            {searchState.user && !searchState.loading && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mt-8 space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <UserCard user={searchState.user} />
                </motion.div>

                {searchState.repos.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <RepoList repos={searchState.repos} />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-16 text-center text-sm text-muted-foreground"
          >
            <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
            <p className="mt-1">Powered by the GitHub API</p>
          </motion.footer>
        </div>
      </div>
    </div>
  )
}
