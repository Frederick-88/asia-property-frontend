## Asia-Property-Frontend

#### Tools/Technology Used :

1. ReactJS (Class & Functional Components)
2. React-Redux
3. Axios
4. Apexcharts.js - React
5. JWT-Decode
6. React-Detect-Click-Outside
7. React-Drag-Drop-Files
8. React-Slick & Slick-Carousel
9. React-Toastify
10. Universal-Cookie
11. Redux-Devtools-Extension
12. React-Lottie
13. Lodash-Debounce

#### Frontend & Concept References :

- http://demos.ui-lib.com/gull/html/layout2/dashboard1.html ( admin website with 2 roles, viewer & admin )
- https://admin-redq.vercel.app/customers ( admin website with 2 roles, viewer & admin )
- https://dribbble.com/shots/14715367-Wallet-Dashboard-Design ( admin navigation structure )
- https://dribbble.com/shots/15216951-Finance-Dashboard-Design ( admin website UI reference )
- https://dribbble.com/shots/14755817-Wallet-Dashboard-Dark-Theme ( admin revenue UI reference )
- https://www.realtor.com/ ( standard real estate web contents )
- https://www.airbnb.com/ ( landing page & dashboard site )
- https://preview.themeforest.net/item/wp-residence-real-estate-wordpress-theme/full_screen_preview/7896392?_ga=2.113331008.694251961.1623680163-1787504979.1614307227 ( landing page & dashboard site )
- https://preview.themeforest.net/item/homeid-real-estate-wordpress-theme/full_screen_preview/30203159?_ga=2.111640643.694251961.1623680163-1787504979.1614307227 ( landing page & dashboard site )
- https://dribbble.com/search/real%20estate%20web ( landing page )
- https://dribbble.com/shots/14608177-Socialup-Web-App ( auth modal )

#### React Technical References :

- React Class & Functional Component, Lifecycle & Docs https://reactjs.org
- Responsive Screen Sizes Reference https://www.hobo-web.co.uk/best-screen-size/
- Skeleton Loader CSS Example https://codepen.io/Ba5nanas/pen/yLeJXGG
- Setting up SCSS Github https://github.com/Mediumtutorial/sass-react-medium
- Pug HTML with React ( if needed ) https://stackoverflow.com/questions/56513346/how-to-use-pug-templating-engine-with-reactjs
- Creating Reusable Component similar to Vue Slots in React https://medium.com/@srph/react-imitating-vue-slots-eab8393f96fd
- React Get Current Path for Class Component https://reactrouter.com/core/api/withRouter
- React useHistory in class component https://stackoverflow.com/questions/58122219/constructor-props-equivalent-in-react-hooks-for-history-push
- Adding Animation Json to React App with react-lottie https://github.com/mifi/react-lottie-player
- Most Common Screen Resolutions - Desktop (December 2021) https://www.hobo-web.co.uk/best-screen-size/
- Screen Resolution Size Handling https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react

#### Content Structure :

1. Homepage

- home banner
- real estate listing preview
- explore by property type
- real estate renting preview
- developers featured
- agents featured
- footer

2. Listing

- Map ( Right Side )
- search with for rent/sale options & title ( fixed position )
- listing like airbnb but 2 grids
- skeleton loader

3. Wishlists

- standard listing with 3 grids
- skeleton loader

4. Our Agents

- standard listing with 3 grids
- skeleton loader

5. About Us

- standard about us page

#### Admin Site Content Structure :

1. Dashboard

- informations & various type of charts
- if the url has `?is_visitor=true`, then directly set at redux store

2. Listing List

- sorting & search
- skeleton loader
- edit & delete
- when add or edit, will have a dropdown consist of agent options that is fetched from API

3. Users

- sorting & search
- skeleton loader
- edit & delete

4. Our Agents

- sorting & search
- skeleton loader
- edit & delete

5. Featured/Inquiries

- sorting & search
- skeleton loader
- edit & delete

6. About Us

- about us page like in public site

7. Settings

- Add Options ( Listing, Users, Agents, Inquiries etc ) - direct to each page + open the add modal ( can add "?open_create_modal=true" query url )
- Account Settings - open to account settings page
- Staff Members - direct to users page
