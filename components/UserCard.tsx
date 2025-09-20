"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Users, GitFork, Calendar, ExternalLink } from "lucide-react"
import type { GitHubUser } from "@/lib/types"

interface UserCardProps {
  user: GitHubUser
}

export function UserCard({ user }: UserCardProps) {
  const joinDate = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  }

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card className="rounded-2xl shadow-md border-border/50 hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Avatar Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center sm:items-start"
            >
              <Avatar className="w-24 h-24 border-2 border-border">
                <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.login} />
                <AvatarFallback className="text-2xl font-semibold">{user.login.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full sm:w-auto hover:scale-105 transition-transform duration-200 bg-transparent"
                  onClick={() => window.open(user.html_url, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </motion.div>
            </motion.div>

            {/* User Info Section */}
            <div className="flex-1 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold text-foreground">{user.name || user.login}</h2>
                <p className="text-muted-foreground">@{user.login}</p>
                {user.bio && <p className="text-foreground mt-2 leading-relaxed">{user.bio}</p>}
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: Users, label: "Followers", value: user.followers },
                  { icon: Users, label: "Following", value: user.following },
                  { icon: GitFork, label: "Repositories", value: user.public_repos },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={statsVariants}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors duration-200 col-span-1 sm:col-span-1"
                  >
                    <stat.icon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="font-semibold text-foreground">{stat.value.toLocaleString()}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Join Date */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Calendar className="w-4 h-4" />
                <span>Joined {joinDate}</span>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
