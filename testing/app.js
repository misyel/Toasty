"use strict";

import {Navbar} from './views/components/navbar.js'
import {Utils} from './services/utils.js'
import { Bulletin } from './views/pages/bulletin.js';
import { BookBag } from './views/pages/bookbag.js';
import { Signup } from './views/pages/signup.js';
import { Login } from './views/pages/login.js';
import {Error404 } from './views/pages/error404.js'
import { Chat } from './views/pages/chat.js';
import { Comingsoon } from './views/pages/comingsoon.js';
import { Home } from './views/pages/home.js';



// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/' : Login
    ,'/bulletin' : Bulletin
    ,'/bookbag' : BookBag
    , '/signup' : Signup
    ,'/chat' : Chat
    ,'/comingsoon' : Comingsoon
    ,'/home' : Home
};


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    console.log('hey')
    // Lazy load view element:
    const header = null || document.getElementById('header-container');
    const content = null || document.getElementById('content');
    
    // Render the Header and footer of the page
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();


    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    console.log(request)

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    content.innerHTML = await page.render();
    //content.appendChild(await page.render());
    await page.after_render();
  
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);