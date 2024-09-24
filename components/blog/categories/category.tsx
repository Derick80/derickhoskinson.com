

const Category = ({ categories }: {
    categories: string[]
}) => {


    return (
        <div className="category">
            <span>{
                categories.map((category, index) => (
                    <span key={ index } className="category-item">
                        { category }
                    </span>
                ))

            }</span>
        </div>
    )
}

export default Category