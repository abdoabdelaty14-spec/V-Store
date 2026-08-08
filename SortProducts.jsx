function SortProducts({ sort, setSort }) {

    return (

        <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
        >

            <option value="">Default</option>

            <option value="low">Price Low → High</option>

            <option value="high">Price High → Low</option>

        </select>

    );

}

export default SortProducts;