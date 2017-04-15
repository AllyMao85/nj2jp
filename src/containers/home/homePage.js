import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import sessionActions from '../../redux/session';
import HomepageHeader from './homeComponents/homepage_header';
import HomepageFastestDelivery from './homeComponents/homepage_fastestDelivery';
import HomepageHowCarousel from './homeComponents/homepage_howCarousel';
import HomepageReviewsCarousel from './homeComponents/homepage_reviewsCarousel';
import HomepagePopJuices from './homeComponents/homepage_popJuices';

class HomePage extends Component {
  static defaultProps = {
    mobile: false,
    redirectUri: false,
    preLoginUrl: '/',
  };
  static propTypes = {
    mobile: PropTypes.bool,
    redirectUri: PropTypes.bool,
    preLoginUrl: PropTypes.string,
    push: PropTypes.func.isRequired,
    resetRedirectUri: PropTypes.func.isRequired,
  };

  calculateHeight = (header) => {
    const { mobile } = this.props;
    const height = window.innerHeight;

    if (!mobile) {
      if (window.innerWidth > 930) return (height - 120);
      return (height - 267);
    }
    if (header) {
      return (height - 267);
    }
    return (window.innerHeight - 60);
  }

  render() {
    const { mobile, redirectUri, preLoginUrl } = this.props;
    if (redirectUri) {
      this.props.resetRedirectUri();
      this.props.push(preLoginUrl);
    }

    return (
      <div className="homepage">
        <HomepageHeader
          height={this.calculateHeight(true)}
          mobile={mobile}
        />
        <HomepageFastestDelivery
          height={this.calculateHeight()}
          mobile={mobile}
        />
        <HomepageHowCarousel
          height={this.calculateHeight()}
          mobile={mobile}
        />
        <HomepageReviewsCarousel
          height={this.calculateHeight()}
          mobile={mobile}
        />
        <HomepagePopJuices />
      </div>
    );
  }
}
const mapStateToProps = ({ mobile, session }) => ({
  mobile: mobile.mobileType && true,
  preLoginUrl: session.preLoginUrl,
  redirectUri: session.redirectUri,
});
const mapDispatchToProps = dispatch => ({
  push: location => dispatch(push(location)),
  resetRedirectUri: () => dispatch(sessionActions.resetRedirectUri),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
