class Search extends React.component {
    getInitialState() {
        return {
          searchingText: ''
        };
      }
    handleChange(event) {
        let searchingText = event.target.value;
        this.setState({
            searchingText: searchingText
        });
    }
    render() {
        const styles = {
            fontSize: '1.5em',
            width: '90%',
            maxWidth: '350px'
        };
        return <input
        type = "text"
        onChange = { this.handleChange }
        placeholder = "Tutaj wpisz wyszukiwaną frazę"
        style = { styles }
        value = { this.state.searchTerm }
        />

    };
};