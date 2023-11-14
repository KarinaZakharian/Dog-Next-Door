import { useState } from 'react';
import './Addresse.scss';
interface AutoProps {
  setCoordinates: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;

  [prop: string]: unknown;
}

function AutoComplete({ setCoordinates, ...props }: AutoProps) {
  const [addresses, setAdresses] = useState([]);
  const [query, setQuery] = useState('');

  const getAddressesFromAPI = async (search: string) => {
    // console.log('je suis dans la fonction');
    try {
      if (search !== '' && isNaN(search)) {
        // console.log('je suis dans la fonction et je cherche');
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
            search
          )}&limit=5`
        );
        if (response.ok) {
          const datas = await response.json();
          setAdresses(datas);
          // console.log(datas);
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const setAddressGeometryAndCloseAutocompletion = (geolocalisation) => {
    setCoordinates(geolocalisation);
    setAdresses([]);
    // console.log(geolocalisation);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    event.target.style.borderColor = 'initial';
  };
  return (
    <div className="signup__localisation">
      <div className="autocompletion-city">
        <label htmlFor="city" className="input__label">
          Adresse complète
        </label>
        <input
          name="user_address"
          id="city"
          type="text"
          onChange={handleChange}
          onKeyUp={() => getAddressesFromAPI(query)}
          placeholder="Adresse"
          value={query}
          className="search__form-filters__select autocompletion-city__input"
          {...props}
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
                      x: address.geometry.coordinates[0],
                      y: address.geometry.coordinates[1],
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
