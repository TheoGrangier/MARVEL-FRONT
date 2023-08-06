import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Search from "../component/search";

//nfNfxET7SKxgZSaJ

function Comics() {
  const favorisString = Cookies.get("favoris");

  //console.log(favorisString);

  const favorisJson = JSON.parse(favorisString);

  //console.log(favorisJson.perso[0]);

  const [fav, setFav] = useState(favorisJson);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const tab = [];

  const [skip, setSkip] = useState([0, "normal"]);
  const [statut, setStatut] = useState("normal");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--back-marvel--mzg7q6y4d5k4.code.run/comics/skip/${skip[0]}`
        );
        //  console.log("ici ", response.data);
        if (response.data.comics.count > 0) {
          setData(response.data);
          setStatut("normal");
          setIsLoading(false);
        }

        //  console.log("dans le fetch", skip);
      } catch (error) {
        console.log(error.response);
      }
    };
    const fetchDataSearchSkip = async () => {
      try {
        const response = await axios.get(
          `https://site--back-marvel--mzg7q6y4d5k4.code.run/comics/search/${search}/${skip[0]}`
        );
        //   console.log(response.data);
        if (response.data.comics.count > 0) {
          setData(response.data);
          setStatut("search");
          setIsLoading(false);
        }

        //      console.log("dans le fetch", search);
      } catch (error) {
        console.log(error.response);
      }
    };
    if (skip[1] == "normal") {
      fetchData();
    } else {
      fetchDataSearchSkip();
    }
  }, [skip]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--back-marvel--mzg7q6y4d5k4.code.run/comics/search/${search}/0`
        );
        console.log(response.data);
        if (response.data.comics.count > 0) {
          setData(response.data);
          setStatut("search");
          setSkip([0, "search"]);
          setIsLoading(false);
        }

        //   console.log("dans le fetch", search);
      } catch (error) {
        console.log(error.response);
      }
    };

    const fetchDataBasic = async () => {
      try {
        const response = await axios.get(
          "https://site--back-marvel--mzg7q6y4d5k4.code.run/comics"
        );
        //  console.log(response.data);
        setData(response.data);
        setStatut("normal");
        setSkip([0, "normal"]);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    if (search === "") {
      fetchDataBasic();
    }
    fetchData();
  }, [search]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <h1>LISTE DES COMICS</h1>
      <div className="pageSearch">
        <Search search={search} setSearch={setSearch} />
        <p
          onClick={() => {
            if (skip[0] > 0) {
              setSkip([skip[0] - 100, statut]);
            }
          }}
        >
          <FontAwesomeIcon icon="fa-circle-left" />
        </p>
        <p>
          {skip[0] / 100 + 1} /{Math.floor(data.comics.count / 100) + 1}{" "}
        </p>
        <p
          onClick={() => {
            if (skip[0] + 100 < data.comics.count) {
              setSkip([skip[0] + 100, statut]);
            }
          }}
        >
          <FontAwesomeIcon icon="fa-circle-right" />
        </p>
      </div>
      <div className="main">
        {data.comics.results.map((comics, index) => {
          return (
            <>
              <div className="comics">
                <Link to={`/comics/${comics._id}`}>
                  <img
                    src={
                      comics.thumbnail.path + "." + comics.thumbnail.extension
                    }
                    alt="Logo"
                  />
                </Link>
                <div>
                  <h2>{comics.title}</h2> <p>{comics.description}</p>{" "}
                </div>

                {favorisJson.comics.includes(comics._id) ? (
                  <FontAwesomeIcon
                    icon="fa-heart"
                    className={"ok"}
                    onClick={(e) => {
                      const index = favorisJson.comics.indexOf(comics._id);

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
                      favorisJson.comics.push(comics._id);

                      Cookies.set("favoris", JSON.stringify(favorisJson), {
                        expires: 7,
                      });

                      setFav(favorisJson);
                    }}
                  />
                )}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Comics;
