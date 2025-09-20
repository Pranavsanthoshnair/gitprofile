"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, GitFork, ExternalLink } from "lucide-react"
import type { GitHubRepo } from "@/lib/types"

interface RepoListProps {
  repos: GitHubRepo[]
}

export function RepoList({ repos }: RepoListProps) {
  if (repos.length === 0) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card className="rounded-2xl shadow-md border-border/50 hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Top Repositories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                variants={itemVariants}
                whileHover={{ scale: 1.01, x: 4 }}
                className="p-4 rounded-lg border border-border/50 hover:border-border transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                        {repo.name}
                      </h3>
                      {repo.language && (
                        <Badge variant="secondary" className="text-xs">
                          {repo.language}
                        </Badge>
                      )}
                    </div>

                    {repo.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{repo.description}</p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{repo.stargazers_count.toLocaleString()}</span>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        <span>{repo.forks_count.toLocaleString()}</span>
                      </motion.div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(repo.html_url, "_blank")}
                    className="self-start hover:scale-105 transition-transform duration-200"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
