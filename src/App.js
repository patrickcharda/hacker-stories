import * as React from 'react';

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];


  const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState
    );

    React.useEffect(() => {
      localStorage.setItem(key, value);
    }, [value]);
    
    return [value, setValue]
  }

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
    );

  const handleSearch = event => {
    console.log(event.target.value) ||
     setSearchTerm(event.target.value);
     //localStorage.setItem('search', event.target.value);
  };

  const searchedStories = stories.filter(function(story) {
    return story.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });


  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search onSearch={handleSearch} search={searchTerm}/>
     
      <hr />

      <List list={searchedStories} />
    </div>
  );
};
 
const Search = ({onSearch, search}) => {
  /*const handleChange = event => {
    props.onSearch(event);
  };*/
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
       id="search"
      type="text"
      onChange={onSearch}
      value={search}/>
    </div>
  );
};

const List = ({ list }) =>
  list.map(({objectID, ...item}) => <Item key={item.objectID} {...item} />);
 
const Item = ({ title, url, author, num_comments, points }) => (
  <div>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </div>
);

export default App;