import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField"

// core components

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import logo from "assets/img/logo_full_blue.png";

const style = theme => ({
  loginCard : {
    minWidth: 200,
    marginTop: "40%"
  },
  root: {
   flexGrow: 1,
 },
 header: {
   backgroundColor: 'red'
 },
 img: {
   marginTop: 30,
   marginBottom: 30,
 },
 textField: {

 }
})


class LoginPage extends Component {
    constructor(props) {
        super(props);

        // reset login status
        //this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        //const { username, password } = this.state;
        //const { dispatch } = this.props;
        // if (username && password) {
        //     dispatch(userActions.login(username, password));
        // }
    }

    render() {
        const { loggingIn, classes } = this.props;
        const { username, password, submitted } = this.state;
        return (
          <GridContainer className={classes.root}>
            <GridItem xs={12}>
                <GridContainer
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <GridItem >
                    <Card className={classes.loginCard}>
                         <CardHeader color="primary" align="center" >

                          <img src={logo} alt="logo" className={classes.img} />
                         </CardHeader>
                         <CardBody >
                         <form>
                         <TextField
                            id="username"
                            name="username"
                            label="Логин"
                            className={classes.textField}
                            value={this.state.username}
                            onChange={this.handleChange}
                            margin="normal"
                            fullWidth
                          />
                          <TextField
                             id="password"
                             name="password"
                             label="Пароль"
                             className={classes.textField}
                             value={this.state.password}
                             onChange={this.handleChange}
                             margin="normal"
                             type="password"
                             fullWidth
                           />
                           </form>

                         </CardBody>
                         <CardBody align="center">
                         <Button color="primary" simple onClick={this.handleSubmit}>Войти в систему</Button>
                         </CardBody>

                       </Card>
                     </GridItem>
                  </GridContainer>
              </GridItem>
            </GridContainer>
        );
    }
}

export default withStyles(style)(LoginPage)
