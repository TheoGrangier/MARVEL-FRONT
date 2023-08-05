import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//nfNfxET7SKxgZSaJ

function PersonnageListe({ id, setFav, fav }) {
  const favorisString = Cookies.get("favoris");
  console.log(favorisString);
  const favorisJson = JSON.parse(favorisString);
  console.log(favorisJson.perso[0]);

  function refreshPage() {
    window.location.reload(false);
  }

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const id = "5fcf91f4d8a2480017b91454";

        console.log(id);
        const response = await axios.get(
          `http://localhost:3000/personnages/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [fav]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="personnages">
      <Link to={`/personnage-comics/${data.personnageComics._id}`}>
        <img
          src={
            data.personnageComics.thumbnail.path +
            "." +
            data.personnageComics.thumbnail.extension
          }
          alt="Logo"
        />
      </Link>
      <div>
        <h2>{data.personnageComics.name}</h2>
      </div>
      {favorisJson.perso.includes(data.personnageComics._id) ? (
        <FontAwesomeIcon
          icon="fa-heart"
          className={"ok"}
          onClick={(e) => {
            const index = favorisJson.perso.indexOf(data.personnageComics._id);
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
  );
}

export default PersonnageListe;
