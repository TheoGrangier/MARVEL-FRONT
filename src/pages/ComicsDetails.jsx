import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//nfNfxET7SKxgZSaJ

function ComicsDetails() {
  const favorisString = Cookies.get("favoris");

  // console.log(favorisString);

  const favorisJson = JSON.parse(favorisString);

  //  console.log(favorisJson.perso[0]);

  const [fav, setFav] = useState(favorisJson);

  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const id = "5fcf91f4d8a2480017b91454";

        //  console.log(id);
        const response = await axios.get(
          `https://site--back-marvel--mzg7q6y4d5k4.code.run/comics/${id}`
        );
        //  console.log(response.data);
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
    <>
      <div className="main-comics">
        <div className="comics-detail">
          <img
            src={
              data.comicsDetail.thumbnail.path +
              "." +
              data.comicsDetail.thumbnail.extension
            }
            alt="Logo"
          />
          <div>
            <h2>{data.comicsDetail.title}</h2>{" "}
            <p>{data.comicsDetail.description}</p>{" "}
          </div>

          {favorisJson.comics.includes(data.comicsDetail._id) ? (
            <FontAwesomeIcon
              icon="fa-heart"
              className={"ok"}
              onClick={(e) => {
                const index = favorisJson.comics.indexOf(data.comicsDetail._id);

                // console.log("index ==>", index);

                if (index > -1) {
                  // only splice array when item is found

                  favorisJson.comics.splice(index, 1); // 2nd parameter means remove one item only
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
                favorisJson.comics.push(data.comicsDetail._id);

                Cookies.set("favoris", JSON.stringify(favorisJson), {
                  expires: 7,
                });

                setFav(favorisJson);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ComicsDetails;
