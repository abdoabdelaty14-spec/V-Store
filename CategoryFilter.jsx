function CategoryFilter({ categories, category, setCategory }) {

    return (

        <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        >

            <option value="">All Categories</option>

            {

                categories.map((cat) => (

                    <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                    </option>

                ))

            }

        </select>

    );

}

export default CategoryFilter;