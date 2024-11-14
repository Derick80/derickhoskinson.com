import React from 'react'

interface SlantedCardProps {
    title: string
    content: string
}

const SlantedCard: React.FC<SlantedCardProps> = ({ title, content }) => {
    return (
        <div className='relative h-80 w-64 overflow-hidden rounded-l-lg bg-white shadow-lg'>
            <div className='slanted-card-bg' />
            <div className='relative z-10 flex h-full flex-col justify-between p-6'>
                <h2 className='mb-4 text-2xl font-bold text-white'>{title}</h2>
                <p className='text-white'>{content}</p>
            </div>
        </div>
    )
}

export default SlantedCard
