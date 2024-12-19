import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CommentRetrievalType } from './types'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function labelLikes(likes: number | undefined | null) {
    if (likes === undefined || likes === null) {
        return 'Loading...'
    }

    return likes === 0
        ? 'Be the first to like'
        : likes === 1
          ? '1 Like'
          : `${likes} Likes`
}

export function labelCommentCounts(comments: number | undefined | null) {
    if (comments === 0 || !comments) {
        return `${comments} comments `
    }
    if (comments === 1) {
        return '1 comment'
    }
    if (comments > 1) {
        return `${comments} comments`
    }
}

// reogranize comments

type CommentType = CommentRetrievalType & {
    children: CommentType[] | null
}

export function reorganizeComments(comments: CommentType[]) {
    if (!comments) {
        return
    }

    const commentsCopy = comments.slice()

    const rootComments = commentsCopy.filter((comment) => !comment.parentId)

    const childrenComments = commentsCopy.filter((comment) => comment.parentId)

    const reorganizedComments = rootComments.map((rootComment) => {
        const children = childrenComments.filter(
            (childComment) => childComment.parentId === rootComment.id
        )

        return {
            ...rootComment,
            children: children.length > 0 ? children : null
        }
    })

    return reorganizedComments
}
