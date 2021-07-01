import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
});
class Header extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Chinese Remainder Theorem Calculator
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    );
  }
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
