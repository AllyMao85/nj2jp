import MobileDetect from 'mobile-detect';
// import { push } from 'react-router-redux';
import { auth as AuthService } from '../../navigation/routes';
import sessionActions from '../../redux/session';
import mobileActions from '../../redux/mobile';
import geoActions from '../../redux/geo';
import localeActions from '../../redux/locale';
import orderActions from '../../redux/orders';
import userActions from '../../redux/user';
import authActions from '../../redux/auth';

// ------------------- Event Listeners ----------------------------------
function loginListenerInit(dispatch, { replace }) {
  AuthService.on('logged_in', (profile) => {
    const dirtyPath = (/#(.*)$/.exec(window.location.hash) || [])[0];
    if (dirtyPath) replace('/login');
    dispatch(userActions.saveProfile(profile));
    dispatch(authActions.loginSuccess());
  });
}
function loginFailureListenerInit(dispatch) {
  AuthService.on('login_failure', error => dispatch(authActions.loginFailure(error)));
}
function logoutListenerInit(dispatch) {
  AuthService.on('logged_out', () => {
    dispatch(userActions.removeProfile());
    dispatch(authActions.loggedOut);
  });
}

// ------------------- App Startup Utilities ----------------------------------

export function cleanS3Route({ replace }) {
  const path = (/#!(\/.*)$/.exec(window.location.hash) || [])[1];
  if (path) replace(path);
}

export function generateMobileTitle(dispatch) {
  const url = window.location.pathname;
  const path = url.replace(/[\/]/g, '_')
  .split('_');
  let title = '';
  for (let i = 1; i < path.length; i += 1) {
    if (path[i] === 'and') {
      title += '& ';
    } else if (path[i] === 'stories') {
      title += 'User Stories';
      break;
    } else if (path[i] === 'user') {
      title += 'My Account';
      break;
    } else if (path[i] === 'admin') {
      title += 'Admin Dashboard';
      break;
    } else if (path[i] === 'faqs') {
      title += 'FAQ\'s';
      break;
    } else if (path[i] === '') {
      title += 'Home';
      break;
    } else {
      title += `${path[i][0].toUpperCase()}`;
      title += `${path[i].slice(1)} `;
    }
  }
  dispatch(sessionActions.saveActivePage(title, url));
}

export function saveGeoLocation(dispatch) {
  const activeLocation = JSON.parse(localStorage.getItem('active_location'));
  if (activeLocation) {
    const { ip, country, loc } = activeLocation;
    dispatch(geoActions.updateGeo(ip, loc));
    dispatch(localeActions.setCountry(country));
  }
}

export function detectMobileDevice(dispatch) {
  const mobileDevice = new MobileDetect(window.navigator.userAgent);
  const type = mobileDevice.mobile();
  if (dispatch) dispatch(mobileActions.setMobileDevice(type));
  return type;
}

export function setScreenSize(dispatch) {
  const screenSize = String(window.screen.width);
  dispatch(mobileActions.setScreenWidth(screenSize));
}

function scrollToTop() {
  window.scrollTo(0, 1);
}

function dispatchOrientation(dispatch, { orientation, height, width }) {
  if (orientation) {
    dispatch(mobileActions.orientationChanged({
      angle: orientation.angle,
      type: orientation.type,
      height,
      width,
    }));
  } else {
    dispatch(mobileActions.orientationChanged({
      height,
      width,
      angle: null,
      type: null,
    }));
  }
}

export function orientationSpy(dispatch) {
  window.addEventListener('orientationchange', dispatchOrientation(dispatch, screen));
}

export function getTaxRate(dispatch) {
  dispatch(orderActions.getTaxRate());
}

// -------------------------- Initializer --------------------------------------

export default function initiateActions(dispatch, history, { startup }) {
  if (startup) {
    cleanS3Route(history);
    generateMobileTitle(dispatch);
    saveGeoLocation(dispatch);
    detectMobileDevice(dispatch);
    setScreenSize(dispatch);
    orientationSpy(dispatch);
    getTaxRate(dispatch);
    scrollToTop();
    loginListenerInit(dispatch, history);
    logoutListenerInit(dispatch);
    loginFailureListenerInit(dispatch);
  } else {
    cleanS3Route(history);
    scrollToTop();
    generateMobileTitle(dispatch);
  }
}
