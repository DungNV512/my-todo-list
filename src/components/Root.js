import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import App from './App';
import Topics from './Topics';
import About from './About';
import NotFound from './NotFound';

const routes = [
  { path: '/',
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  { path: '/bubblegum',
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>
  },
  { path: '/shoelaces',
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>
  }
]

const Root = ({ store }) => {
    return(
    <Provider store={store}>
        <BrowserRouter>
            <div style={{ display: 'flex' }}>
                <div style={{
                    padding: '10px',
                    width: '40%',
                    background: '#f0f0f0'
                }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/bubblegum">Bubblegum</Link></li>
                    <li><Link to="/shoelaces">Shoelaces</Link></li>
                </ul>

                {routes.map((route, index) => (
                // You can render a <Route> in as many places
                // as you want in your app. It will render along
                // with any other <Route>s that also match the URL.
                // So, a sidebar or breadcrumbs or anything else
                // that requires you to render multiple things
                // in multiple places at the same URL is nothing
                // more than multiple <Route>s.
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.sidebar}
                />
                ))}
                </div>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/topics">Topics</Link></li>
                        <li><Link to="/redirect">Redirect</Link></li>
                        <li><Link to="/404">404 Not found</Link></li>
                        <li><Link to="/maybe/not/found">Maybe not found</Link></li>
                    </ul>
                    <Switch>
                        <Route exact path='/' render={(props) => (
                            <App {...props}/>
                            )}
                        />
                        <Route path="/about" component={About}/>
                        <Route path="/topics" component={Topics}/>
                        <Redirect from="/redirect" to="/"/>
                        <Route component={NotFound}/>
                        <Route path="/:filter" component={ App }/>
                    </Switch>
                    
                </div>
                <div style={{ flex: 1, padding: '10px' }}>
                    {routes.map((route, index) => (
                    // Render more <Route>s with the same paths as
                    // above, but different components this time.
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                    ))}
                </div>
            </div>
        </BrowserRouter>
    </Provider>
)}
Root.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Root;