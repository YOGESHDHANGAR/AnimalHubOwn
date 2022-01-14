import React, { useEffect } from "react";
import Card from "./Card";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAnimals } from "../Redux/actions/animalActions";

const DisplayCard = () => {
  const dispatch = useDispatch();

  const { animals, loading, animalsCount } = useSelector(
    (state) => state.animals
  );

  useEffect(() => {
    dispatch(getAnimals());
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <Box
            sx={{ display: "flex" }}
            className="justify-content-center align-content-center"
          >
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <div>
          <div className="row ">
            {animals.map((elem, index) => (
              <>
                <div className="col col-lg-4 col-md-6 col-12" key={index}>
                  <Card
                    image={elem.images[0].url}
                    desc={elem.description}
                    breed={elem.breed}
                    price={elem.rate}
                    distance={elem.distance}
                  />
                </div>
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayCard;
