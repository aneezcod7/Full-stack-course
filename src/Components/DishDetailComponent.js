import React,{useState} from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody, Card,CardBody,CardText,CardTitle,CardImg,Breadcrumb,BreadcrumbItem,
    Form, FormGroup, Input, Label,Row,Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { connect } from "react-redux";

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

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
    const RenderComments = ({comments}) => {
            const comnts = comments.map((comment) =>(
            <div>
                <p>{comment.comment}</p>
                <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </div>
            ));
            return(comnts);
    };
    const handleLogin = (values) =>{
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    };

    const DishDetail = (props) => {
        const [modal, setModal] = useState(false);
        const toggle = () => setModal(!modal);

        if(props.dish!=null){
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h2>Comments</h2>
                            <RenderComments comments={props.comments} />
                            <button outline onClick={toggle}><i class="fa fa-comment-o" aria-hidden="true"></i> Submit Comment</button>
                        </div>
                    </div>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Add Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => handleLogin(values)}>
                                    <Row className="form-group">
                                        <Label htmlFor="firstname" md={12}>Rating</Label>
                                        <Col md={12}>
                                            <Control.select model=".rating" name="rating"
                                            className="form-control" >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            </Control.select>
                                        </Col>  
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="firstname" md={12}>Your Name</Label>
                                        <Col md={12}>
                                            <Control.text model=".firstname" id="firstname" name="firstname"
                                                placeholder="First Name"
                                                className="form-control"
                                                validators={{
                                                     minLength: minLength(3), maxLength: maxLength(15)
                                                }}
                                                />
                                            <Errors
                                                className="text-danger"
                                                model=".firstname"
                                                show="touched"
                                                messages={{
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label md={12} htmlFor="comment" >Comment</Label>
                                        <Col md={12}>
                                            <Control.textarea model='.comment' id="comment"
                                            rows="7" className="form-control"/>
                                        </Col>
                                    </Row>
                                    <Button type="submit" value="submit" color="primary" onClick={toggle}>Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }else{
            return(<div></div>);
        };
    }
export default DishDetail;