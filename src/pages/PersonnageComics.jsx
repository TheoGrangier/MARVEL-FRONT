import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ComicsListe from "../component/comicsList";
//nfNfxET7SKxgZSaJ

function PersonnageComics() {
  const favorisString = Cookies.get("favoris");
  console.log(favorisString);
  const favorisJson = JSON.parse(favorisString);
  console.log(favorisJson.perso[0]);

  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [fav, setFav] = useState(favorisJson);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const id = "5fcf91f4d8a2480017b91454";

        console.log(id);
        const response = await axios.get(
          `https://site--back-marvel--mzg7q6y4d5k4.code.run/personnages/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="main-perso">
      <div className="comics-detail">
        <img
          src={
            data.personnageComics.thumbnail.path +
            "." +
            data.personnageComics.thumbnail.extension
          }
          alt="Logo"
        />
        <div>
          <h2>{data.personnageComics.name}</h2>
          <p>{data.personnageComics.description}</p>
        </div>
        {favorisJson.perso.includes(data.personnageComics._id) ? (
          <FontAwesomeIcon
            icon="fa-heart"
            className={"ok"}
            onClick={(e) => {
              const index = favorisJson.perso.indexOf(
                data.personnageComics._id
              );
              console.log("index ==>", index);
              if (index > -1) {
                // only splice array when item is found
                favorisJson.perso.splice(index, 1); // 2nd parameter means remove one item only
              }
              Cookies.set("favoris", JSON.stringify(favorisJson), {
                expires: 7,
              });
              setFav(favorisJson);
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon="fa-heart"
            className={"no"}
            onClick={(e) => {
              favorisJson.perso.push(data.personnageComics._id);
              Cookies.set("favoris", JSON.stringify(favorisJson), {
                expires: 7,
              });
              setFav(favorisJson);
            }}
          />
        )}
      </div>

      <div id="liste-detail">
        <h3 id="h1-perso">
          Liste des comics avec {data.personnageComics.name}
        </h3>
        <div className="main-perso-list">
          {" "}
          {data.personnageComics.comics.map((comics, index) => {
            return comics ? (
              <div>
                <ComicsListe id={comics} setFav={setFav} />
              </div>
            ) : (
              <></>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PersonnageComics;
