import elementsUtils from "../Utils/utilsForElements";

function SortingAndFilteringBar({
  setFilterAndSortParams,
  filterAndSortParams,
}) {
  function handleSortBy(event) {
    const currentSortBy = event.target.value;
    if (currentSortBy !== "null") {
      setFilterAndSortParams({
        ...filterAndSortParams,
        sort_by: currentSortBy,
      });
    } else {
      setFilterAndSortParams({ ...filterAndSortParams, sort_by: null });
    }
  }

  function handleOrder(event) {
    const currentOrder = event.target.value;
    if (currentOrder !== "null") {
      setFilterAndSortParams({
        ...filterAndSortParams,
        order: currentOrder,
      });
    } else {
      setFilterAndSortParams({ ...filterAndSortParams, order: null });
    }
  }
  return (
    <div>
      <select onChange={handleSortBy} name="sortBy" id="sortBy">
        <option selected disabled>
          Sort By
        </option>
        <option value={"null"}>Not sorted</option>
        {elementsUtils.sortBy.map((sortingOptionName) => {
          return (
            <option key={sortingOptionName.ID} value={sortingOptionName.ID}>
              {sortingOptionName.title}
            </option>
          );
        })}
      </select>
      <select onChange={handleOrder} name="order" id="order">
        <option selected disabled>
          Order
        </option>
        <option value="asc">ascending</option>
        <option value="desc">descending</option>
      </select>
    </div>
  );
}

export default SortingAndFilteringBar;
