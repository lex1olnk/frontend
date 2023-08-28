interface Discussion {
  id: number
  comments: Comment[]
  createdAt?: string
  updatedAt: string
}

interface Comment {
  id: number
  value: string
  userId: number
  discussionId: number
  createdAt?: string
  updatedAt?: string
}
