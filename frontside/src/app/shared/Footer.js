import React, { Component } from 'react';
import { Trans } from "react-i18next";

class Footer extends Component {
  render () {
    return (
      <footer className="footer">
        <div className="d-sm-flex justify-content-center py-2">
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block"><Trans>Copyright ©</Trans> <a href="!#" target="_blank" rel="noopener noreferrer">FairLinked </a>2023</span>          
        </div>
      </footer> 
    );
  }
}

export default Footer;