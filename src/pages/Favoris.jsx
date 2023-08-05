import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ComicsListe from "../component/comicsList";
import PersonnageListe from "../component/personnageList";
//nfNfxET7SKxgZSaJ

function Favoris() {
  const favorisString = Cookies.get("favoris");
  console.log(favorisString);
  const favorisJson = JSON.parse(favorisString);
  console.log(favorisJson.perso[0]);

  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [fav, setFav] = useState(favorisJson);

  useEffect(() => {
    function refreshPage() {
      window.location.reload(false);
    }
    setIsLoading(false);
    //refreshPage();
  }, [fav]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <div className="bg">
        <h3>Liste des personnages en Favoris</h3>
        <div className="main2">
          {fav.perso.map((perso, index) => {
            return perso ? (
              <>
                <PersonnageListe id={perso} setFav={setFav} fav={fav} />
              </>
            ) : (
              <></>
            );
          })}
        </div>
        <h3>Liste des comics en Favoris</h3>
        <div className="main2">
          <div className="main-perso-list">
            {" "}
            {fav.comics.map((comics, index) => {
              return comics ? (
                <div>
                  <ComicsListe id={comics} setFav={setFav} fav={fav} />
                </div>
              ) : (
                <></>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Favoris;
