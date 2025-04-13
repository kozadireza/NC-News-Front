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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <select
        onChange={handleSortBy}
        name="sortBy"
        id="sortBy"
        defaultValue={filterAndSortParams.sort_by || "title"}
      >
        <option disabled value={"title"}>
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
      <select
        onChange={handleOrder}
        name="order"
        id="order"
        defaultValue={filterAndSortParams.order || "order"}
      >
        <option value="desc">descending</option>
        <option value="asc">ascending</option>
      </select>
    </div>
  );
}

export default SortingAndFilteringBar;
