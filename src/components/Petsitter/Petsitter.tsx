/* eslint-disable prettier/prettier */

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

// import Header from '../../components/PageComponents/Header/
// import Footer from '../../components/PageComponents/Footer/Footer';


import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserById } from '../../store/reducers/sitter';

function Petsitter() {
  const user = useAppSelector((state) => state.sitter.user);
  console.log( 'petsitter', user)

  const dispatch = useAppDispatch();

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(fetchUserById(Number(id)));
  }, [id]);

  return (
    <div className="page-wrapper">
      
      <div className="container">
        <div className="aside">
         
          <h1>
            {user?.firstname} {user?.lastname} 
          </h1>
          <h3> {user?.firstname} peut effectuer la garde à son domicile {user?.user_address}</h3>
          <ul></ul>
          <h3>À propos du domicile de {user?.firstname}</h3>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="main"></div>
      </div>
    
    </div>
  );
}

export default Petsitter;
