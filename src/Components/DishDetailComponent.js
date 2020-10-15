import React,{Component, useState} from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody, Card,CardBody,CardText,CardTitle,CardImg,Breadcrumb,BreadcrumbItem,
    Form, FormGroup, Input, Label,Row,Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

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

    const RenderComments = ({comments, addComment, dishId}) => {
            const comnts = comments.map((comment,index) =>(
                    <li key={index.toString()}>
                    <p>{comment.comment}</p>
                    <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
            ));
            return(
            <div>
                <ul className="list-unstyled">{comnts}</ul>                  
                <CommentForm dishId={dishId} addComment={addComment}/>
            </div>
            );
    };

    
    class CommentForm extends Component {
        constructor(props){
            super(props);
            this.state = {
                isNavOpen:false,
                isModalOpen:false
            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleLogin = this.handleLogin.bind(this);
        }
        handleLogin(values){ 
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);

        }
        toggleModal(){
            this.setState(
                {isModalOpen: !(this.state.isModalOpen)}
            );
        }
    
        render(){
            return(<div><button outline onClick={this.toggleModal}><i class="fa fa-comment-o" aria-hidden="true"></i> Submit Comment</button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Add Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleLogin(values)}>
                                    <Row className="form-group">
                                        <Label htmlFor="rating" md={12}>Rating</Label>
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
                                        <Label htmlFor="author" md={12}>Your Name</Label>
                                        <Col md={12}>
                                            <Control.text model=".author" id="author" name="author"
                                                placeholder="Name"
                                                className="form-control"
                                                validators={{
                                                     minLength: minLength(3), maxLength: maxLength(15)
                                                }}
                                                />
                                            <Errors
                                                className="text-danger"
                                                model=".author"
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
                                    <Button type="submit" value="submit" color="primary" onClick={this.toggleModal}>Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
            </div>);
        }
    };

    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null){
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
                            <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                            />   
                        </div>
                    </div>
                </div>
            );
        }else{
            return(<div></div>);
        };
    }
export default DishDetail;