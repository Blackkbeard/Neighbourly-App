![Group 1-2](https://github.com/Blackkbeard/Project-3/assets/107420497/50070ee2-dbeb-474c-ba59-f8b26f26d73a)

# Neighbourly

A local marketplace app inspired by our neighbours--the help we need can often be found right next door. 

This app enables people in your neighbourhood to connect and share resources, be it extra food, equipment loans, or specialised services. Feel free to explore the demo site [here](https://neighbour-ly.netlify.app/) ! 

This is a group product done by a team of 3 full-stack developers as part of General Assembly's Software Engineering Immersive. 

---
## Feature Highlights

<img width="1449" alt="Homepage" src="https://github.com/Blackkbeard/Neighbourly-App/assets/47060493/aa6e3b95-d16a-4bd4-a27f-af16d593e1e1">


### 1) The Neighbourhood
- Dive into The Neighbourly homepage -- your neighbourhood's vibrant community hub. Discover valuable posts and offerings from people staying near you.
<img width="1501" alt="image" src="https://github.com/Blackkbeard/Project-3/assets/107420497/6f903873-d9c8-48d7-b57d-60c2fe24b62b">

- Engage by submitting requests for listings that interest you or extend a helping hand by creating your own "+ Add Offer" listing. Be sure to complete your listing with a clear photo!
<img width="1512" alt="image" src="https://github.com/Blackkbeard/Project-3/assets/107420497/ef28bc84-e63b-44a5-9d16-ba0c9743d35e">
<img width="1510" alt="image" src="https://github.com/Blackkbeard/Project-3/assets/107420497/49e5f790-a012-464b-900c-91cfd0824882">

### 2) Profile Page
- Your display name, registered neighbourhood, and bio are accessible on your profile page. It's the perfect spot to highlight your Neighbourly journey and the number of neighbours you've assisted!
<img width="1511" alt="image" src="https://github.com/Blackkbeard/Project-3/assets/107420497/7bf0e69f-e421-42f0-9a14-1244031b0600">

### 3) Listings
- Manage and review your listings conveniently from your profile page.
<img width="1511" alt="image" src="https://github.com/Blackkbeard/Project-3/assets/107420497/56d00232-2fb7-4a56-b537-2c27ea1b5ef9">

- Explore detailed information about each listing by clicking on them. Here, you can perform edits or deletion.
<img width="1512" alt="image" src="https://github.com/Blackkbeard/Project-3/assets/107420497/0233a01c-8efb-4095-9c1f-d58518bf344b">

### 4) Transactions
- Stay informed about the status of your requests in the "My Requests" section.
- Monitor requests from neighbours seeking your assistance under the "My Listings" tab.
<img width="1495" alt="image" src="https://github.com/Blackkbeard/Project-3/assets/107420497/248d3e37-4f63-4665-8829-a03a149f4562">

### 5) Navigate
- Effortlessly navigate through Neighbourly with the user-friendly navigation bar, conveniently located in the corner.
<img width="1511" alt="image" src="https://github.com/Blackkbeard/Project-3/assets/107420497/124db4b8-4207-4dfc-b15c-89f6a3fd9fca">

---
## Languages and Technologies Used

### Front-end
- React
- JavaScript
- CSS
- Material UI

### Back-end
- Express.js
- Database: MongoDB
- Driver: Mongoose
- Image storage: AWS S3
- Location APIs: OneMap API

### Others
- Project management: Jira
- UI Wireframing and prototyping: Figma
- Design system: Material 3
- Data modelling: Lucidchart

---
## Setup

### Express Backend
All the backend code is in the Back-end directory. Run all backend commands from inside that directory.

### Setup .env for Backend
Create a new .env file in the back-end directory and add the following lines:
```
PORT=5001
DATABASE=''

#Generate your own secrets 
ACCESS_SECRET=''
REFRESH_SECRET=''

# AWS variables for image 
BUCKET_NAME=''
BUCKET_REGION=''
ACCESS_KEY=''
SECRET_ACCESS_KEY=''
```
Add in your values here. 
- The database url has to be for a mongoDB database.
- Generate your own Access Secret and Refresh Secret
- Add in credentials for your AWS S3 bucket

### Run the app
```
npm i
npm run dev
```

### React Front-end
All the frontend react code is in the Front-end directory. Run all frontend commands from inside that directory.

### Setup .env for Front-end
Create a new .env file in the front-end directory and add the following lines:
```
VITE_SERVER=http://localhost:5001
```

### Run the app
```
npm i
npm run dev
```

---
## Wireframes and technical designs

![Screenshot 2023-08-25 at 11 16 32 AM](https://github.com/Blackkbeard/Neighbourly-App/assets/47060493/cbef922c-0488-4797-88eb-80d46b0073bf)

Check out our [Figma](https://www.figma.com/file/s99zepn0OQnpONiTH3P8Ef/Neighbourly?type=design&node-id=54295%3A401&mode=design&t=glvxB0l58AMcp6qo-1) for: 
- UI Wireframes
- Front-end component map
- Back-end Entity relationship diagram 

---

## Future development

- Users can leave each other reviews
- Users can add their favourite listing to watchlist
- In-app notifications
- Proper logout protocol
- Users are allowed to change their passwords

---
## References

### OneMap API Documentation
- [OneMap API Documentation](https://www.onemap.gov.sg/apidocs/)

### Postman Tutorial for Testing Web APIs
- [Postman Tutorial](https://www.freecodecamp.org/news/how-to-test-and-play-with-web-apis-the-easy-way-with-postman/)

### Material-UI Styling and Components
- [Styling Material-UI Components using CSS](https://stackoverflow.com/questions/71392336/styling-material-ui-components-using-css)
- [Disable Box Shadow Globally for Material-UI Components](https://stackoverflow.com/questions/34550593/how-to-disable-box-shadow-globally-for-all-material-ui-components)
- [Styling Material-UI Button Text Casing](https://stackoverflow.com/questions/50766693/how-to-center-a-component-in-material-ui-and-make-it-responsive)
- [Centering a Component and Making It Responsive](https://stackoverflow.com/questions/50766693/how-to-center-a-component-in-material-ui-and-make-it-responsive)
- [Customizing Material-UI Button Hover Colors](https://stackoverflow.com/questions/64983425/material-ui-button-hover-background-color-and-text-color)
- [Styling Material-UI TextField](https://stackoverflow.com/questions/46966413/how-to-style-material-ui-textfield)
- [Removing Underline for React Router Link](https://stackoverflow.com/questions/37669391/how-to-get-rid-of-underline-for-link-component-of-react-router)
- [React Router onClick Redirect](https://bobbyhadz.com/blog/react-onclick-redirect)
- [Optional Chaining with Arrays and Functions](https://stackoverflow.com/questions/59623674/how-can-i-use-optional-chaining-with-arrays-and-functions)
- [Material-UI Divider Thickness](https://stackoverflow.com/questions/69682476/material-ui-divider-thickness)
- [Material-UI Date Picker Validation](https://mui.com/x/react-date-pickers/validation/)
- [Making Material-UI DatePicker Required](https://stackoverflow.com/questions/58801744/material-ui-datepicker-set-to-required)

### Using LocalStorage with React Hooks
- [Using LocalStorage with React Hooks](https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/)

### Working with Window Location and URLs
- [Window Location Cheatsheet](https://www.samanthaming.com/tidbits/86-window-location-cheatsheet/)
- [Getting Current Domain Name with JavaScript](https://stackoverflow.com/questions/11401897/get-the-current-domain-name-with-javascript-not-the-path-etc)

### Storing Images and Using Amazon S3
- [Storing Images Tutorial](https://www.youtube.com/watch?v=eQAIojcArRY)
- [GitHub Repository for Amazon S3 Get, Put, and Delete](https://github.com/meech-ward/s3-get-put-and-delete/tree/master)

### Etc.
- [Setting up MongoDB Atlas](https://coding-boot-camp.github.io/full-stack/mongodb/how-to-set-up-mongodb-atlas)
- [Singapore Districts and URA Map](https://www.propertyguru.com.sg/property-guides/ccr-ocr-rcr-region-singapore-ura-map-21045)
- [Filter out populated results in Mongoose](https://stackoverflow.com/questions/46391630/mongoosejs-filter-out-populate-results)

---
## Credits
- Special credit to [Ivan Tong](https://www.behance.net/ivantong1?fbclid=PAAaZDZ9fGW5H0rf3B750mvN3W2acqYTYUHGMSaZy_A28J1nqJaZEb2cqd0B0) for designing the artwork on Sign Up page! ❤️
- Material Design 3D Avatars: [Janet Mac](https://janet-mac.com/google-avatar-project)


