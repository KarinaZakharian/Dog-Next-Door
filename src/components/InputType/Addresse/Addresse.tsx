import { useState } from 'react';
import './Addresse.scss';

function AutoComplete({ style }) {
  const [addresses, setAdresses] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedAddressGeometry, setSelectedAddressGeometry] = useState({
    x: 0,
    y: 0,
  });

  const getAddressesFromAPI = async (query) => {
    try {
      if (query !== '' && isNaN(query)) {
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
            query
          )}&limit=5`
        );
        if (response.ok) {
          const datas = await response.json();
          setAdresses(datas);
          console.log(datas);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setAddressGeometryAndCloseAutocompletion = (geolocalisation) => {
    setSelectedAddressGeometry(geolocalisation);
    setAdresses([]);
    console.log(geolocalisation);
  };

  return (
    <div className="signup__localisation">
      <div className="autocompletion-city">
        <label htmlFor="city" className="input__label">
          Adresse complète
        </label>
        <input
          name="city"
          id="city"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={() => getAddressesFromAPI(query)}
          placeholder="Adresse"
          value={query}
          className="search__form-filters__select autocompletion-city__input"
          style={style}
        />
        {
          <ul className="autocompletion-city__ul">
            {addresses &&
              addresses.features &&
              addresses.features.map((address) => (
                <li
                  className="autocompletion-city__ul__li"
                  key={address.properties.label}
                  onClick={() => {
                    const selectedLabel = address.properties.label;
                    setQuery(selectedLabel); // Set the input value to the selected address label
                    setAddressGeometryAndCloseAutocompletion({
                      x: address.properties.x,
                      y: address.properties.y,
                    });
                  }}
                >
                  {address.properties.label}
                </li>
              ))}
          </ul>
        }
      </div>
    </div>
  );
}

export default AutoComplete;
