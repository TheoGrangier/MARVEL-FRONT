import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//nfNfxET7SKxgZSaJ
import Cookies from "js-cookie";
import Search from "../component/search";

function Personnages() {
  const favorisString = Cookies.get("favoris");
  //console.log(favorisString);
  const favorisJson = JSON.parse(favorisString);
  //console.log(favorisJson.perso[0]);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [fav, setFav] = useState(favorisJson);

  const [search, setSearch] = useState(null);

  const [skip, setSkip] = useState([0, "normal"]);
  const [statut, setStatut] = useState("normal");

  // console.log(search);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--back-marvel--mzg7q6y4d5k4.code.run/personnages/skip/${skip[0]}`
        );
        //   console.log("ici ", response.data);
        if (response.data.personnages.count > 0) {
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
          `https://site--back-marvel--mzg7q6y4d5k4.code.run/personnages/search/${search}/${skip[0]}`
        );
        //  console.log(response.data);
        if (response.data.personnages.count > 0) {
          setData(response.data);
          setStatut("search");
          setIsLoading(false);
        }

        console.log("dans le fetch", search);
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
          `https://site--back-marvel--mzg7q6y4d5k4.code.run/personnages/search/${search}/0`
        );
        //  console.log(response.data);
        if (response.data.personnages.count > 0) {
          setData(response.data);
          setStatut("search");
          setSkip([0, "search"]);
          setIsLoading(false);
        }

        //  console.log("dans le fetch", search);
      } catch (error) {
        console.log(error.response);
      }
    };

    const fetchDataBasic = async () => {
      try {
        const response = await axios.get(
          "https://site--back-marvel--mzg7q6y4d5k4.code.run/personnages"
        );
        //   console.log(response.data);
        setData(response.data);
        setStatut("normal");
        setSkip([0, "normal"]);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    if (search === "" || search == null) {
      fetchDataBasic();
    }
    fetchData();
  }, [search]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <h1>LISTE DES PERSONNAGES</h1>
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
          {skip[0] / 100 + 1} /{Math.floor(data.personnages.count / 100) + 1}{" "}
        </p>
        <p
          onClick={() => {
            if (skip[0] + 100 < data.personnages.count) {
              setSkip([skip[0] + 100, statut]);
            }
          }}
        >
          <FontAwesomeIcon icon="fa-circle-right" />
        </p>
      </div>
      <div className="main">
        {data.personnages.results.map((personnages, index) => {
          // console.log(favoris[0]);
          // console.log(personnages._id);
          return (
            <>
              <div className="personnages">
                <Link to={`/personnage-comics/${personnages._id}`}>
                  <img
                    src={
                      personnages.thumbnail.path +
                      "." +
                      personnages.thumbnail.extension
                    }
                    alt="Logo"
                  />
                </Link>
                <div>
                  <p>{personnages.name} </p>
                  {/*<p>{personnages.description}</p>
                   */}
                </div>
                {favorisJson.perso.includes(personnages._id) ? (
                  <FontAwesomeIcon
                    icon="fa-heart"
                    className={"ok"}
                    onClick={(e) => {
                      const index = favorisJson.perso.indexOf(personnages._id);
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
                      favorisJson.perso.push(personnages._id);
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

export default Personnages;
