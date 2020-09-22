import React, {Component} from "react";
import { Card, CardImg,CardText, CardBody,
    CardTitle } from 'reactstrap';
class DishDetail extends Component{
    constructor(props){
        super(props);
    }
    renderDish(dish) {
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
    renderComments(dish){
            const comnts = dish.comments.map((comment) =>(
            <div>
                <p>{comment.comment}</p>
                <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </div>
            ));
            return(comnts);
    }
    render(){
        if(this.props.dish!=null){
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        <h2>Comments</h2>
                        {this.renderComments(this.props.dish)}
                    </div>
                </div>
            );
        }else{
            return(<div></div>);
        }
       
        
    }
}
export default DishDetail ;