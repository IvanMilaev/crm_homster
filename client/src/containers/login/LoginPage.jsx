import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";

//actions
import logo from "assets/img/logo_full_blue.png";

//actions
import { loginUser } from "modules/auth";

//utils
const empty = require("is-empty");

const style = theme => ({
  loginCard: {
    minWidth: 200,
    marginTop: "40%"
  },
  root: {
    flexGrow: 1
  },
  header: {
    backgroundColor: "red"
  },
  img: {
    marginTop: 30,
    marginBottom: 30
  },
  textField: {}
});

class LoginPage extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    console.log(this.props);
    return (
      <GridContainer className={classes.root}>
        <GridItem xs={12}>
          <GridContainer direction="row" justify="center" alignItems="center">
            <GridItem>
              <Card className={classes.loginCard}>
                <CardHeader color="primary" align="center">
                  <img src={logo} alt="logo" className={classes.img} />
                </CardHeader>
                <form noValidate onSubmit={this.onSubmit}>
                  <CardBody>
                    <TextField
                      id="email"
                      name="email"
                      label="email"
                      variant="outlined"
                      helperText={errors.email || errors.emailnotfound}
                      error={
                        !empty(errors.email) || !empty(errors.emailnotfound)
                      }
                      className={classes.textField}
                      value={this.state.username}
                      onChange={this.handleChange}
                      margin="normal"
                      type="email"
                      fullWidth
                    />
                    <TextField
                      id="password"
                      name="password"
                      label="password"
                      variant="outlined"
                      helperText={errors.password || errors.passwordincorrect}
                      error={
                        !empty(errors.password) ||
                        !empty(errors.passwordincorrect)
                      }
                      className={classes.textField}
                      value={this.state.password}
                      onChange={this.handleChange}
                      margin="normal"
                      type="password"
                      fullWidth
                    />
                  </CardBody>
                  <CardBody align="center">
                    <Button color="primary" simple type="submit">
                      Войти в систему
                    </Button>
                  </CardBody>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginUser
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(LoginPage));
