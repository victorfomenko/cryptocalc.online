import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import memoize from 'lodash/memoize';
import { withRouter } from 'next/router';
import hoistStatics from 'hoist-non-react-statics';

// Adds url-params parsing and replacing by object
// based on https://mikebridge.github.io/articles/react-router-4-query-string-hoc/

function withUrlParams(Component, config = {}) {
  class WrappedComponent extends React.PureComponent {
    static propTypes = {
      url: PropTypes.shape({
        query: PropTypes.object.isRequired,
      }).isRequired,
      router: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    };

    render() {
      const passedProps = this._config.withRouter
        ? this.props
        : filterObject(this.props, excludePropsMap);

      const formattedParams = getFormattedParams(this.props.url.query);

      return React.createElement(Component, {
        params: formattedParams,
        onChangeParams: this.onChangeParams,
        ...passedProps,
      });
    }

    _config = {
      ...defaultConfig,
      ...config,
    };

    onChangeParams = nextParams => {
      const filteredNextParams =
        typeof config.defaultParams === 'object'
          ? filterDefaultValues(nextParams, config.defaultParams)
          : nextParams;

      const nextHref = {
        pathname: this.props.url.pathname,
        query: filteredNextParams,
      };
      const as = nextHref;

      this.props.router.push(nextHref, as, { shallow: true });
    };
  }

  return hoistStatics(withRouter(WrappedComponent), Component);
}

export default withUrlParams;

// CONFIG & HELPERS

const excludePropsMap = ['url', 'router', 'staticContext'];

const defaultConfig = {
  withRouter: false,
};

const filterObject = memoize((obj, exclusionMap) =>
  Object.entries(obj).reduce((res, [key, value]) => {
    if (!exclusionMap.includes(key)) {
      res[key] = value;
    }
    return res;
  }, {}),
);

const filterDefaultValues = memoize((obj, defaultValues) =>
  Object.entries(obj).reduce((res, [key, value]) => {
    if (defaultValues[key] !== value) {
      res[key] = value;
    }
    return res;
  }, {}),
);

const parseQuery = memoize(val => qs.parse(val));

const formatNumbers = memoize(([key, value]) => {
  const testedVal = Number(value);
  return Number.isNaN(testedVal) || Array.isArray(value)
    ? [key, value]
    : [key, testedVal];
});

const formatBooleans = memoize(([key, value]) => {
  if (typeof value !== 'string') {
    return [key, value];
  }
  let formattedValue = value;
  if (value === 'true') {
    formattedValue = true;
  }
  if (value === 'false') {
    formattedValue = false;
  }
  return [key, formattedValue];
});

const getFormattedParams = memoize(params =>
  Object.entries(params)
    // .map(formatNumbers)
    .map(formatBooleans)
    .reduce((res, [key, value]) => {
      res[key] = value;
      return res;
    }, {}),
);

// method that allows to get params object from anywhere
export const getCurrentParams = () => prepareParams(window.location.search);

const prepareParams = memoize(query => getFormattedParams(parseQuery(query)));
