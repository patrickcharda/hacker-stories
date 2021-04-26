import * as React from 'react';

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  
  return [value, setValue]
}

const initialStories = [
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

const App = () => {
  
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );
  
  const [stories, setStories] = React.useState(initialStories)

  const handleRemoveStory = item => {
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    );
    setStories(newStories);
  }



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

      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onInputChange={handleSearch}
      > 
      <strong>Search :</strong> 

      </InputWithLabel>
 
      <hr />

      <List list={searchedStories} onRemoveItem={handleRemoveStory}/>

    </div>
  );
};

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
  }) => {
    const inputRef = React.useRef();

    React.useEffect(() => {
      if (isFocused) {
        inputRef.current.focus();
      }
    }, [isFocused])

    return (
    <>
      <label htmlFor={id} >{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
    )
  }

/*const Search = ({onSearch, search}) => {
  /*const handleChange = event => {
    props.onSearch(event);
  };**
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
};*/

const List = ({ list, onRemoveItem }) =>
  list.map(item => <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem}/>);
 
const Item = ({ item, onRemoveItem }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button
        type="button"
        onClick={() => {
          onRemoveItem(item)
        }}
      >
        Dismiss
      </button>
    </span>
  </div>
);


export default App;