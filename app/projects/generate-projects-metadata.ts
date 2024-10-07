
import { projects } from '@/lib/resources/projects';
import { Metadata } from "next";


const generateProjectsMetadata = () => {
    // Use the first project image or any fallback for OpenGraph and Twitter metadata
    const previewImage = projects.length > 0 ? projects[0].primaryImage : '/scoping.jpg';
    return {
        title: 'My Coding Projects',
        description: 'A list of coding projects that I am working on or have completed',
        openGraph: {
            title: 'My Coding Projects',
            description: 'A list of coding projects that I am working on or have completed',
            images: [
                {
                    url: previewImage,
                    width: 800,
                    height: 600,
                    alt: 'Project preview image',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'My Coding Projects',
            site: '@geneticsStar',
            description: 'A list of coding projects that I am working on or have completed',
            images: [
                {
                    url: previewImage,
                    width: 800,
                    height: 600,
                    alt: 'Project preview image',
                },
            ]
        },
    }

}

export default generateProjectsMetadata;