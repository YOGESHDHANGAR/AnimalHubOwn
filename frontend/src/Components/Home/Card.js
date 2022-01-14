import React from "react";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import "./Style/Card.css";
const Card = (props) => {
  return (
    <>
      <div className="card_div">
        <MDBCard style={{ maxWidth: "22rem" }} className="card_div_mdb">
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardTitle className="card_titile">
              <h2>{props.breed}</h2>
              <span>{}</span>|{Math.round(props.distance)}
              <span>KM away </span>
              <span className="">|₹{props.price}</span>
            </MDBCardTitle>
            <MDBCardImage
              src={`${props.image}`}
              fluid
              alt="..."
              className="card_div_image"
            />
            {/* <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a> */}
          </MDBRipple>
          <MDBCardBody>
            <MDBCardText className="card_div_text">{props.desc}</MDBCardText>
            <div className="card_bottons_div">
              {/* <MDBBtn className="btn btn-dark card_botton">Button</MDBBtn>
         <MDBBtn className="btn btn-dark card_botton">Button</MDBBtn> */}
              <div>
                <button className="btn btn-primary card_botton me-1">
                  <CallIcon />
                </button>
              </div>
              <div>
                <button className="btn btn-success card_botton me-1 ms-1">
                  <WhatsAppIcon />
                </button>
              </div>

              <div className="owner ms-1"></div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </div>
    </>
  );
};

export default Card;
