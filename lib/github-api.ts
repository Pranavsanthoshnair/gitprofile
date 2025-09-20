import type { GitHubUser, GitHubRepo } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_GITHUB_API_URL || "https://api.github.com"

export class GitHubAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message)
    this.name = "GitHubAPIError"
  }
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`${API_BASE_URL}/users/${username}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  })

  if (!response.ok) {
    if (response.status === 404) {
      throw new GitHubAPIError("User not found. Please check the username and try again.", 404)
    } else if (response.status === 403) {
      throw new GitHubAPIError("API rate limit exceeded. Please try again later.", 403)
    } else {
      throw new GitHubAPIError("Failed to fetch user data. Please try again.", response.status)
    }
  }

  return response.json()
}

export async function fetchGitHubUserRepos(username: string, limit = 10): Promise<GitHubRepo[]> {
  const response = await fetch(`${API_BASE_URL}/users/${username}/repos?sort=stars&order=desc&per_page=${limit}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  })

  if (!response.ok) {
    // Don't throw error for repos - just return empty array
    console.warn("Failed to fetch repositories:", response.status)
    return []
  }

  return response.json()
}

export async function searchGitHubUser(username: string): Promise<{ user: GitHubUser; repos: GitHubRepo[] }> {
  try {
    const [user, repos] = await Promise.all([fetchGitHubUser(username), fetchGitHubUserRepos(username, 10)])

    return {
      user,
      repos: repos.slice(0, 3), // Top 3 repos
    }
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error
    }
    throw new GitHubAPIError("An unexpected error occurred. Please try again.")
  }
}
