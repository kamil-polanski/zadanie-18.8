class Search extends React.component {
    getInitialState() {
        return {
          searchingText: ''
        };
    };
    handleChange(event) {
        let searchingText = event.target.value;
        this.setState({
            searchingText: searchingText
        });
        if (searchingText.length > 2) {
            this.props.onSearch(searchingText);
        };
    };
    handleKeyUp(event) {
        if (event.keyCode === 13) {
          this.props.onSearch(this.state.searchingText);
        };
    };

    render() {
        const styles = {
            fontSize: '1.5em',
            width: '90%',
            maxWidth: '350px'
        };
        return <input
        type = "text"
        onChange = { this.handleChange }
        onKeyUp={this.handleKeyUp}
        placeholder = "Tutaj wpisz wyszukiwaną frazę"
        style = { styles }
        value = { this.state.searchTerm }
        />

    };
};