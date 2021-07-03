import React, {forwardRef} from 'react';
import {Helmet} from 'react-helmet';
import PropTypes from 'prop-types';
import Config from '../../constants/config';
import Container from '@material-ui/core/Container';

const Page = forwardRef(({children, title = '', ...rest}, ref) => {
  return (
    <div ref={ref} {...rest}>
      <Helmet>
        <title>{`${title} | ${Config.appName}`}</title>
      </Helmet>
      <Container maxWidth="lg">{children}</Container>
    </div>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
