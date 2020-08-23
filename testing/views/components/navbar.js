let Navbar = {
    render: async () => {
        let view = `
        <nav class="navbar">
            <a href="/#/home"><img class='nav-logo' src='../images/toasty-logo.png'>
            </a>
            <a class="navbar-item" href="/#/bulletin">
                <img class='nav-logo' src='../images/bulletin-board.png'>
                <br>
                
            </a>
            <a class="navbar-item" href="/#/bookbag">
                <img class='nav-logo' src='../images/backpack.png'>
                <br>
                
            </a>
            <a class="navbar-item" href="/#/chat">
                <img class='nav-logo' src='../images/chat.png'>
                <br>      
            </a>
            <a class="navbar-item" href="/#/comingsoon">
                <img class='nav-logo' src='../images/star.png'>
                <br>      
            </a>
            <a class="navbar-item" href="/#/comingsoon">
                <img class='nav-logo' src='../images/show-and-tell.png'>
            <br>      
            </a>

        </nav>
        `
        return view
    },

    after_render: async () => {}
}

export {Navbar};