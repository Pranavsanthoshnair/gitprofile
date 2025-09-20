export interface GitHubUser {
  id: number
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  followers: number
  following: number
  public_repos: number
  html_url: string
  created_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  html_url: string
  updated_at: string
}

export interface UserSearchState {
  user: GitHubUser | null
  repos: GitHubRepo[]
  loading: boolean
  error: string | null
}
