import React from "react";
import { Card, CardImg, CardImgOverlay, CardBody,CardText,
    CardTitle } from 'reactstrap';

    function RenderDish({dish}) {
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    };
    const RenderComments = ({dish}) => {
            const comnts = dish.comments.map((comment) =>(
            <div>
                <p>{comment.comment}</p>
                <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </div>
            ));
            return(comnts);
    };
    const DishDetail = (props) => {
        if(props.dish!=null){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div  className="col-12 col-md-5 m-1">
                            <h2>Comments</h2>
                            <RenderComments dish={props.dish} />
                        </div>
                    </div>
                </div>
                
            );
        }else{
            return(<div></div>);
        };
    }
export default DishDetail;