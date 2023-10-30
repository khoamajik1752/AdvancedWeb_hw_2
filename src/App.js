
import './App.css';
import NavBar from './components/NavBar';
import ApiKey from './components/ApiKey';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

function PhotoSearch() {
  const [searchText, setSearchText] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [apiKey, setApiKey] = useState('jBfuPYr1_IBaKGCCylz--k0PnPnI2kMtiCuE8z8nxeM'); // Replace with your actual API key
  const [userApiKey, setUserApiKey] = useState(''); // Store user-entered API key

  // const accessKey = 'jBfuPYr1_IBaKGCCylz--k0PnPnI2kMtiCuE8z8nxeM';
  // const accessKey= 'Q0Qh25O6IAK44skQgX5az_HFZJ56v5RX-h43-HoiJlw';
  // const accessKey = 'Ye09uOa5e9vdQGoD9Y3UzAuy-t9rHPPWjYvpKtnXVsE';
  const perPage = 10;
  let searchTimeout;

  const handleSearch = () => {
    clearTimeout(searchTimeout); // Clear any existing timeout

    searchTimeout = setTimeout(() => {
      setPhotos([]);
      setPage(1);
      loadPhotos();
    }, 500); 
  };

  const loadPhotos = () => {
    // console.log('requesting', searchText)
    setLoading(true);

    axios
      .get(`https://api.unsplash.com/search/photos`, {
        params: {
          query: searchText,
          page,
          per_page: perPage,
        },
        headers: {
          Authorization: `Client-ID ${apiKey}`,
        },
      })
      .then((response) => {
        const newPhotos = response.data.results;
        if (page === 1) {
          setPhotos(newPhotos);
        } else {
          setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
        }
        // setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
        setPage(page + 1);
        setLoading(false);
        setHasMore(newPhotos.length === perPage);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const searchOnTyping = (value) => {
    setPage(1)
    setSearchText(value)
  }
  const handleUserApiKeySubmit = () => {
    setApiKey(userApiKey); // Set the API key to the user-entered value
  };
  const handleUserApiKeyChange = (event) => {
    setUserApiKey(event.target.value);
  };
  useEffect(() => {
    if (loading === true) {
      console.log('Image is loading')
    }
    loadPhotos();
  }, [searchText]);

  return (
    <div>
      <NavBar searchText={searchText} setSearchText={searchOnTyping} handleSearch={handleSearch}></NavBar>
      <ApiKey apiKey={apiKey} userApiKey={userApiKey} handleUserApiKeyChange={handleUserApiKeyChange} handleUserApiKeySubmit={handleUserApiKeySubmit}></ApiKey>
      {searchText.trim() === '' ? ( // Check if the search bar is empty
        <div className="default-screen">
          <h3>Enter a search query to find photos</h3>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={photos.length}
          next={loadPhotos}
          hasMore={hasMore}
          loader={<h4 className='loading'>Loading...</h4>}
        >
          <div className="photo-grid">
          {photos.map((photo) => (
              <img key={photo.id} src={photo.urls.small} alt={photo.description} />
            ))}
            
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default PhotoSearch;