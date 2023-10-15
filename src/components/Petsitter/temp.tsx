<div className="profil-wrapper">
  <div className="container-profil">
    <div className="aside-profil">
      <img className="main-img" src={avatar} />
      <h3 className="profil-title">
        {lastname} peut effectuer la garde à son mon domicile
      </h3>
      <ul>{renderSize()}</ul>
      <h3 className="profil-title">À propos du domicile du {lastname}</h3>
      <ul>
        {accommodation && <li>{accommodation}</li>}
        {garden && <li>{garden}</li>}
        {/* Map through the 'additional options' array and render each option in an <li> element */}
        {renderOptions()}
      </ul>
      <h3 className="profil-title">Disponibilité de {lastname}</h3>
      {disponibilite && <DateRangeComp />}
    </div>
    <div className="main-profil">
      <h1>
        {firstname} {lastname}
      </h1>
      {description && <p>{description}</p>}
      {latitude && (
        <div className="leflet-container">
          <LeafletMap
            key={center.toString()}
            center={center}
            zoom={15}
            children={undefined}
          >
            <Marker position={L.latLng(latitude, longitude)} icon={myIcon}>
              <Popup>
                <img src={avatar} alt="Avatar" />
                <div>
                  <h2>
                    {firstname} {lastname}
                  </h2>
                </div>
              </Popup>
            </Marker>
          </LeafletMap>
        </div>
      )}
      {account && (
        <Link to={'/petsitter/' + id + '/booking'}>
          <Button prop="Booking" />
        </Link>
      )}
      {!account && (
        <Link to={'/subscribe'}>
          <Button prop="Booking" />
        </Link>
      )}
    </div>
  </div>
</div>;
