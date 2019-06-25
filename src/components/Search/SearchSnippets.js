/*<StyledSearchBar>
  <Label htmlFor="filter" onClick={() => setShowFilter(!showFilter)}>
    <i className="fas fa-filter" /> Filter for type &#709;
  </Label>
  {showFilter && (
    <StyledSelect
      id="filter"
      defaultValue={typeFilter}
      onChange={onChangeTypeSelect}
    >
      <option value="all">all</option>
      <option value="give away">give away</option>
      <option value="swap">swap</option>
      <option value="for sale">for sale</option>
    </StyledSelect>
  )}
  <StyledTextInput
    type="text"
    placeholder="Search here..."
    onKeyPress={event => event.charCode === 13 && onKeyPressSearch(event)}
  />
</StyledSearchBar>; */

/*  function onKeyPressSearch(event) {
    const searchParam = event.target.value;
    var options = {
      keys: ['title', 'description', 'tags', 'user_id.city'],
      minMatchCharLength: 3,
      threshold: 0.3,
      maxPatternLength: 32,
      shouldSort: true
    };
    var fuse = new Fuse(filteredListings, options);
    const results = fuse.search(searchParam);
    handleSearch(results, history, searchParam);
  }*/

/*const StyledSearchBar = styled.section`
  display: grid;
  font-family: 'PT Mono', monospace;
`;

const StyledSelect = styled.select`
  border: 2px solid #abc38e;
  border-radius: 11px;
  font-family: 'PT Mono', monospace;
  font-size: 15px;
  margin-top: 5px;
  padding: 3px;
  background-color: transparent;
`;

const StyledTextInput = styled(TextInput)`
  padding: 5px 25px 5px 5px;
  background-image: url(${SearchIcon});
  background-repeat: no-repeat;
  background-position: right;
`; */

/* function onChangeTypeSelect(event) {
    const filter = event.target.value;
    onTypeFilter(filter);
    setFilteredListings(
      listings.filter(listing => filter === 'all' || listing.type === filter)
    );
  }*/
