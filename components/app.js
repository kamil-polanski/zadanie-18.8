class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            searchingText: '',
            gif: {}
        }
    };
    handleChange = (event) => {
        const searchingText = event.target.value;
        this.setState({searchingText: searchingText});
    
        if (searchingText.length > 2) {
            this.props.onSearch(searchingText);
        }
    }
    
    handleKeyUp (event) {
        if (event.keyCode === 13) {
            this.props.onSearch(this.state.searchingText);
        }
    }


    getGif (searchingText)  {  
        const GIPHY_API_URL = 'https://api.giphy.com';
        const GIPHY_PUB_KEY = '097ZgDDfAyrqjnu6orPBhkwwB7uv517y';
        const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function() {
                if (this.status === 200) {
                        const data = JSON.parse(xhr.responseText).data; 
                        const gif = {  
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url
                    };
                resolve(gif);  
                } else {
                reject('Wystąpił błąd!');
                }
            }
            xhr.send();
        })
    }  

    handleSearch = (searchingText) => {  
        this.setState({
            loading: true 
        });
        this.getGif(searchingText) 
            .then(gif =>
                this.setState({
                    loading: false,
                    gif: gif,
                    searchingText: searchingText
                })
            )
            .catch(err => console.error(err));
    }
    /*
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText).data; 
                const gif = {  
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                callback(gif);  
            }
        };
        xhr.send();
    }
  */
      
    render () {
        const styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        }
        const {loading, gif} = this.state;
        return (
            <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch}/>
                <Gif
                    loading={loading}
                    url={gif.url}
                    sourceUrl={gif.sourceUrl}/>
            </div>
          );
    };
};