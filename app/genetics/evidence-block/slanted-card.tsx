import React from 'react'

interface SlantedCardProps {
    title: string
    content: string
}

const SlantedCard: React.FC<SlantedCardProps> = ({ title, content }) => {
    return (
        <div className="relative w-64 h-80 bg-white overflow-hidden shadow-lg rounded-l-lg">
            <div className="slanted-card-bg" />
            <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <h2 className="text-2xl font-bold text-white mb-4">{ title }</h2>
                <p className="text-white">{ content }</p>
            </div>
        </div>
    )
}

export default SlantedCard