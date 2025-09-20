"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function UserCardSkeleton() {
  return (
    <Card className="rounded-2xl shadow-md border-border/50">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center sm:items-start">
            <Skeleton className="w-24 h-24 rounded-full" />
            <Skeleton className="w-24 h-8 mt-4" />
          </div>

          {/* User Info Section */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/50">
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-5 w-12" />
                </div>
              ))}
            </div>

            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function RepoListSkeleton() {
  return (
    <Card className="rounded-2xl shadow-md border-border/50">
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 rounded-lg border border-border/50">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
