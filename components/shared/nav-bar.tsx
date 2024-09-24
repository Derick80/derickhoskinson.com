
import Link from 'next/link'
import { ModeToggle } from '../theme/theme-toggle'

const NavigationBar = () => {


    return (
        <nav
            className={ `flex justify-between max-w-screen-lg mx-auto fixed top-0 left-0 right-0 z-50  shadow-md transition-transform duration-300 ease-in-out` }
        >
            { ' ' }
            <ul className='hidsden flex gap-4 items-center h-16'>
                { NavData.map((item, index) => (
                    <li key={ index }>
                        <Link prefetch href={ item.url }>
                            { item.title }
                        </Link>
                    </li>
                )) }
            </ul>
            <div className='flex gap-2 items-center'>
                <ModeToggle />

            </div>
        </nav>
    )

}


const NavData = [
    {
        title: 'Home',
        url: '/'
    },
    {
        title: 'Blog',
        url: '/blog'
    },
    {
        title: 'Projects',
        url: '/projects'
    },
    {
        title: 'CV',
        url: '/cv'
    },

    {
        title: 'About',
        url: '/about'
    }
]






export default NavigationBar