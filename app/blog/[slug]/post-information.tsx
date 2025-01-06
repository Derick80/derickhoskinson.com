import { Badge } from '@/components/ui/badge';
import { MdxCompiled } from '@/lib/types';

type PostInformationProps = MdxCompiled

const PostInformation = (props:
    PostInformationProps
) => {
    return (
        <div
            className='border border-green-500'
        >
            <h1>Post Information</h1>
            <p>
                Categories
            </p>
            <div className='mb-4 flex flex-wrap gap-2'>

                { props.categories.map((category) => (
                    <Badge key={ category } variant='secondary'>
                        { category }
                    </Badge>
                )) }
            </div>
        </div>
    );
}

export default PostInformation;